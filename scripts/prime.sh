#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	create user project;
	create database project owner project;
	create database project_shadow owner project;
EOSQL
