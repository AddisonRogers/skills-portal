import { db } from '@/db/database';
import { NewSkill, UpdateSkill, Skill } from '@/db/types';

/**
 * Find a skill by ID
 * @param id The skill ID
 * @returns The skill or undefined if not found
 */
export async function findById(id: number): Promise<Skill | undefined> {
  return await db
    .selectFrom('skill')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

/**
 * Find a skill by name
 * @param name The skill name
 * @returns The skill or undefined if not found
 */
export async function findByName(name: string): Promise<Skill | undefined> {
  return await db
    .selectFrom('skill')
    .selectAll()
    .where('name', '=', name)
    .executeTakeFirst();
}

/**
 * Get all skills
 * @returns Array of all skills
 */
export async function findAll(): Promise<Skill[]> {
  return await db
    .selectFrom('skill')
    .selectAll()
    .execute();
}

/**
 * Create a new skill
 * @param skill The skill data to insert
 * @returns The created skill
 */
export async function create(skill: NewSkill): Promise<Skill> {
  return await db
    .insertInto('skill')
    .values(skill)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/**
 * Update a skill
 * @param id The skill ID
 * @param skill The skill data to update
 * @returns The updated skill
 */
export async function update(id: number, skill: UpdateSkill): Promise<Skill | undefined> {
  return await db
    .updateTable('skill')
    .set(skill)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

/**
 * Delete a skill
 * @param id The skill ID
 * @returns True if the skill was deleted, false otherwise
 */
export async function delete_(id: number): Promise<boolean> {
  const result = await db
    .deleteFrom('skill')
    .where('id', '=', id)
    .executeTakeFirst();
  
  return result.numDeletedRows > 0;
}

// Export all functions as a single object for convenience
export const skillRepository = {
  findById,
  findByName,
  findAll,
  create,
  update,
  delete: delete_
};