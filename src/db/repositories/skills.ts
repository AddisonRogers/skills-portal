"use server";

import {and, eq} from "drizzle-orm";
import {roadmap, skill, skillRoadmap, user, userSkill} from "@/db/schema";
import {db} from "@/lib/db";
import {PGSkillData, PGSkillDataUser, SkillNode} from "@/types/Roadmap";
import {getUserByEmail} from "@/db/repositories/users";

export async function getAllSkills() {
  try {
    return db
      .select({
        id: skill.id,
        name: skill.name,
        machineName: skill.machineName,
        bigSkill: skill.bigSkill,
        xpAmount: skill.xpAmount,
        description: skill.description,
        blobUrl: skill.blobUrl,
        madeBy: skill.madeBy,
        createdAt: skill.createdAt,
        updatedAt: skill.updatedAt,
      })
      .from(skill);
  } catch (e) {
    console.error(e);
  }
}

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
  const userData = await db
    .select({id: user.id})
    .from(user)
    .where(eq(user.email, userEmail))
    .limit(1);

  if (userData.length === 0) {
    throw new Error("User not found");
  }

  const userId = userData[0].id;

  // Then get all skills for the roadmap with optional user skill data
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
    .innerJoin(roadmap, eq(skillRoadmap.roadmapId, roadmap.id))
    .leftJoin(
      userSkill,
      and(eq(skill.id, userSkill.skillId), eq(userSkill.userId, userId)),
    )
    .where(eq(roadmap.id, roadmapId));

  console.debug(`we got: ${data.length} skills`);
  return new Map(
    data.map((skill) => [
      skill.name,
      {
        ...skill,
        nodeType: "skill",
        x: 0,
        y: 0,
        // Set defaults for users who haven't acquired the skill
        level: skill.level ?? 0,
        acquiredAt: skill.acquiredAt ?? null,
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
};

export async function getSkillForUserEmail(
  skillIdentifier: string,
  userEmail: string,
): Promise<getSkillForUserEmailResult | null> {
  try {
    const userData = await db
      .select({id: user.id})
      .from(user)
      .where(eq(user.email, userEmail))
      .limit(1);

    const userId = userData[0].id;

    console.debug(`skillIdentifier: ${skillIdentifier}`);

    const machineNameSkill = skillIdentifier
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^a-zA-Z0-9\-]/g, ""); // Remove all except a-z, A-Z, 0-9, and dash

    const skillData = await db
      .select({
        id: skill.id,
        name: skill.name,
        description: skill.description,
        madeBy: skill.madeBy,
      })
      .from(skill)
      .where(
        and(
          eq(skill.machineName, machineNameSkill),
        ),
      );

    const userSkillData = await db
      .select({
        level: userSkill.level,
        acquiredAt: userSkill.acquiredAt,
      })
      .from(userSkill)
      .where(
        and(
          eq(userSkill.userId, userId),
          eq(userSkill.skillId, skillData[0].id),
        ),
      )
      .limit(1);

    const result: getSkillForUserEmailResult = {
      id: skillData[0].id,
      name: skillData[0].name,
      description: skillData[0].description,
      madeBy: skillData[0].madeBy,
      // Use data from userSkillData if it exists, otherwise use defaults
      level: userSkillData.length > 0 ? userSkillData[0].level : 0,
      acquiredAt: userSkillData.length > 0 ? userSkillData[0].acquiredAt : null,
    };

    return result;
  } catch (error) {
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
  if (!skill) return null;

  const user = await getUserByEmail(userEmail);
  console.debug(
    `line 234 setting skill ${skill.id} for user ${user[0].id} to ${level}`,
  );
  if (!user || !user[0]) return null;

  const skillId = skill.id;

  console.debug(`setting skill ${skillId} for user ${user[0].id} to ${level}`);

  return db
    .insert(userSkill)
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
      },
    });
}
