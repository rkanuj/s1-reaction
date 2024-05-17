drop table if exists react_list;
create table if not exists react_list
(
    pid        integer   not null,
    uid        integer   not null,
    uid2       integer   not null,
    smiley     text      not null,
    token      text      not null,
    created_at timestamp not null,
    constraint react_list_pk
        primary key (pid, uid)
);
create index if not exists react_list_uid_index
    on react_list (uid);
create index if not exists react_list_uid2_index
    on react_list (uid2);
create index if not exists react_list_token_index
    on react_list (token);

drop table if exists ban_list;
create table if not exists ban_list
(
    uid        integer
        constraint ban_list_uid_uk
            unique,
    token      text
        constraint ban_list_token_uk
            unique,
    expired_at timestamp not null,
    created_at timestamp not null
);
