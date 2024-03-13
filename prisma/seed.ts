import { PrismaClient } from '@prisma/client';
import * as csv from 'csv-parse';
import fs from 'node:fs';

const prisma = new PrismaClient();
const parser = csv.parse({
  delimiter: ','
});

async function seed() {
  fs.createReadStream('./2024-02-21_dev_meeting_zara_products.csv').pipe(parser);

  // Delete all records
  await prisma.product.deleteMany({});

  parser.on('readable', async () => {
    let record;
    let idx = 0;
    while ((record = parser.read()) !== null) {
      idx++;
      if (idx === 1) continue;

      const [brand, url, sku, name, description, price, currency, scraped_at, terms, section] =
        record;

      // Should I pass items that don't have a name?
      // if (!name) continue;

      await prisma.product.create({
        data: {
          brand,
          url,
          sku,
          name,
          description,
          price: +price.replace(',', '.'),
          currency,
          scraped_at: new Date(scraped_at.split(',')[0]),
          terms,
          section
        }
      });
    }
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    return prisma.$disconnect;
  });
