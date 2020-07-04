begin;

create or replace function :DATABASE_SCHEMA_PUBLIC.current_user_id() returns uuid as $$
	select nullif(current_setting('user.id', true)::text, '')::uuid;
$$ language sql stable;

comment on function :DATABASE_SCHEMA_PUBLIC.current_user_id is E'Gets the current user ID.';

grant all on function :DATABASE_SCHEMA_PUBLIC.current_user_id to :DATABASE_VISITOR_ROLE;

commit;
