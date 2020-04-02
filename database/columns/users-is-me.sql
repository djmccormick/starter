begin;

create or replace function users_is_me(users users) returns boolean AS $$
	select users.id = current_user_id();
$$ language sql stable;

comment on function users_is_me is E'Determines if the provided user is the current user.';

grant all on function users_is_me to authenticated;

commit;
