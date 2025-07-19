"use server";

import { and, eq } from "drizzle-orm";
import {roadmap, role, skill, skillRoadmap, user, user_roles, userSkill} from "@/db/schema";
import { db } from "@/lib/db";

export async function getSkills(){
  return db
    .select()
    .from(skill)
}

export async function getSkillsForUser(userEmail: string){
  return db
    .select({
      name: skill.name,
      acquiredAt: userSkill.acquiredAt,
      level: userSkill.level,
    })
    .from(skill)
    .innerJoin(userSkill, eq(skill.id, userSkill.skillId))
    .innerJoin(user, eq(userSkill.userId, user.id))
    .where(eq(user.email, userEmail))
}

// Only possible with the positions table
export async function getSkillsForRoadmap(roadmapId: string){
  return db
    .select({
      name: skill.name,
    })
    .from(skill)
    .innerJoin(skillRoadmap, eq(skill.id, skillRoadmap.skillId))
    .innerJoin(roadmap, eq(skillRoadmap.roadmapId, roadmap.id))
    .where(eq(roadmap.id, roadmapId))
}

export async function getSkillsForRoadmapForUser(roadmapId: string, userEmail: string){
  return db
    .select({
      name: skill.name,
      acquiredAt: userSkill.acquiredAt,
      level: userSkill.level,
    })
    .from(skill)
    .innerJoin(skillRoadmap, eq(skill.id, skillRoadmap.skillId))
    .innerJoin(userSkill, eq(skill.id, userSkill.skillId))
    .innerJoin(roadmap, eq(skillRoadmap.roadmapId, roadmap.id))
    .innerJoin(user, eq(userSkill.userId, user.id))
    .where(
      and(
        eq(roadmap.id, roadmapId),
        eq(user.email, userEmail)
      )
    )
}