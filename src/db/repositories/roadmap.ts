"use server";

import { eq } from "drizzle-orm";
import { roadmap, suggestedRoadmap, user } from "@/db/schema";
import { db } from "@/lib/db";
import { getSkillsForRoadmap } from "@/db/repositories/skills";
import { PGRoadmapData } from "@/types/Roadmap";

export async function getSkillsOnRoadmap(roadmapId: string) {
	return getSkillsForRoadmap(roadmapId);
}

export async function getSuggestedRoadmaps(userEmail: string) {
	return db
		.select({
			id: suggestedRoadmap.roadmapId,
		})
		.from(suggestedRoadmap)
		.innerJoin(user, eq(suggestedRoadmap.toUserId, user.id))
		.where(eq(user.email, userEmail));
}

export async function getAllRoadmaps(): Promise<PGRoadmapData[]> {
	return db.select().from(roadmap);
}

export async function getRoadmap(
	roadmapId: string,
): Promise<PGRoadmapData | null> {
	const results = await db
		.select()
		.from(roadmap)
		.where(eq(roadmap.id, roadmapId))
		.limit(1);
	return results[0] ?? null;
}

export async function checkPathwayValid(roadmapId: string): Promise<boolean> {
	try {
		const items = await db
			.select()
			.from(roadmap)
			.where(eq(roadmap.id, roadmapId));
		return items.length > 0;
	} catch (error) {
		return false;
	}
}
