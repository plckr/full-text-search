import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

export const prisma = new PrismaClient({
  log: dev ? ['query'] : undefined
});
