"use client";

import React from "react";
import { SkillNode } from "@/types/Roadmap";

export default function RoadmapInfoClient({
	pathway,
	roadmapInfo,
	skillNodes,
}: {
	pathway: string;
	roadmapInfo: any;
	skillNodes: Map<string, SkillNode>;
}) {
	console.debug("roadmapInfo: ", roadmapInfo);
	console.debug("pathway: ", pathway);

	console.debug("skillNodes: ", skillNodes);

	return (
		<>
			<div>{pathway} Page</div>
			<div>
				<h2>Roadmap Info</h2>
				<pre>{JSON.stringify(roadmapInfo, null, 2)}</pre>
			</div>
			<div>
				<h2>Your Skills</h2>
				{skillNodes.size === 0 && <div>No skills found</div>}
				<pre>{JSON.stringify(skillNodes, null, 2)}</pre>
			</div>
		</>
	);
}
