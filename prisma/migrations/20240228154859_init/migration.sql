-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "products" (
    "brand" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30),
    "currency" TEXT NOT NULL,
    "scraped_at" TIMESTAMP(3) NOT NULL,
    "terms" TEXT NOT NULL,
    "section" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("sku")
);
