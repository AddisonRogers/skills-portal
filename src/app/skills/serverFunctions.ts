"use server";

import { getRoadmapSkills } from "@/db/repositories/skills";
import { getUserByEmail } from "@/db/repositories/users";

export async function getAllSkills(userEmail: string | null) {
	const user = await getUserByEmail(userEmail);
	const rawRoadmapSkills = await getRoadmapSkills(user.id);

	return Map.groupBy(rawRoadmapSkills, (skill) => skill.roadmapId);
}
