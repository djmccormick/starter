#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	create user project_user;
	create database project owner project_user;
	grant all privileges on database project to project_user;
	create database project_shadow owner project_user;
	grant all privileges on database project_shadow to project_user;
EOSQL
