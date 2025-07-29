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
	Connection,
	useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodeBase } from "@xyflow/system";
import { SkillNode } from "./nodes/SkillNode";
import dagre from "@dagrejs/dagre";
import { useSelectedNodeStore } from "@/app/learn/[pathway]/zustandStore";

type SkillsFlowProps = {
	nodes;
	setNodes;
	edges;
	setEdges;
	onNodesChange;
	onEdgesChange;
};

export default function SkillsFlow(props: SkillsFlowProps) {
	const { nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange } =
		props;
	const { setSelectedNode } = useSelectedNodeStore();

	const nodeTypes = {
		skill: SkillNode,
	};

	const onConnect = useCallback(
		(params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[],
	);

	return (
		<div style={{ height: "100vh", width: "100vw" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView={true}
				nodeTypes={nodeTypes}
			></ReactFlow>
		</div>
	);
}
