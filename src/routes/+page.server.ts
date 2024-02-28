import { prisma } from '$lib/db.server';
import { serialize } from '$lib/utils/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const products = await prisma.product.findMany({
    skip: 0,
    take: 18
  });

  return { products: serialize(products) };
};
