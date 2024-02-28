import { prisma } from '$lib/db.server';
import { serialize } from '$lib/utils/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('search');

  const products = await prisma.product.findMany({
    skip: 0,
    take: 18,
    where: search ? { searchField: { search } } : undefined
  });

  const count = await prisma.product.count();

  return { products: serialize(products), count };
};
