CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    balance NUMERIC NOT NULL
);

INSERT INTO users (name, balance) VALUES
  ('Victor', 500),
  ('Pedro', 1000),
  ('Lucas', 750);