# unix-commands-v6

## Model

The model is a single self relation Table called `commands` with the following fields:

```sql

create type type if not exists as enum ('code', 'network', 'system', 'code' )
create type platform if not exists as enum ('macos', 'unix', 'linux')

create table if not exists commands (
  id serial primary key,
  title character varying(63),
  slug character varying(63) unique null,
  tab character varying(63) null,
  env character varying(31) default "$",
  type type null,
  platform platform default "unix",
  content text,
  image character varying(255) null,
  isActive boolean default false,
  foreign key (parent) references commands(id) -- Self relation | recursive | tree
);
```
