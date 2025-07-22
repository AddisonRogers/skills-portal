"use server";

import {
	checkPathwayValid,
	getSkillsOnRoadmap,
} from "@/db/repositories/roadmap";
import { getSkillsForRoadmapForUser } from "@/db/repositories/skills";

export async function getSkillNodes(pathway: string) {
	const valid = checkPathwayValid(pathway);
	if (!valid) {
		return [];
	}
	console.debug("pathway: ", pathway);
	return getSkillsForRoadmapForUser(pathway, userEmail);
}
