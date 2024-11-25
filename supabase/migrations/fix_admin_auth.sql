-- Disable RLS for all tables since we only need basic auth
ALTER TABLE public.articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.articles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.articles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.articles;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.articles;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.companies;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.companies;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.companies;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.companies;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant read access to anonymous users
GRANT SELECT ON public.articles TO anon;
GRANT SELECT ON public.companies TO anon;

-- Grant full access to authenticated users (which will be admin only)
GRANT ALL ON public.articles TO authenticated;
GRANT ALL ON public.companies TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Make patrick@alteon.se a superadmin
UPDATE auth.users
SET raw_app_meta_data = jsonb_set(
  COALESCE(raw_app_meta_data, '{}'::jsonb),
  '{roles}',
  '["admin", "superadmin"]'
),
raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{isAdmin}',
  'true'
)
WHERE email = 'patrick@alteon.se';