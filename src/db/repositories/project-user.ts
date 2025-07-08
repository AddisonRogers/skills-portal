import { db } from '@/db/database';
import { NewProjectUser, UpdateProjectUser, ProjectUser } from '@/db/types';

/**
 * Find a project user by ID
 * @param id The project user ID
 * @returns The project user or undefined if not found
 */
export async function findById(id: number): Promise<ProjectUser | undefined> {
  return await db
    .selectFrom('project_user')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find project users by project ID
 * @param projectId The project ID
 * @returns Array of project users for the project
 */
export async function findByProjectId(projectId: string): Promise<ProjectUser[]> {
  return await db
    .selectFrom('project_user')
    .selectAll()
    .where('projectId', '=', projectId)
    .execute();
}

/**
 * Find project users by user ID
 * @param userId The user ID
 * @returns Array of project users for the user
 */
export async function findByUserId(userId: string): Promise<ProjectUser[]> {
  return await db
    .selectFrom('project_user')
    .selectAll()
    .where('userId', '=', userId)
    .execute();
}

/**
 * Find project users by role ID
 * @param roleId The role ID
 * @returns Array of project users with the role
 */
export async function findByRoleId(roleId: string): Promise<ProjectUser[]> {
  return await db
    .selectFrom('project_user')
    .selectAll()
    .where('roleId', '=', roleId)
    .execute();
}

/**
 * Find a specific project user by project ID and user ID
 * @param projectId The project ID
 * @param userId The user ID
 * @returns The project user or undefined if not found
 */
export async function findByProjectIdAndUserId(
  projectId: string,
  userId: string
): Promise<ProjectUser | undefined> {
  return await db
    .selectFrom('project_user')
    .selectAll()
    .where('projectId', '=', projectId)
    .where('userId', '=', userId)
    .executeTakeFirst();
}

/**
 * Get all project users
 * @returns Array of all project users
 */
export async function findAll(): Promise<ProjectUser[]> {
  return await db
    .selectFrom('project_user')
    .selectAll()
    .execute();
}

/**
 * Create a new project user
 * @param projectUser The project user data to insert
 * @returns The created project user
 */
export async function create(projectUser: NewProjectUser): Promise<ProjectUser> {
  return await db
    .insertInto('project_user')
    .values(projectUser)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a project user
 * @param id The project user ID
 * @param projectUser The project user data to update
 * @returns The updated project user
 */
export async function update(id: number, projectUser: UpdateProjectUser): Promise<ProjectUser | undefined> {
  return await db
    .updateTable('project_user')
    .set(projectUser)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a project user
 * @param id The project user ID
 * @returns True if the project user was deleted, false otherwise
 */
export async function delete_(id: number): Promise<boolean> {
  const result = await db
    .deleteFrom('project_user')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

/**
 * Delete project users by project ID
 * @param projectId The project ID
 * @returns Number of deleted project users
 */
export async function deleteByProjectId(projectId: string): Promise<number> {
  const result = await db
    .deleteFrom('project_user')
    .where('projectId', '=', projectId)
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

/**
 * Delete project users by user ID
 * @param userId The user ID
 * @returns Number of deleted project users
 */
export async function deleteByUserId(userId: string): Promise<number> {
  const result = await db
    .deleteFrom('project_user')
    .where('userId', '=', userId)
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

/**
 * Delete project users by role ID
 * @param roleId The role ID
 * @returns Number of deleted project users
 */
export async function deleteByRoleId(roleId: string): Promise<number> {
  const result = await db
    .deleteFrom('project_user')
    .where('roleId', '=', roleId)
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

// Export all functions as a single object for convenience
export const projectUserRepository = {
  findById,
  findByProjectId,
  findByUserId,
  findByRoleId,
  findByProjectIdAndUserId,
  findAll,
  create,
  update,
  delete: delete_,
  deleteByProjectId,
  deleteByUserId,
  deleteByRoleId
};