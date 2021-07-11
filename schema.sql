
create table if not exists roles
  (
    id serial primary key,
    display_name varchar(50),
    importance integer
  );

create table if not exists users
(
  id serial primary key,
  username varchar(50),
  email varchar(255),
  unique(email),
  pass varchar(255),
  salt varchar(32),
  role_id integer,
  foreign key (role_id) references roles (id) on delete set null
);

create table if not exists sessions
(
  id serial primary key,
  user_id serial not null,
  foreign key (user_id) references users (id) on delete cascade
);
