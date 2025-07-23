"use server";

import {checkPathwayValid, getSkillsOnRoadmap,} from "@/db/repositories/roadmap";
import {getSkillsForRoadmapForUser} from "@/db/repositories/skills";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {attachPositions} from "@/lib/tableClient";
import {SkillNode} from "@/types/Roadmap";

type getSkillNodesReturnType = Promise<Map<string, SkillNode> | null>;

export async function getSkillNodes(pathway: string): getSkillNodesReturnType {
	const user = auth.api.getSession({
		headers: await headers(),
	});

	const userEmail = (await user)?.user.email;
	console.debug("userEmail: ", userEmail);
	const valid = checkPathwayValid(pathway);
	if (!valid) {
		return null;
	}

	if (userEmail === undefined) {
		console.debug("userEmail is undefined");

		const data = await getSkillsOnRoadmap(pathway);
		return attachPositions(pathway, data);
	}

	const data = await getSkillsForRoadmapForUser(pathway, userEmail);
	return attachPositions(pathway, data);
}
