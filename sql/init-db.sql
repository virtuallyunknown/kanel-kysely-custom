DROP VIEW IF EXISTS my_view;

DROP MATERIALIZED VIEW IF EXISTS my_materialized_view;

DROP TABLE IF EXISTS foo, bar CASCADE;

DROP TYPE IF EXISTS my_enum;

DROP TYPE IF EXISTS my_composite;

DROP TYPE IF EXISTS my_range;

DROP TYPE IF EXISTS my_domain;

CREATE TYPE my_enum AS ENUM(
    'one',
    'two',
    'three'
);

CREATE TYPE my_composite AS (
    name TEXT,
    number INTEGER
);

CREATE TYPE my_range AS RANGE (
    subtype = DATE
);

CREATE DOMAIN my_domain AS integer CHECK (VALUE > 0);

CREATE TABLE IF NOT EXISTS bar(
    id SERIAL NOT NULL,
    name TEXT NOT NULL,
    foo_id INTEGER NOT NULL,
    my_enum my_enum NOT NULL,
    my_composite my_composite NOT NULL,
    my_range my_range NOT NULL,
    my_domain my_domain NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS foo(
    id SERIAL NOT NULL,
    name TEXT NOT NULL,
    bar_id INTEGER NOT NULL,
    my_enum my_enum NOT NULL,
    my_composite my_composite NOT NULL,
    my_range my_range NOT NULL,
    my_domain my_domain NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (id),
    FOREIGN KEY (bar_id) REFERENCES bar(id)
);

CREATE VIEW my_view AS
SELECT
    *
FROM
    foo;

CREATE MATERIALIZED VIEW my_materialized_view AS
SELECT
    *
FROM
    bar WITH data;

