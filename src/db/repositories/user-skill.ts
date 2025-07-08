import { db } from '@/db/database';
import { NewUserSkill, UpdateUserSkill, UserSkill } from '@/db/types';

/**
 * Find a user skill by ID
 * @param id The user skill ID
 * @returns The user skill or undefined if not found
 */
export async function findById(id: number): Promise<UserSkill | undefined> {
  return await db
    .selectFrom('user_skill')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find user skills by user ID
 * @param userId The user ID
 * @returns Array of user skills for the user
 */
export async function findByUserId(userId: string): Promise<UserSkill[]> {
  return await db
    .selectFrom('user_skill')
    .selectAll()
    .where('userId', '=', userId)
    .execute();
}

/**
 * Find user skills by skill ID
 * @param skillId The skill ID
 * @returns Array of user skills for the skill
 */
export async function findBySkillId(skillId: string): Promise<UserSkill[]> {
  return await db
    .selectFrom('user_skill')
    .selectAll()
    .where('skillId', '=', skillId)
    .execute();
}

/**
 * Find a specific user skill by user ID and skill ID
 * @param userId The user ID
 * @param skillId The skill ID
 * @returns The user skill or undefined if not found
 */
export async function findByUserIdAndSkillId(
  userId: string,
  skillId: string
): Promise<UserSkill | undefined> {
  return await db
    .selectFrom('user_skill')
    .selectAll()
    .where('userId', '=', userId)
    .where('skillId', '=', skillId)
    .executeTakeFirst();
}

/**
 * Get all user skills
 * @returns Array of all user skills
 */
export async function findAll(): Promise<UserSkill[]> {
  return await db
    .selectFrom('user_skill')
    .selectAll()
    .execute();
}

/**
 * Create a new user skill
 * @param userSkill The user skill data to insert
 * @returns The created user skill
 */
export async function create(userSkill: NewUserSkill): Promise<UserSkill> {
  return await db
    .insertInto('user_skill')
    .values(userSkill)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a user skill
 * @param id The user skill ID
 * @param userSkill The user skill data to update
 * @returns The updated user skill
 */
export async function update(id: number, userSkill: UpdateUserSkill): Promise<UserSkill | undefined> {
  return await db
    .updateTable('user_skill')
    .set(userSkill)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a user skill
 * @param id The user skill ID
 * @returns True if the user skill was deleted, false otherwise
 */
export async function delete_(id: number): Promise<boolean> {
  const result = await db
    .deleteFrom('user_skill')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

/**
 * Delete user skills by user ID
 * @param userId The user ID
 * @returns Number of deleted user skills
 */
export async function deleteByUserId(userId: string): Promise<number> {
  const result = await db
    .deleteFrom('user_skill')
    .where('userId', '=', userId)
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

/**
 * Delete user skills by skill ID
 * @param skillId The skill ID
 * @returns Number of deleted user skills
 */
export async function deleteBySkillId(skillId: string): Promise<number> {
  const result = await db
    .deleteFrom('user_skill')
    .where('skillId', '=', skillId)
    .executeTakeFirst();
  
  return result.numDeletedRows;
}

// Export all functions as a single object for convenience
export const userSkillRepository = {
  findById,
  findByUserId,
  findBySkillId,
  findByUserIdAndSkillId,
  findAll,
  create,
  update,
  delete: delete_,
  deleteByUserId,
  deleteBySkillId
};