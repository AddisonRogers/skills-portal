import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

let dbInstance: ReturnType<typeof drizzle> | undefined;

export function getDb(customPool?: Pool) {
  if (customPool) {
    dbInstance = drizzle(customPool);
  }
  if (!dbInstance) {
    dbInstance = drizzle(new Pool({ connectionString: process.env.DATABASE_URL }));
  }
  return dbInstance;
}

// For regular app code:
export const db = getDb();
