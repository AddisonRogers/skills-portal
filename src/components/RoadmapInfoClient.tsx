"use client";

import React, { useEffect, useState } from "react";
import { SkillNode } from "@/types/Roadmap";
import SkillsFlow from "@/components/skills-flow";
import { NodeBase } from "@xyflow/system";
import { ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import { useSelectedNodeStore } from "@/app/learn/[pathway]/zustandStore";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
	const isHorizontal = direction === "LR";
	dagreGraph.setGraph({ rankdir: direction });

	nodes.forEach((node) => {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
	});

	if (edges !== undefined && edges.length > 0)
		edges.forEach((edge) => {
			dagreGraph.setEdge(edge.source, edge.target);
		});

	dagre.layout(dagreGraph);

	const newNodes = nodes.map((node) => {
		const nodeWithPosition = dagreGraph.node(node.id);
		const newNode = {
			...node,
			targetPosition: isHorizontal ? "left" : "top",
			sourcePosition: isHorizontal ? "right" : "bottom",
			// We are shifting the dagre node position (anchor=center center) to the top left
			// so it matches the React Flow node anchor point (top left).
			position: {
				x: nodeWithPosition.x - nodeWidth / 2,
				y: nodeWithPosition.y - nodeHeight / 2,
			},
		};

		return newNode;
	});

	return { nodes: newNodes, edges };
};

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
	const { selectedNode } = useSelectedNodeStore();

	const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
		flowSkillNodes,
		[],
	);

	const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState([layoutedEdges]);

	useEffect(() => {
		console.debug("selectedNode: ", selectedNode);
	}, [selectedNode]);

	return (
		<ReactFlowProvider>
			<div>{pathway} Page</div>
			<div>
				<h2>Roadmap Info</h2>
				<pre>{JSON.stringify(roadmapInfo, null, 2)}</pre>
			</div>
			<SkillsFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				setNodes={setNodes}
				setEdges={setEdges}
			/>
		</ReactFlowProvider>
	);
}
