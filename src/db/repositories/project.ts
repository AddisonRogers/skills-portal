import { db } from '@/db/database';
import { NewProject, UpdateProject, Project } from '@/db/types';

/**
 * Find a project by ID
 * @param id The project ID
 * @returns The project or undefined if not found
 */
export async function findById(id: number): Promise<Project | undefined> {
  return await db
    .selectFrom('project')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find a project by name
 * @param name The project name
 * @returns The project or undefined if not found
 */
export async function findByName(name: string): Promise<Project | undefined> {
  return await db
    .selectFrom('project')
    .selectAll()
    .where('name', '=', name)
    .executeTakeFirst();
}

/**
 * Find active projects (not ended)
 * @returns Array of active projects
 */
export async function findActive(): Promise<Project[]> {
  return await db
    .selectFrom('project')
    .selectAll()
    .where('endedAt', 'is', null)
    .orWhere('endedAt', '>', new Date())
    .execute();
}

/**
 * Get all projects
 * @returns Array of all projects
 */
export async function findAll(): Promise<Project[]> {
  return await db
    .selectFrom('project')
    .selectAll()
    .execute();
}

/**
 * Create a new project
 * @param project The project data to insert
 * @returns The created project
 */
export async function create(project: NewProject): Promise<Project> {
  return await db
    .insertInto('project')
    .values(project)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a project
 * @param id The project ID
 * @param project The project data to update
 * @returns The updated project
 */
export async function update(id: number, project: UpdateProject): Promise<Project | undefined> {
  return await db
    .updateTable('project')
    .set(project)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a project
 * @param id The project ID
 * @returns True if the project was deleted, false otherwise
 */
export async function delete_(id: number): Promise<boolean> {
  const result = await db
    .deleteFrom('project')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

// Export all functions as a single object for convenience
export const projectRepository = {
  findById,
  findByName,
  findActive,
  findAll,
  create,
  update,
  delete: delete_
};