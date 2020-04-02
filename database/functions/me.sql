begin;

create or replace function me() returns users as $$
	select * from users where id = current_user_id();
$$ language sql stable;

comment on function me is E'Gets the current user.';

grant all on function me to authenticated;

commit;
