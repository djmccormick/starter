#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	-- Default privileges
	alter default privileges in schema public revoke all on functions from public;
	alter default privileges in schema public revoke all on sequences from public;
	alter default privileges in schema public revoke all on tables from public;
	revoke all on schema public from public;

	-- Users and roles
	create role ${DATABASE_OWNER_ROLE} with login password '${DATABASE_OWNER_PASSWORD}' superuser; -- IMPORTANT: don't grant superuser in production
	grant ${DATABASE_OWNER_ROLE} to ${POSTGRES_USER};
	create role ${DATABASE_AUTHENTICATOR_ROLE} with login password '${DATABASE_AUTHENTICATOR_PASSWORD}' noinherit;
	create role ${DATABASE_VISITOR_ROLE};
	grant ${DATABASE_VISITOR_ROLE} to ${DATABASE_AUTHENTICATOR_ROLE};

	-- Database
	create database ${DATABASE_NAME} owner ${DATABASE_OWNER_ROLE};
	revoke all on database ${DATABASE_NAME} from public;
	grant all on database ${DATABASE_NAME} to ${DATABASE_OWNER_ROLE};
	grant connect on database ${DATABASE_NAME} to ${DATABASE_AUTHENTICATOR_ROLE};
EOSQL
