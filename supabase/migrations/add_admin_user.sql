-- Add admin role to specific user
DO $$
BEGIN
  -- First ensure the admin role exists
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'admin') THEN
    CREATE ROLE admin;
  END IF;

  -- Grant admin role to the specific user
  GRANT admin TO authenticated;
  
  -- Give admin privileges to specific email
  UPDATE auth.users 
  SET raw_app_meta_data = raw_app_meta_data || 
    json_build_object('roles', ARRAY['admin'])::jsonb
  WHERE email = 'patrick@alteon.se';
END
$$;