DROP TABLE IF EXISTS resetPassword;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL CHECK (first_name <> ''),
    last_name VARCHAR NOT NULL CHECK (last_name <> ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resetPassword
(
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL REFERENCES users(email),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);