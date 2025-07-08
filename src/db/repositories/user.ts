import { db } from '@/db/database';
import { NewUser, UpdateUser, User } from '@/db/types';

/**
 * Find a user by ID
 * @param id The user ID
 * @returns The user or undefined if not found
 */
export async function findById(id: string): Promise<User | undefined> {
  return await db
    .selectFrom('user')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find a user by email
 * @param email The user email
 * @returns The user or undefined if not found
 */
export async function findByEmail(email: string): Promise<User | undefined> {
  return await db
    .selectFrom('user')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirst();
}

/**
 * Get all users
 * @returns Array of all users
 */
export async function findAll(): Promise<User[]> {
  return await db
    .selectFrom('user')
    .selectAll()
    .execute();
}

/**
 * Create a new user
 * @param user The user data to insert
 * @returns The created user
 */
export async function create(user: NewUser): Promise<User> {
  return await db
    .insertInto('user')
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a user
 * @param id The user ID
 * @param user The user data to update
 * @returns The updated user
 */
export async function update(id: string, user: UpdateUser): Promise<User | undefined> {
  return await db
    .updateTable('user')
    .set(user)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a user
 * @param id The user ID
 * @returns True if the user was deleted, false otherwise
 */
export async function delete_(id: string): Promise<boolean> {
  const result = await db
    .deleteFrom('user')
    .where('id', '=', id)
    .executeTakeFirst();

  return result.numDeletedRows > 0;
}

// Export all functions as a single object for convenience
export const userRepository = {
  findById,
  findByEmail,
  findAll,
  create,
  update,
  delete: delete_
};
