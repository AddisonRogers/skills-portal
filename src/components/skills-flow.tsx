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
	editMode?: boolean;
};

export default function SkillsFlow(props: SkillsFlowProps) {
	const { nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange, editMode = false } = props;
	const reactFlowInstance = useReactFlow();

	const nodeTypes = {
		skill: SkillNode,
	};

	const onConnect = useCallback(
		(params) => {
			if (editMode) {
				setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
			}
		},
		[editMode, setEdges],
	);

	// Generate a unique ID for new nodes
	const getId = () => {
		return `node_${nodes.length + 1}_${Date.now()}`;
	};

	// Generate a placeholder blob URL for new nodes
	const generatePlaceholderBlobUrl = () => {
		// In a real implementation, this would be replaced with actual blob URL generation
		// For now, we'll just create a placeholder that indicates it's a new node
		return `blob://placeholder-${Date.now()}`;
	};

	// Handle right-click to add a new node
	const onPaneContextMenu = useCallback(
		(event) => {
			event.preventDefault();
			
			if (!editMode) return;
			
			// Get the position where the right-click occurred
			const position = reactFlowInstance.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			
			// Create a new node with a placeholder blob URL
			const newNode = {
				id: getId(),
				type: 'skill',
				position,
				data: { 
					name: `New Skill ${nodes.length + 1}`,
					description: 'Click to edit this skill',
					blobUrl: generatePlaceholderBlobUrl(), // Generate a placeholder blob URL
				},
			};
			
			setNodes((nds) => nds.concat(newNode));
		},
		[editMode, nodes.length, reactFlowInstance, setNodes],
	);

	return (
		<div
			style={{ height: "99vh", width: "99vw" }}
			className={"flex justify-center px-4 "}
		>
			<ReactFlow
				key={nodes.length}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onPaneContextMenu={onPaneContextMenu}
				fitView={true}
				nodeTypes={nodeTypes}
				connectionLineType={ConnectionLineType.SmoothStep}
				deleteKeyCode={editMode ? 'Delete' : null}
				selectionKeyCode={editMode ? 'Shift' : null}
				multiSelectionKeyCode={editMode ? 'Control' : null}
				zoomOnScroll={!editMode}
				panOnScroll={!editMode}
				selectionOnDrag={editMode}
				panOnDrag={!editMode}
				elementsSelectable={editMode}
				nodesConnectable={editMode}
				nodesDraggable={editMode}
			>
				<Panel position="top-right" className="bg-white p-2 rounded shadow-md">
					{editMode ? (
						<div className="text-xs text-gray-700">
							<p>• Right-click to add a node</p>
							<p>• Drag between nodes to connect</p>
							<p>• Press Delete to remove selected</p>
						</div>
					) : null}
				</Panel>
			</ReactFlow>
		</div>
	);
}
