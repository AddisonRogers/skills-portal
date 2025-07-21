"use server";

import { and, eq } from "drizzle-orm";
import {
	roadmap,
	role,
	skill,
	skillRoadmap,
	suggestedRoadmap,
	user,
	user_roles,
} from "@/db/schema";
import { db } from "@/lib/db";
import { getSkillsForRoadmap } from "@/db/repositories/skills";
import { AZRoadmapData, PGRoadmapData, Roadmap } from "@/types/Roadmap";

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
