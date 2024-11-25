-- First, let's make sure we have the right structure
ALTER TABLE public.companies
ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS services jsonb DEFAULT '[]'::jsonb;

-- Clear existing data to avoid duplicates
TRUNCATE TABLE public.companies;

-- Insert the companies
INSERT INTO public.companies (name, city, description, services, phone, email, website, verified) VALUES
(
  'Stockholms Begravningsbyrå',
  'Stockholm',
  'Vi erbjuder personlig service och hjälper er med allt kring begravningen. Med över 20 års erfarenhet ger vi er trygghet i en svår stund.',
  '["Begravning", "Juridisk rådgivning", "Bouppteckning"]'::jsonb,
  '08-123 45 67',
  'info@stockholmsbegravningsbyra.se',
  'https://stockholmsbegravningsbyra.se',
  true
),
(
  'Göteborgs Begravningsservice',
  'Göteborg',
  'Erfaren begravningsbyrå som hjälper er med alla praktiska arrangemang kring begravningen. Vi finns här för er dygnet runt.',
  '["Begravning", "Gravsten", "Dödsbo", "Flyttfirma"]'::jsonb,
  '031-123 45 67',
  'info@gbgbegravning.se',
  'https://gbgbegravning.se',
  false
),
(
  'Malmö Begravning & Juridik',
  'Malmö',
  'Vi erbjuder helhetslösningar med både begravningstjänster och juridisk hjälp. Låt oss ta hand om allt det praktiska.',
  '["Begravning", "Juridisk rådgivning", "Bouppteckning", "Florist"]'::jsonb,
  '040-123 45 67',
  'info@malmobegravning.se',
  'https://malmobegravning.se',
  true
),
(
  'Uppsala Flyttservice',
  'Uppsala',
  'Professionell flyttfirma med stor erfarenhet av dödsbon. Vi hjälper er med packning, flyttning och transport.',
  '["Flyttfirma", "Städning"]'::jsonb,
  '018-123 45 67',
  'info@uppsalaflytt.se',
  'https://uppsalaflytt.se',
  false
),
(
  'Västerås Catering',
  'Västerås',
  'Vi ordnar minnesvärda minnesstunder med högkvalitativ catering anpassad efter era önskemål.',
  '["Catering"]'::jsonb,
  '021-123 45 67',
  'info@vasterascatering.se',
  'https://vasterascatering.se',
  true
),
(
  'Örebro Fastighetsmäklare',
  'Örebro',
  'Specialiserade på försäljning av dödsbon med stor erfarenhet och professionellt bemötande.',
  '["Fastighetsmäklare"]'::jsonb,
  '019-123 45 67',
  'info@orebromaklare.se',
  'https://orebromaklare.se',
  true
);