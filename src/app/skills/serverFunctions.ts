"use server";

import { getRoadmapSkills } from "@/db/repositories/skills";

export async function getAllSkills(userId: string | null) {
	const rawRoadmapSkills = await getRoadmapSkills(userId);

	return Map.groupBy(rawRoadmapSkills, (skill) => skill.roadmapId);
}
