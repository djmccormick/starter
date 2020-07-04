begin;

create or replace function :DATABASE_SCHEMA_PUBLIC.users_is_me(users :DATABASE_SCHEMA_PUBLIC.users) returns boolean AS $$
	select users.id = :DATABASE_SCHEMA_PUBLIC.current_user_id();
$$ language sql stable;

comment on function :DATABASE_SCHEMA_PUBLIC.users_is_me is E'Determines if the provided user is the current user.';

grant all on function :DATABASE_SCHEMA_PUBLIC.users_is_me to :DATABASE_VISITOR_ROLE;

commit;
