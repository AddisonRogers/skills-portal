"use client";

import React from "react";
import SkillsFlow from "@/components/skills-flow";
import { type Node, type Edge, ReactFlowProvider } from "@xyflow/react";
import { useFlowStore } from "@/app/learn/[pathway]/zustandStore";
import { EditButtons } from "@/app/learn/[pathway]/EditButtons";

interface RoadmapInfoClientProps {
	pathway: string;
	initialNodes: Node[];
	initialEdges: Edge[];
}

export default function RoadmapInfoClient({
	pathway,
	initialNodes,
	initialEdges,
}: RoadmapInfoClientProps) {
	const { initializeFlow } = useFlowStore();

	// Only initialize if the store is empty
	const { nodes } = useFlowStore();
	if (nodes.length === 0 && initialNodes.length > 0) {
		initializeFlow(initialNodes, initialEdges);
	}

	return (
		<div>
			<ReactFlowProvider>
				<EditButtons pathway={pathway} />
				<SkillsFlow />
			</ReactFlowProvider>
		</div>
	);
}
