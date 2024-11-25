-- Update existing articles to use Swedish categories
UPDATE articles
SET category = CASE
  WHEN category = 'ceremony' THEN 'ceremoni'
  WHEN category = 'funeral' THEN 'begravning'
  WHEN category = 'legal' THEN 'juridik'
  WHEN category = 'economy' THEN 'ekonomi'
  WHEN category = 'documents' THEN 'dokument'
  WHEN category = 'family' THEN 'efterlevande'
  WHEN category = 'faq' THEN 'fragor'
  ELSE category
END;