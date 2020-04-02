-- Restrict default privileges
alter default privileges in schema public revoke all on functions from public;
alter default privileges in schema public revoke all on sequences from public;
alter default privileges in schema public revoke all on tables from public;
