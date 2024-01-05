CREATE TYPE STATUS AS ENUM ('done', 'in progress', 'pending');

create TABLE tasks(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    status STATUS NOT NULL
);