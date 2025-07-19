"use server";

import { and, eq } from "drizzle-orm";
import {
	roadmap,
	role,
	skill,
	suggestedRoadmap,
	user,
	user_roles,
} from "@/db/schema";
import { db } from "@/lib/db";

// export async function getSkillsOnRoadmap(roadmapId: string) {
//   return db
//     .select()
//     .from(skill)
//     .innerJoin(roadmap, eq(skill.roadmapId, roadmap.id))
//     .where(eq(roadmap.id, roadmapId))
// }

export async function getSuggestedRoadmaps(userEmail: string) {
	return db
		.select({
			id: suggestedRoadmap.roadmapId,
		})
		.from(suggestedRoadmap)
		.innerJoin(user, eq(suggestedRoadmap.toUserId, user.id))
		.where(eq(user.email, userEmail));
}

export async function getRoadmaps() {
	return db.select().from(roadmap);
}
