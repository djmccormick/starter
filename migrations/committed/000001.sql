--! Previous: -
--! Hash: sha1:9882da5f93af87fea978145e44a3a74f64cc8eab

-- Extensions
create extension if not exists plpgsql with schema pg_catalog;
create extension if not exists "uuid-ossp" with schema public;
create extension if not exists citext with schema public;
create extension if not exists pgcrypto with schema public;

-- Schemas
grant all on schema public to :DATABASE_OWNER_ROLE;

drop schema if exists :DATABASE_SCHEMA_PUBLIC cascade;
create schema :DATABASE_SCHEMA_PUBLIC;
grant usage on schema public, :DATABASE_SCHEMA_PUBLIC to :DATABASE_VISITOR_ROLE;

drop schema if exists :DATABASE_SCHEMA_HIDDEN cascade;
create schema :DATABASE_SCHEMA_HIDDEN;
grant usage on schema :DATABASE_SCHEMA_HIDDEN to :DATABASE_VISITOR_ROLE;

alter default privileges in schema public, :DATABASE_SCHEMA_PUBLIC, :DATABASE_SCHEMA_HIDDEN grant usage, select on sequences to :DATABASE_VISITOR_ROLE;
alter default privileges in schema public, :DATABASE_SCHEMA_PUBLIC, :DATABASE_SCHEMA_HIDDEN grant execute on functions to :DATABASE_VISITOR_ROLE;

drop schema if exists :DATABASE_SCHEMA_PRIVATE cascade;
create schema :DATABASE_SCHEMA_PRIVATE;
