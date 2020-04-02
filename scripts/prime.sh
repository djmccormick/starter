#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	-- User
	create user project_user;

	-- Databases
	create database project owner project_user;
	create database project_shadow owner project_user;

	-- Privileges
	grant all privileges on database project to project_user;
	grant all privileges on database project_shadow to project_user;

	-- Roles
	do \$do$
	begin
		if not exists (select from pg_catalog.pg_roles where rolname = 'unauthenticated') then
			create role "unauthenticated" nologin;
		end if;

		grant unauthenticated to postgres;

		if not exists (select from pg_catalog.pg_roles where rolname = 'authenticated') then
			create role "authenticated" nologin;
		end if;

		grant authenticated to postgres;
	end
	\$do$;

	-- Extensions
	create extension if not exists "uuid-ossp";
	grant all on function uuid_generate_v1mc to authenticated;
EOSQL
