CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  owner_id TEXT NOT NULL,        -- creator of the task
  assigned_to TEXT,              -- person responsible (nullable)

  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('todo', 'in-progress', 'done')) DEFAULT 'todo',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'low',

  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);