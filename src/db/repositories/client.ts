import { db } from '@/db/database';
import { NewClient, UpdateClient, Client } from '@/db/types';

/**
 * Find a client by ID
 * @param id The client ID
 * @returns The client or undefined if not found
 */
export async function findById(id: number): Promise<Client | undefined> {
  return await db
    .selectFrom('client')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find a client by name
 * @param name The client name
 * @returns The client or undefined if not found
 */
export async function findByName(name: string): Promise<Client | undefined> {
  return await db
    .selectFrom('client')
    .selectAll()
    .where('name', '=', name)
    .executeTakeFirst();
}

/**
 * Get all clients
 * @returns Array of all clients
 */
export async function findAll(): Promise<Client[]> {
  return await db
    .selectFrom('client')
    .selectAll()
    .execute();
}

/**
 * Create a new client
 * @param client The client data to insert
 * @returns The created client
 */
export async function create(client: NewClient): Promise<Client> {
  return await db
    .insertInto('client')
    .values(client)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a client
 * @param id The client ID
 * @param client The client data to update
 * @returns The updated client
 */
export async function update(id: number, client: UpdateClient): Promise<Client | undefined> {
  return await db
    .updateTable('client')
    .set(client)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a client
 * @param id The client ID
 * @returns True if the client was deleted, false otherwise
 */
export async function delete_(id: number): Promise<boolean> {
  const result = await db
    .deleteFrom('client')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

// Export all functions as a single object for convenience
export const clientRepository = {
  findById,
  findByName,
  findAll,
  create,
  update,
  delete: delete_
};