import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

let pool: Pool;

// This function allows injecting a custom Pool (e.g., from Testcontainers)
export function createDb(customPool?: Pool) {
  if (customPool) {
    return drizzle(customPool);
  }
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return drizzle(pool);
}

// Default export for production usage
export const db = createDb();