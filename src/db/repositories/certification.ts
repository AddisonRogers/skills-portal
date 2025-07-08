import { db } from '@/db/database';
import { NewCertification, UpdateCertification, Certification } from '@/db/types';

/**
 * Find a certification by ID
 * @param id The certification ID
 * @returns The certification or undefined if not found
 */
export async function findById(id: number): Promise<Certification | undefined> {
  return await db
    .selectFrom('certification')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find a certification by name
 * @param name The certification name
 * @returns The certification or undefined if not found
 */
export async function findByName(name: string): Promise<Certification | undefined> {
  return await db
    .selectFrom('certification')
    .selectAll()
    .where('name', '=', name)
    .executeTakeFirst();
}

/**
 * Find certifications by issuer
 * @param issuer The certification issuer
 * @returns Array of certifications from the issuer
 */
export async function findByIssuer(issuer: string): Promise<Certification[]> {
  return await db
    .selectFrom('certification')
    .selectAll()
    .where('issuer', '=', issuer)
    .execute();
}

/**
 * Get all certifications
 * @returns Array of all certifications
 */
export async function findAll(): Promise<Certification[]> {
  return await db
    .selectFrom('certification')
    .selectAll()
    .execute();
}

/**
 * Create a new certification
 * @param certification The certification data to insert
 * @returns The created certification
 */
export async function create(certification: NewCertification): Promise<Certification> {
  return await db
    .insertInto('certification')
    .values(certification)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a certification
 * @param id The certification ID
 * @param certification The certification data to update
 * @returns The updated certification
 */
export async function update(id: number, certification: UpdateCertification): Promise<Certification | undefined> {
  return await db
    .updateTable('certification')
    .set(certification)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a certification
 * @param id The certification ID
 * @returns True if the certification was deleted, false otherwise
 */
export async function delete_(id: number): Promise<boolean> {
  const result = await db
    .deleteFrom('certification')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

// Export all functions as a single object for convenience
export const certificationRepository = {
  findById,
  findByName,
  findByIssuer,
  findAll,
  create,
  update,
  delete: delete_
};