import { db } from '@/db/database';
import { NewUserCertification, UpdateUserCertification, UserCertification } from '@/db/types';

/**
 * Find a user certification by ID
 * @param id The user certification ID
 * @returns The user certification or undefined if not found
 */
export async function findById(id: number): Promise<UserCertification | undefined> {
  return await db
    .selectFrom('user_certification')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find user certifications by user ID
 * @param userId The user ID
 * @returns Array of user certifications for the user
 */
export async function findByUserId(userId: string): Promise<UserCertification[]> {
  return await db
    .selectFrom('user_certification')
    .selectAll()
    .where('userId', '=', userId)
    .execute();
}

/**
 * Find user certifications by certification ID
 * @param certId The certification ID
 * @returns Array of user certifications for the certification
 */
export async function findByCertId(certId: string): Promise<UserCertification[]> {
  return await db
    .selectFrom('user_certification')
    .selectAll()
    .where('certId', '=', certId)
    .execute();
}

/**
 * Find a specific user certification by user ID and certification ID
 * @param userId The user ID
 * @param certId The certification ID
 * @returns The user certification or undefined if not found
 */
export async function findByUserIdAndCertId(
  userId: string,
  certId: string
): Promise<UserCertification | undefined> {
  return await db
    .selectFrom('user_certification')
    .selectAll()
    .where('userId', '=', userId)
    .where('certId', '=', certId)
    .executeTakeFirst();
}

/**
 * Find expired user certifications
 * @returns Array of expired user certifications
 */
export async function findExpired(): Promise<UserCertification[]> {
  return await db
    .selectFrom('user_certification')
    .selectAll()
    .where('expiresAt', '<', new Date())
    .where('expiresAt', 'is not', null)
    .execute();
}

/**
 * Get all user certifications
 * @returns Array of all user certifications
 */
export async function findAll(): Promise<UserCertification[]> {
  return await db
    .selectFrom('user_certification')
    .selectAll()
    .execute();
}

/**
 * Create a new user certification
 * @param userCertification The user certification data to insert
 * @returns The created user certification
 */
export async function create(userCertification: NewUserCertification): Promise<UserCertification> {
  return await db
    .insertInto('user_certification')
    .values(userCertification)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a user certification
 * @param id The user certification ID
 * @param userCertification The user certification data to update
 * @returns The updated user certification
 */
export async function update(id: number, userCertification: UpdateUserCertification): Promise<UserCertification | undefined> {
  return await db
    .updateTable('user_certification')
    .set(userCertification)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a user certification
 * @param id The user certification ID
 * @returns True if the user certification was deleted, false otherwise
 */
export async function delete_(id: number): Promise<boolean> {
  const result = await db
    .deleteFrom('user_certification')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

/**
 * Delete user certifications by user ID
 * @param userId The user ID
 * @returns Number of deleted user certifications
 */
export async function deleteByUserId(userId: string): Promise<number> {
  const result = await db
    .deleteFrom('user_certification')
    .where('userId', '=', userId)
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

/**
 * Delete user certifications by certification ID
 * @param certId The certification ID
 * @returns Number of deleted user certifications
 */
export async function deleteByCertId(certId: string): Promise<number> {
  const result = await db
    .deleteFrom('user_certification')
    .where('certId', '=', certId)
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

// Export all functions as a single object for convenience
export const userCertificationRepository = {
  findById,
  findByUserId,
  findByCertId,
  findByUserIdAndCertId,
  findExpired,
  findAll,
  create,
  update,
  delete: delete_,
  deleteByUserId,
  deleteByCertId
};