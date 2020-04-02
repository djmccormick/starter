begin;

-- Documentation
comment on table users is E'@omit create\nUsers of the application';
comment on column users.id is E'@omit update\nThe primary unique identifier for the record';
comment on column users.first_name is 'The user’s first name';
comment on column users.last_name is 'The user’s last name';
comment on column users.created_at is E'@omit update\nWhen the record was created';
comment on column users.udpated_at is E'@omit update\nWhen the record was updated';

-- Authorization
drop policy if exists read on users;
drop policy if exists insert on users;
drop policy if exists update on users;
drop policy if exists delete on users;

create policy read on users for select using (id = current_user_id());
create policy insert on users for insert using (false);
create policy update on users for update using (id = current_user_id());
create policy delete on users for delete using (id = current_user_id());

alter table users enable row level security;
grant all on users to authenticated;

end;
