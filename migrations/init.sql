-- SKILL table
CREATE TABLE skill
(
    id          TEXT PRIMARY KEY,
    name        TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at  TIMESTAMP   NOT NULL,
    updated_at  TIMESTAMP   NOT NULL
);

-- USER_SKILL table
CREATE TABLE user_skill
(
    id          TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL REFERENCES "user" (id),
    skill_id    TEXT NOT NULL REFERENCES skill (id),
    acquired_at TIMESTAMP,
    level       INTEGER
);

-- CERTIFICATION table
CREATE TABLE certification
(
    id     TEXT PRIMARY KEY,
    name   TEXT NOT NULL,
    issuer TEXT
);

-- USER_CERTIFICATION table
CREATE TABLE user_certification
(
    id         TEXT PRIMARY KEY,
    user_id    TEXT NOT NULL REFERENCES "user" (id),
    cert_id    TEXT NOT NULL REFERENCES certification (id),
    issued_at  TIMESTAMP,
    expires_at TIMESTAMP
);

-- ROLE table
CREATE TABLE role
(
    id          TEXT PRIMARY KEY,
    name        TEXT,
    description TEXT
);

-- CLIENT table
CREATE TABLE client
(
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT
);

-- PROJECT table
CREATE TABLE project
(
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT,
    started_at  TIMESTAMP,
    ended_at    TIMESTAMP
);

-- CLIENT_PROJECT table
CREATE TABLE client_project
(
    id         TEXT PRIMARY KEY,
    client_id  TEXT NOT NULL REFERENCES client (id),
    project_id TEXT NOT NULL REFERENCES project (id)
);

-- PROJECT_USER table
CREATE TABLE project_user
(
    id         TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES project (id),
    user_id    TEXT NOT NULL REFERENCES "user" (id),
    role_id    TEXT REFERENCES role (id)
);