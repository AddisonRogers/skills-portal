import { db } from '@/db/database';
import { NewVerification, UpdateVerification, Verification } from '@/db/types';

/**
 * Find a verification by ID
 * @param id The verification ID
 * @returns The verification or undefined if not found
 */
export async function findById(id: string): Promise<Verification | undefined> {
  return await db
    .selectFrom('verification')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find a verification by identifier and value
 * @param identifier The identifier
 * @param value The value
 * @returns The verification or undefined if not found
 */
export async function findByIdentifierAndValue(
  identifier: string,
  value: string
): Promise<Verification | undefined> {
  return await db
    .selectFrom('verification')
    .selectAll()
    .where('identifier', '=', identifier)
    .where('value', '=', value)
    .executeTakeFirst();
}

/**
 * Get all verifications
 * @returns Array of all verifications
 */
export async function findAll(): Promise<Verification[]> {
  return await db
    .selectFrom('verification')
    .selectAll()
    .execute();
}

/**
 * Create a new verification
 * @param verification The verification data to insert
 * @returns The created verification
 */
export async function create(verification: NewVerification): Promise<Verification> {
  return await db
    .insertInto('verification')
    .values(verification)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a verification
 * @param id The verification ID
 * @param verification The verification data to update
 * @returns The updated verification
 */
export async function update(id: string, verification: UpdateVerification): Promise<Verification | undefined> {
  return await db
    .updateTable('verification')
    .set(verification)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a verification
 * @param id The verification ID
 * @returns True if the verification was deleted, false otherwise
 */
export async function delete_(id: string): Promise<boolean> {
  const result = await db
    .deleteFrom('verification')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

/**
 * Delete expired verifications
 * @returns Number of deleted verifications
 */
export async function deleteExpired(): Promise<number> {
  const result = await db
    .deleteFrom('verification')
    .where('expiresAt', '<', new Date())
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

// Export all functions as a single object for convenience
export const verificationRepository = {
  findById,
  findByIdentifierAndValue,
  findAll,
  create,
  update,
  delete: delete_,
  deleteExpired
};