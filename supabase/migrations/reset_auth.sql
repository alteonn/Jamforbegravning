-- Reset auth configuration
BEGIN;

-- Clear existing RLS policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.articles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.articles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.articles;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.articles;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.companies;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.companies;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.companies;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.companies;

-- Disable RLS
ALTER TABLE public.articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies DISABLE ROW LEVEL SECURITY;

-- Reset permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Read access for anonymous users
GRANT SELECT ON public.articles TO anon;
GRANT SELECT ON public.companies TO anon;

-- Full access for authenticated users
GRANT ALL ON public.articles TO authenticated;
GRANT ALL ON public.companies TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Reset admin user
UPDATE auth.users
SET raw_app_meta_data = jsonb_build_object(
  'roles', ARRAY['admin'],
  'isAdmin', true
),
raw_user_meta_data = jsonb_build_object(
  'isAdmin', true
)
WHERE email = 'patrick@alteon.se';

COMMIT;