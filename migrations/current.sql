drop table if exists :DATABASE_SCHEMA_PUBLIC.users cascade;
create table :DATABASE_SCHEMA_PUBLIC.users (
	id uuid primary key not null default uuid_generate_v1mc(),
	first_name text not null check (char_length(first_name) < 80),
	last_name text not null check (char_length(last_name) < 80),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

-- For testing
insert into :DATABASE_SCHEMA_PUBLIC.users (
	id, first_name, last_name
) values (
	'6c48046c-bd95-11ea-9d5a-972c68cb00f3', 'Bob', 'Barker'
);

insert into :DATABASE_SCHEMA_PUBLIC.users (
	first_name, last_name
) values (
	'Drew', 'Carey'
);
