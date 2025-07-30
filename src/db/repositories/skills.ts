"use server";

import {and, eq} from "drizzle-orm";
import {roadmap, skill, skillRoadmap, user, userSkill} from "@/db/schema";
import {db} from "@/lib/db";
import {PGSkillData, PGSkillDataUser, SkillNode} from "@/types/Roadmap";
import {getUserByEmail} from "@/db/repositories/users";

// Only possible with the positions table
export async function getSkillsForRoadmap(
  roadmapId: string,
): Promise<Map<string, SkillNode>> {
  const data: PGSkillData[] = await db
    .select({
      name: skill.name,
      description: skill.description,
      blobUrl: skill.blobUrl,
    })
    .from(skill)
    .innerJoin(skillRoadmap, eq(skill.id, skillRoadmap.skillId))
    .innerJoin(roadmap, eq(skillRoadmap.roadmapId, roadmap.id))
    .where(eq(roadmap.id, roadmapId));

  return new Map(
    data.map((skill) => [
      skill.name,
      {
        ...skill,
        nodeType: "skill",
        x: 0,
        y: 0,
      } as SkillNode,
    ]),
  );
}

export async function getSkillsForRoadmapForUser(
  roadmapId: string,
  userEmail: string,
): Promise<Map<string, SkillNode>> {
  const data: PGSkillDataUser[] = await db
    .select({
      name: skill.name,
      description: skill.description,
      blobUrl: skill.blobUrl,
      acquiredAt: userSkill.acquiredAt,
      level: userSkill.level,
    })
    .from(skill)
    .innerJoin(skillRoadmap, eq(skill.id, skillRoadmap.skillId))
    .innerJoin(userSkill, eq(skill.id, userSkill.skillId))
    .innerJoin(roadmap, eq(skillRoadmap.roadmapId, roadmap.id))
    .innerJoin(user, eq(userSkill.userId, user.id))
    .where(and(eq(roadmap.id, roadmapId), eq(user.email, userEmail)));

  return new Map(
    data.map((skill) => [
      skill.name,
      {
        ...skill,
        nodeType: "skill",
        x: 0,
        y: 0,
      } as SkillNode,
    ]),
  );
}

// Helper function to convert skill name to slug (same as in the skills page)
function skillNameToSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export async function getSkill(skillIdentifier: string) {
  try {
    // First try to find by machine name
    const skillsByMachineName = await db
      .select({
        name: skill.name,
        description: skill.description,
        blobUrl: skill.blobUrl,
        madeBy: skill.madeBy,
      })
      .from(skill)
      .where(eq(skill.machineName, skillIdentifier));

    // If found, return the result
    if (skillsByMachineName && skillsByMachineName.length > 0) {
      return skillsByMachineName;
    }

    // If not found by machine name, get all skills and find by slug
    const allSkills = await db
      .select({
        name: skill.name,
        description: skill.description,
        blobUrl: skill.blobUrl,
        madeBy: skill.madeBy,
      })
      .from(skill);

    // Find the skill where the slug matches the identifier
    const matchingSkill = allSkills.find(
      (s) => skillNameToSlug(s.name) === skillIdentifier,
    );

    return matchingSkill ? [matchingSkill] : null;
  } catch (error) {
    console.error("Error fetching skill:", error);
    return null;
  }
}

export async function getRoadmapSkills(userId: string | null) {
  if (userId) {
    return db
      .select({
        id: skill.id,
        name: skill.name,
        description: skill.description,
        madeBy: skill.madeBy,
        roadmapId: skillRoadmap.roadmapId,
        roadmapName: roadmap.name, // Add this
        acquiredAt: userSkill.acquiredAt,
        level: userSkill.level,
      })
      .from(skill)
      .innerJoin(userSkill, eq(skill.id, userSkill.skillId))
      .innerJoin(skillRoadmap, eq(skill.id, skillRoadmap.skillId))
      .innerJoin(roadmap, eq(skillRoadmap.roadmapId, roadmap.id))
      .where(eq(userSkill.userId, userId))
      .orderBy(roadmap.name);
  }

  return db
    .select({
      id: skill.id,
      name: skill.name,
      description: skill.description,
      madeBy: skill.madeBy,
      roadmapId: skillRoadmap.roadmapId,
      roadmapName: roadmap.name, // Add this
    })
    .from(skill)
    .innerJoin(skillRoadmap, eq(skill.id, skillRoadmap.skillId))
    .innerJoin(roadmap, eq(skillRoadmap.roadmapId, roadmap.id));
}

export type getSkillForUserEmailResult = {
  id: number;
  name: string;
  description: string | null;
  madeBy: string | null;
  acquiredAt: Date | null;
  level: number | null;
} ;

export async function getSkillForUserEmail(
  skillIdentifier: string,
  userEmail: string,
): Promise<getSkillForUserEmailResult[] | null> {
  try {
    return db.select({
      id: skill.id,
      name: skill.name,
      description: skill.description,
      madeBy: skill.madeBy,
      acquiredAt: userSkill.acquiredAt,
      level: userSkill.level,
    }).from(skill)
      .innerJoin(userSkill, eq(skill.id, userSkill.skillId))
      .innerJoin(user, eq(userSkill.userId, user.id))
      .where(and(eq(user.email, userEmail), eq(skill.machineName, skillIdentifier)))

  } catch
    (error) {
    console.error("Error fetching skill:", error);
    return null;
  }
}

export async function setSkillProgressionForUserEmail(
  skillIdentifier: string,
  userEmail: string,
  level: number,
) {
  const skill = await getSkillForUserEmail(skillIdentifier, userEmail);
  if (!skill || skill.length === 0) return null;

  const user = await getUserByEmail(userEmail);
  if (!user || !user[0]) return null;

  const skillId = skill[0].id;
  return await db.insert(userSkill)
    .values({
      userId: user[0].id,
      skillId: skillId,
      acquiredAt: new Date(),
      level,
    })
    .onConflictDoUpdate({
      target: [userSkill.userId, userSkill.skillId],
      set: {
        acquiredAt: new Date(),
        level,
      }
    });
}