DROP DATABASE IF EXISTS users;
CREATE DATABASE users;
USE users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password) VALUES ('JoshW', 'JoshW12345');
INSERT INTO users (username, password) VALUES ('Peter', 'Peter12345');
INSERT INTO users (username, password) VALUES ('Declan', 'Declan12345');
INSERT INTO users (username, password) VALUES ('JoshB', 'JoshB12345');
INSERT INTO users (username, password) VALUES ('Ian', 'Ian12345');
