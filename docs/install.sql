CREATE DATABASE `chatgpt`;

create table if not exists gpt_api_keys
(
    id int auto_increment
        primary key,
    api_key varchar(255) not null,
    use_count int default 0 null,
    ip varchar(255) not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    deleted_at timestamp null,
    updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    user_id int not null comment '关联用户ID'
)
    collate=utf8mb4_bin;

create table if not exists gpt_conversation
(
    id int auto_increment
        primary key,
    conversation_id varchar(255) null comment 'gpt会话id',
    app_conversation_id varchar(255) not null comment '当前应用会话id',
    api_key_id varchar(255) not null comment '关联的KEY id',
    ip varchar(255) not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    deleted_at timestamp null,
    updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    parent_message_id varchar(255) null,
    message text null comment '询问的消息',
    all_json json null comment '详细的数据',
    chat_id varchar(255) null comment '聊天的ID',
    reply text null,
    user_id int null
)
    collate=utf8mb4_bin;

create table if not exists gpt_users
(
    id int auto_increment
        primary key,
    user_id int not null,
    phone varchar(20) null,
    email varchar(155) not null,
    password varchar(255) not null,
    ip varchar(255) not null,
    login_at timestamp not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    deleted_at timestamp null,
    updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    account varchar(255) null comment '账户名称',
    balance int default 0 null comment 'token 余额'
)
    collate=utf8mb4_bin;


