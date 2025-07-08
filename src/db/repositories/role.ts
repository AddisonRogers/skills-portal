import { db } from '@/db/database';
import { NewRole, UpdateRole, Role } from '@/db/types';

/**
 * Find a role by ID
 * @param id The role ID
 * @returns The role or undefined if not found
 */
export async function findById(id: number): Promise<Role | undefined> {
  return await db
    .selectFrom('role')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find a role by name
 * @param name The role name
 * @returns The role or undefined if not found
 */
export async function findByName(name: string): Promise<Role | undefined> {
  return await db
    .selectFrom('role')
    .selectAll()
    .where('name', '=', name)
    .executeTakeFirst();
}

/**
 * Get all roles
 * @returns Array of all roles
 */
export async function findAll(): Promise<Role[]> {
  return await db
    .selectFrom('role')
    .selectAll()
    .execute();
}

/**
 * Create a new role
 * @param role The role data to insert
 * @returns The created role
 */
export async function create(role: NewRole): Promise<Role> {
  return await db
    .insertInto('role')
    .values(role)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a role
 * @param id The role ID
 * @param role The role data to update
 * @returns The updated role
 */
export async function update(id: number, role: UpdateRole): Promise<Role | undefined> {
  return await db
    .updateTable('role')
    .set(role)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a role
 * @param id The role ID
 * @returns True if the role was deleted, false otherwise
 */
export async function delete_(id: number): Promise<boolean> {
  const result = await db
    .deleteFrom('role')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

// Export all functions as a single object for convenience
export const roleRepository = {
  findById,
  findByName,
  findAll,
  create,
  update,
  delete: delete_
};