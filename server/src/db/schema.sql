CREATE TABLE IF NOT EXISTS catalog_products (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  image_alt text NOT NULL,
  source_name text NOT NULL,
  source_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);
