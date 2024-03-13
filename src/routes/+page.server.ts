import type { Product } from '@prisma/client';
import { prisma } from '$lib/db.server';
import { serialize } from '$lib/utils/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('search') || '';
  const page = Number(url.searchParams.get('page') || 1);

  const take = 18;
  const skip = (page - 1) * take;

  const [products, [{ count }]] = await prisma.$transaction([
    prisma.$queryRaw<Product[]>`
      SELECT
        "public"."products"."sku",
        "public"."products"."brand",
        "public"."products"."url",
        "public"."products"."name",
        "public"."products"."description",
        "public"."products"."price",
        "public"."products"."currency",
        "public"."products"."scraped_at",
        "public"."products"."terms",
        "public"."products"."section",
        "public"."products"."search_field"
      FROM "public"."products"
      WHERE 
        ${search} = ''
        OR to_tsvector(concat_ws(' ', "public"."products"."search_field")) @@ to_tsquery('english', ${search})
      ORDER BY
        ts_rank(to_tsvector(concat_ws(' ', "public"."products"."search_field")), to_tsquery('english', ${search})) DESC,
        "public"."products"."sku" ASC
      LIMIT ${take}
      OFFSET ${skip}
  `,
    prisma.$queryRaw<[{ count: bigint }]>`SELECT COUNT(*) FROM "public"."products";`
  ]);

  return { products: serialize(products), count: Number(count) };
};
