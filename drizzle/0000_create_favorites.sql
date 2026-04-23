-- Minimal starter migration. Create tables your app needs here.
-- Example: a simple key-value-ish table for demos.
CREATE TABLE IF NOT EXISTS hello (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
