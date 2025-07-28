"use client";

import React from "react";
import { SkillNode } from "@/types/Roadmap";
import SkillsFlow from "@/components/skills-flow";
import {NodeBase} from "@xyflow/system";

export default function RoadmapInfoClient({
	pathway,
	roadmapInfo,
	skillNodes,
	flowSkillNodes,
}: {
	pathway: string;
	roadmapInfo: any;
	skillNodes: Map<string, SkillNode>;
	flowSkillNodes: NodeBase[];
}) {

	return (
		<>
			<div>{pathway} Page</div>
			<div>
				<h2>Roadmap Info</h2>
				<pre>{JSON.stringify(roadmapInfo, null, 2)}</pre>
			</div>
			<SkillsFlow initialNodes={flowSkillNodes} />
		</>
	);
}
