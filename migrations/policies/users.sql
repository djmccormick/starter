begin;

-- Documentation
comment on table :DATABASE_SCHEMA_PUBLIC.users is 'Users of the application';
comment on column :DATABASE_SCHEMA_PUBLIC.users.id is 'The primary unique identifier for the record';
comment on column :DATABASE_SCHEMA_PUBLIC.users.first_name is 'The user’s first name';
comment on column :DATABASE_SCHEMA_PUBLIC.users.last_name is 'The user’s last name';
comment on column :DATABASE_SCHEMA_PUBLIC.users.created_at is 'When the record was created';
comment on column :DATABASE_SCHEMA_PUBLIC.users.updated_at is 'When the record was updated';

-- Authorization
drop policy if exists read on :DATABASE_SCHEMA_PUBLIC.users;
drop policy if exists insert on :DATABASE_SCHEMA_PUBLIC.users;
drop policy if exists update on :DATABASE_SCHEMA_PUBLIC.users;
drop policy if exists delete on :DATABASE_SCHEMA_PUBLIC.users;

create policy read on :DATABASE_SCHEMA_PUBLIC.users for select using (true);
create policy insert on :DATABASE_SCHEMA_PUBLIC.users for insert with check (false);
create policy update on :DATABASE_SCHEMA_PUBLIC.users for update using (id = :DATABASE_SCHEMA_PUBLIC.current_user_id());
create policy delete on :DATABASE_SCHEMA_PUBLIC.users for delete using (id = :DATABASE_SCHEMA_PUBLIC.current_user_id());

alter table :DATABASE_SCHEMA_PUBLIC.users enable row level security;

revoke all on :DATABASE_SCHEMA_PUBLIC.users from :DATABASE_VISITOR_ROLE;
grant
	select,
	insert (first_name, last_name),
	update (first_name, last_name),
	delete
on :DATABASE_SCHEMA_PUBLIC.users to :DATABASE_VISITOR_ROLE;

end;
