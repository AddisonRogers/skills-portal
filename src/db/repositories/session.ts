import { db } from '@/db/database';
import { NewSession, Session, UpdateSession } from '@/db/types';

/**
 * Find a session by ID
 * @param id The session ID
 * @returns The session or undefined if not found
 */
export async function findById(id: string): Promise<Session | undefined> {
  return await db
    .selectFrom('session')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find a session by token
 * @param token The session token
 * @returns The session or undefined if not found
 */
export async function findByToken(token: string): Promise<Session | undefined> {
  return await db
    .selectFrom('session')
    .selectAll()
    .where('token', '=', token)
    .executeTakeFirst();
}

/**
 * Find sessions by user ID
 * @param userId The user ID
 * @returns Array of sessions for the user
 */
export async function findByUserId(userId: string): Promise<Session[]> {
  return await db
    .selectFrom('session')
    .selectAll()
    .where('userId', '=', userId)
    .execute();
}

/**
 * Get all sessions
 * @returns Array of all sessions
 */
export async function findAll(): Promise<Session[]> {
  return await db
    .selectFrom('session')
    .selectAll()
    .execute();
}

/**
 * Create a new session
 * @param session The session data to insert
 * @returns The created session
 */
export async function create(session: NewSession): Promise<Session> {
  return await db
    .insertInto('session')
    .values(session)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a session
 * @param id The session ID
 * @param session The session data to update
 * @returns The updated session
 */
export async function update(id: string, session: UpdateSession): Promise<Session | undefined> {
  return await db
    .updateTable('session')
    .set(session)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a session
 * @param id The session ID
 * @returns True if the session was deleted, false otherwise
 */
export async function delete_(id: string): Promise<boolean> {
  const result = await db
    .deleteFrom('session')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

/**
 * Delete expired sessions
 * @returns Number of deleted sessions
 */
export async function deleteExpired(): Promise<number> {
  const result = await db
    .deleteFrom('session')
    .where('expiresAt', '<', new Date())
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

// Export all functions as a single object for convenience
export const sessionRepository = {
  findById,
  findByToken,
  findByUserId,
  findAll,
  create,
  update,
  delete: delete_,
  deleteExpired
};