"use server";

import {
	checkPathwayValid,
	getSkillsOnRoadmap,
} from "@/db/repositories/roadmap";
import { getSkillsForRoadmapForUser } from "@/db/repositories/skills";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { attachPositions } from "@/lib/tableClient";
import { SkillNode } from "@/types/Roadmap";
import type { NodeBase } from "@xyflow/system";

type getSkillNodesReturnType = Promise<Map<string, SkillNode> | null>;

export async function getSkillNodes(pathway: string): getSkillNodesReturnType {
	const user = auth.api.getSession({
		headers: await headers(),
	});

	const userEmail = (await user)?.user.email;
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

export async function convertToSkillNodes(
	data: Map<string, SkillNode>,
): Promise<NodeBase[]> {
	return Array.from(data.entries()).map(([id, skillNode]) => ({
		id,
		type: skillNode.nodeType, // You may want to map this further based on your needs
		position: { x: skillNode.x, y: skillNode.y },
		data: {
			label: skillNode.name,
			blobUrl: skillNode.blobUrl,
			description: skillNode.description,
			name: skillNode.name,
		},
	}));
}
