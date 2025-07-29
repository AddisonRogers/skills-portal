"use server";

import { and, eq } from "drizzle-orm";
import { roadmap, skill, skillRoadmap, user, userSkill } from "@/db/schema";
import { db } from "@/lib/db";
import { PGSkillData, PGSkillDataUser, SkillNode } from "@/types/Roadmap";

export async function getSkills() {
	return db.select().from(skill);
}

export async function getSkillsForUser(userEmail: string) {
	return db
		.select({
			name: skill.name,
			acquiredAt: userSkill.acquiredAt,
			level: userSkill.level,
		})
		.from(skill)
		.innerJoin(userSkill, eq(skill.id, userSkill.skillId))
		.innerJoin(user, eq(userSkill.userId, user.id))
		.where(eq(user.email, userEmail));
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

export async function getSkill(skillMachineName: string) {
	try {
		return db
			.select({
				name: skill.name,
				description: skill.description,
				blobUrl: skill.blobUrl,
				madeBy: skill.madeBy,
			})
			.from(skill)
			.where(eq(skill.machineName, skillMachineName));
	} catch (error) {
		return null
	}
}