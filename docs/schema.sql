-- User Table
CREATE TABLE user (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    emailVerified INTEGER, -- Use INTEGER for boolean (0 or 1)
    image TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Session Table
CREATE TABLE session (
    id TEXT PRIMARY KEY,
    userId TEXT,
    token TEXT,
    expiresAt DATETIME,
    ipAddress TEXT,
    userAgent TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    FOREIGN KEY (userId) REFERENCES user(id)
);

-- Account Table
CREATE TABLE account (
    id TEXT PRIMARY KEY,
    userId TEXT,
    accountId TEXT,
    providerId TEXT,
    accessToken TEXT,
    refreshToken TEXT,
    accessTokenExpiresAt DATETIME,
    refreshTokenExpiresAt DATETIME,
    scope TEXT,
    idToken TEXT,
    password TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    FOREIGN KEY (userId) REFERENCES user(id)
);

CREATE TABLE verification (
    id TEXT PRIMARY KEY,
    identifier TEXT,
    value TEXT,
    expiresAt DATETIME,
    createdAt DATETIME,
    updatedAt DATETIME
);



drop table if exists orders;
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderNo VARCHAR(128) NOT NULL,
    userEmail VARCHAR(128) NOT NULL,
    amount INTEGER NOT NULL,
    period VARCHAR(32) NOT NULL DEFAULT '', -- once, monthly, yearly
    tier varchar(32) NOT NULL DEFAULT '',
    paidAt DATETIME NULL,
    expiredAt DATETIME NULL,
    paymentProvider VARCHAR(128) NOT NULL DEFAULT '', --stripe, paypal, lms, polar, etc.
    outOrderId VARCHAR(128) NULL,
    orderStatus INTEGER NOT NULL DEFAULT 0, --0: pending 1: success 2: failed
    credits INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_orders_user_email ON orders(userEmail);
CREATE UNIQUE INDEX uni_orders_order_no ON orders(orderNo);

drop table if exists credit_records;
create table credit_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userEmail VARCHAR(128) NOT NULL,
    taskId varchar(128) NOT NULL DEFAULT '',
    creditAmount INTEGER NOT NULL DEFAULT 0, -- positive: comsume credits, negative: refund credits
    creditType varchar(32) NOT NULL DEFAULT '', --service_usage refund manual_adjustment
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
create index idx_credit_records_user_email on credit_records(userEmail);
create index idx_credit_records_task_id on credit_records(taskId);

drop table if exists guest_tasks;
CREATE TABLE guest_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip VARCHAR(128) NOT NULL,
    sessionId VARCHAR(128) NOT NULL,
    taskId VARCHAR(128) NOT NULL,
    taskStatus INTEGER NOT NULL DEFAULT 0, --0: pending 1: success 2: failed
    audioUrl text null,
    streamAudioUrl text null,
    imageUrl text null,
    prompt text null,
    title text null,
    tags text null, 
    duration INTEGER NOT NULL DEFAULT 0, -- duration in seconds
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_guest_tasks_ip ON guest_tasks(ip);
CREATE INDEX idx_guest_tasks_session_id ON guest_tasks(sessionId);
CREATE INDEX idx_guest_tasks_task_id ON guest_tasks(taskId);


drop table if exists user_tasks;
CREATE TABLE user_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    userEmail VARCHAR(128) NOT NULL,
    taskId VARCHAR(128) NOT NULL,
    taskStatus INTEGER NOT NULL DEFAULT 0, --0: pending 1: success 2: failed
    audioUrl text null,
    streamAudioUrl text null,
    imageUrl text null,
    prompt text null,
    title text null,
    tags text null, 
    duration INTEGER NOT NULL DEFAULT 0, -- duration in seconds
    isPublic INTEGER NOT NULL DEFAULT 1, -- 0: private, 1: public
    isPublicShow INTEGER NOT NULL DEFAULT 1, -- 0: hidden, 1: visible
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_user_tasks_email ON user_tasks(userEmail);
CREATE INDEX idx_user_tasks_task_id ON user_tasks(taskId);
