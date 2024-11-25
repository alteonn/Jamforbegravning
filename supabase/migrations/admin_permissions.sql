-- Grant full access to admin user
DO $$
BEGIN
  -- Create admin role if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'admin') THEN
    CREATE ROLE admin;
  END IF;

  -- Grant admin role to authenticated users
  GRANT admin TO authenticated;

  -- Grant all privileges on all tables
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
  GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;
  GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO admin;

  -- Allow admin to create new tables and schemas
  GRANT CREATE ON SCHEMA public TO admin;

  -- Set default privileges for future tables
  ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL PRIVILEGES ON TABLES TO admin;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL PRIVILEGES ON SEQUENCES TO admin;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL PRIVILEGES ON FUNCTIONS TO admin;
END
$$;