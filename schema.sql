
-- Custom Types

CREATE TYPE part_type AS ENUM ('KO', 'FU', 'D');

-- Users

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

-- PLD

create table if not exists members
(
  member_name varchar(100) primary key,
  unique(member_name)
);

create table if not exists sprints
(
  sprint_name varchar(100) primary key,
  "data" json not null
);

create table if not exists sprint_parts
(
  id serial primary key,
  sprint_name varchar(100) not null,
  foreign key (sprint_name) references sprints (sprint_name) on delete cascade on update cascade,
  title varchar(100) not null,
  description text not null,
  "type" part_type not null,
  unique ("type", sprint_name)
);

create table if not exists sprint_part_reports
(
  member_name varchar(100) not null,
  foreign key (member_name) references members (member_name) on delete cascade on update cascade,
  sprint_part_id serial not null,
  foreign key (sprint_part_id) references sprint_parts (id) on delete cascade on update cascade,
  constraint pk_part_reports primary key (member_name, sprint_part_id),
  report text not null
);

create table if not exists changelogs
(
  id serial primary key,
  "date" timestamp default current_timestamp not null,
  version varchar(20) not null,
  author varchar(100) not null,
  sections text not null,
  comments text not null
);
