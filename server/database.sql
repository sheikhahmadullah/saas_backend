
CREATE DATABASE jwt_auth;

-- set extension 
create table users(
    user_id uuid primary key default uuid_generate_v4(),
    user_name varchar(80) NOT NULL,
    user_email varchar(80) NOT NULL,
    user_password varchar(80) NOT NULL
);


insert into users(user_name,user_email,user_password) values ('Henry','henry123@gmail.com','kthj23');