begin;

create or replace function :DATABASE_SCHEMA_PUBLIC.me() returns :DATABASE_SCHEMA_PUBLIC.users as $$
	select * from :DATABASE_SCHEMA_PUBLIC.users u where u.id = :DATABASE_SCHEMA_PUBLIC.current_user_id();
$$ language sql stable;

comment on function :DATABASE_SCHEMA_PUBLIC.me is E'Gets the current user.';

grant all on function :DATABASE_SCHEMA_PUBLIC.me to :DATABASE_VISITOR_ROLE;

commit;
