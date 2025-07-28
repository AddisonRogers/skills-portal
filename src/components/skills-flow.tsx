"use client";

import { useCallback, useState } from "react";
import {
	Background,
	ReactFlow,
	addEdge,
	ConnectionLineType,
	Panel,
	useNodesState,
	useEdgesState,
	Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodeBase } from "@xyflow/system";
import { SkillNode } from "./nodes/SkillNode";
import dagre from "@dagrejs/dagre";

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

export default function SkillsFlow({
	initialNodes,
	initialEdges,
}: {
	initialNodes: NodeBase[];
	initialEdges?: Edge[];
}) {
	const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
		initialNodes,
		initialEdges,
	);

	const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

	const nodeColor = (node) => {
		switch (node.type) {
			case "input":
				return "#6ede87";
			case "output":
				return "#6865A5";
			default:
				return "#ff0072";
		}
	};

	const nodeTypes = {
		skill: SkillNode,
	};

	return (
		<div style={{ height: "100vh", width: "100vw" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				fitView={true}
				nodeTypes={nodeTypes}
			></ReactFlow>
		</div>
	);
}
