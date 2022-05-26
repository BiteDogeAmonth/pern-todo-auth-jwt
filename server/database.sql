create table users (
    user_id serial primary key,
    user_name text not null,
    user_email text not null,
    user_password text not null
);

--todos

create table messages (
    m_id serial,
    u_id integer not null references users(user_id),
    notes text not null,
    primary key (m_id)
);


