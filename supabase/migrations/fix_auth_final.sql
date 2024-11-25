-- Reset och förenkla auth-konfigurationen
BEGIN;

-- 1. Rensa alla existerande policies och RLS
DROP POLICY IF EXISTS "Enable read access for all users" ON public.articles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.articles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.articles;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.articles;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.companies;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.companies;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.companies;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.companies;

-- 2. Inaktivera RLS på alla tabeller
ALTER TABLE public.articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies DISABLE ROW LEVEL SECURITY;

-- 3. Sätt upp grundläggande behörigheter
-- Läsrättigheter för anonyma användare
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.articles TO anon;
GRANT SELECT ON public.companies TO anon;

-- Fulla rättigheter för autentiserade användare
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.articles TO authenticated;
GRANT ALL ON public.companies TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 4. Sätt upp admin-användare med enkel konfiguration
UPDATE auth.users
SET raw_app_meta_data = jsonb_build_object('isAdmin', true)
WHERE email = 'patrick@alteon.se';

COMMIT;