CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION immutable_unaccent(varchar)
  RETURNS text AS $$
    SELECT unaccent('unaccent', $1)
  $$
LANGUAGE sql PARALLEL SAFE IMMUTABLE;

-- AlterTable
ALTER TABLE "products" ADD COLUMN "search_field" TEXT GENERATED ALWAYS AS (
        IMMUTABLE_UNACCENT(brand)
        || ' '
        || IMMUTABLE_UNACCENT(sku)
        || ' '
        || IMMUTABLE_UNACCENT(name)
        || ' '
        || IMMUTABLE_UNACCENT(description)
        || ' '
        || IMMUTABLE_UNACCENT(terms)
        || ' '
        || IMMUTABLE_UNACCENT(section)
    ) STORED;

ALTER TABLE products ALTER COLUMN search_field SET NOT NULL;

-- CreateIndex
CREATE INDEX "products_search_field_idx" ON "products"("search_field");