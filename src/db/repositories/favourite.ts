import {and, eq} from "drizzle-orm";
import {userFavoriteRoadmap, userFavoriteSkill} from "@/db/schema";
import {db} from "@/lib/db";
import {getUserByEmail} from "@/db/repositories/users";

export async function addFavouriteRoadmapId(userId: string, roadmapId: string) {
  return db.insert(userFavoriteRoadmap).values({
    userId,
    roadmapId,
  });
}

export async function addFavouriteRoadmapEmail(userEmail: string, roadmapId: string) {
  const user = await getUserByEmail(userEmail);
  return db.insert(userFavoriteRoadmap).values({
    userId: user[0].id,
    roadmapId,
  })
}

export async function getFavouriteRoadmaps(userId: string) {
  return db
    .select()
    .from(userFavoriteRoadmap)
    .where(eq(userFavoriteRoadmap.userId, userId));
}

export async function getFavouriteSkills(userId: string) {
  return db
    .select()
    .from(userFavoriteSkill)
    .where(eq(userFavoriteSkill.userId, userId));
}

export async function removeFavouriteRoadmapId(userId: string, roadmapId: string) {
  return db
    .delete(userFavoriteRoadmap)
    .where(
      and(
        eq(userFavoriteRoadmap.userId, userId),
        eq(userFavoriteRoadmap.roadmapId, roadmapId)
      )
    );
}

export async function removeFavouriteRoadmapEmail(userEmail: string, roadmapId: string) {
  const user = await getUserByEmail(userEmail);
  if (!user || !user[0]) return null;
  return db
    .delete(userFavoriteRoadmap)
    .where(
      and(
        eq(userFavoriteRoadmap.userId, user[0].id),
        eq(userFavoriteRoadmap.roadmapId, roadmapId)
      )
    );
}

export async function removeFavouriteSkillId(userId: string, skillId: number) {
  return db
    .delete(userFavoriteSkill)
    .where(
      and(
        eq(userFavoriteSkill.userId, userId),
        eq(userFavoriteSkill.skillId, skillId)
      )
    );
}

export async function removeFavouriteSkillEmail(userEmail: string, skillId: number) {
  const user = await getUserByEmail(userEmail);
  if (!user || !user[0]) return null;
  return db
    .delete(userFavoriteSkill)
    .where(
      and(
        eq(userFavoriteSkill.userId, user[0].id),
        eq(userFavoriteSkill.skillId, skillId)
      )
    );
}


export async function addFavouriteSkillId(userId: string, skillId: number) {
  return db.insert(userFavoriteSkill).values({
    userId,
    skillId,
  });
}

export async function addFavouriteSkillEmail(userEmail: string, skillId: number) {
  const user = await getUserByEmail(userEmail);
  return db.insert(userFavoriteSkill).values({
    userId: user[0].id,
    skillId,
  })
}