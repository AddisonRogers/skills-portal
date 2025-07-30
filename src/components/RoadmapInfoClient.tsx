"use client";

import React, { useEffect, useState } from "react";
import { SkillNode } from "@/types/Roadmap";
import SkillsFlow from "@/components/skills-flow";
import { NodeBase } from "@xyflow/system";
import { ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import { useSelectedNodeStore } from "@/app/learn/[pathway]/zustandStore";
import { Eye, EyeClosed } from "lucide-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

// TODO use d3-force
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

interface RoadmapInfoClientProps {
	pathway: string;
	roadmapInfo: any;
	skillNodes: Map<string, SkillNode>;
	flowSkillNodes: NodeBase[];
}

export default function RoadmapInfoClient({
	pathway,
	roadmapInfo,
	skillNodes,
	flowSkillNodes,
}: RoadmapInfoClientProps) {
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
		<div>
			<ReactFlowProvider>
				<div className={"px-10 mt-4 flex flex-col gap-4"}>
					<div className={"flex justify-between items-center"}>
						<Breadcrumb className={"font-medium text-2xl"}>
							<BreadcrumbList className={"text-2xl "}>
								<BreadcrumbItem>
									<BreadcrumbLink href="/learn">Learn</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink
										className={"text-primary"}
										href={`/learn/${pathway}`}
									>
										{pathway}
									</BreadcrumbLink>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						<Button>wassup</Button>
					</div>
					<div>
						<pre>{JSON.stringify(roadmapInfo, null, 2)}</pre>
					</div>
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
		</div>
	);
}
