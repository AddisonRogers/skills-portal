import { db } from '@/db/database';
import { NewClientProject, UpdateClientProject, ClientProject } from '@/db/types';

/**
 * Find a client project by ID
 * @param id The client project ID
 * @returns The client project or undefined if not found
 */
export async function findById(id: number): Promise<ClientProject | undefined> {
  return await db
    .selectFrom('client_project')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find client projects by client ID
 * @param clientId The client ID
 * @returns Array of client projects for the client
 */
export async function findByClientId(clientId: string): Promise<ClientProject[]> {
  return await db
    .selectFrom('client_project')
    .selectAll()
    .where('clientId', '=', clientId)
    .execute();
}

/**
 * Find client projects by project ID
 * @param projectId The project ID
 * @returns Array of client projects for the project
 */
export async function findByProjectId(projectId: string): Promise<ClientProject[]> {
  return await db
    .selectFrom('client_project')
    .selectAll()
    .where('projectId', '=', projectId)
    .execute();
}

/**
 * Find a specific client project by client ID and project ID
 * @param clientId The client ID
 * @param projectId The project ID
 * @returns The client project or undefined if not found
 */
export async function findByClientIdAndProjectId(
  clientId: string,
  projectId: string
): Promise<ClientProject | undefined> {
  return await db
    .selectFrom('client_project')
    .selectAll()
    .where('clientId', '=', clientId)
    .where('projectId', '=', projectId)
    .executeTakeFirst();
}

/**
 * Get all client projects
 * @returns Array of all client projects
 */
export async function findAll(): Promise<ClientProject[]> {
  return await db
    .selectFrom('client_project')
    .selectAll()
    .execute();
}

/**
 * Create a new client project
 * @param clientProject The client project data to insert
 * @returns The created client project
 */
export async function create(clientProject: NewClientProject): Promise<ClientProject> {
  return await db
    .insertInto('client_project')
    .values(clientProject)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a client project
 * @param id The client project ID
 * @param clientProject The client project data to update
 * @returns The updated client project
 */
export async function update(id: number, clientProject: UpdateClientProject): Promise<ClientProject | undefined> {
  return await db
    .updateTable('client_project')
    .set(clientProject)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a client project
 * @param id The client project ID
 * @returns True if the client project was deleted, false otherwise
 */
export async function delete_(id: number): Promise<boolean> {
  const result = await db
    .deleteFrom('client_project')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

/**
 * Delete client projects by client ID
 * @param clientId The client ID
 * @returns Number of deleted client projects
 */
export async function deleteByClientId(clientId: string): Promise<number> {
  const result = await db
    .deleteFrom('client_project')
    .where('clientId', '=', clientId)
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

/**
 * Delete client projects by project ID
 * @param projectId The project ID
 * @returns Number of deleted client projects
 */
export async function deleteByProjectId(projectId: string): Promise<number> {
  const result = await db
    .deleteFrom('client_project')
    .where('projectId', '=', projectId)
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

// Export all functions as a single object for convenience
export const clientProjectRepository = {
  findById,
  findByClientId,
  findByProjectId,
  findByClientIdAndProjectId,
  findAll,
  create,
  update,
  delete: delete_,
  deleteByClientId,
  deleteByProjectId
};