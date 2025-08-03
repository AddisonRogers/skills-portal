"use client";

import React, { useEffect, useState } from "react";
import { SkillNode } from "@/types/Roadmap";
import SkillsFlow from "@/components/skills-flow";
import { NodeBase } from "@xyflow/system";
import { ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import { useEditModeStore, useSelectedNodeStore } from "@/app/learn/[pathway]/zustandStore";
import { Eye, EyeClosed, Edit, Save } from "lucide-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
	flowSkillNodes: NodeBase[];
	initialLinks?: any[];
}

export default function RoadmapInfoClient({
	pathway,
	roadmapInfo,
	flowSkillNodes,
	initialLinks = [],
}: RoadmapInfoClientProps) {
	const { selectedNode } = useSelectedNodeStore();
	const { editMode, setEditMode, changesSubmitted, setChangesSubmitted } = useEditModeStore();

	// Convert initialLinks to the format expected by ReactFlow
	const convertedEdges = React.useMemo(() => {
		return initialLinks.map(link => ({
			id: `${link.source}-${link.target}`,
			source: link.source,
			target: link.target,
			type: link.type || 'default',
		}));
	}, [initialLinks]);

	const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
		flowSkillNodes,
		convertedEdges,
	);

	const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
	const [changedNodes, setChangedNodes] = useState([]);
	const [changedEdges, setChangedEdges] = useState([]);

	useEffect(() => {
		console.debug("selectedNode: ", selectedNode);
	}, [selectedNode]);

	// Prepare changes for submission
	const prepareChangesForSubmission = () => {
		// Convert nodes to the format expected by the API
		const formattedNodes = nodes.map(node => ({
			name: node.data.name,
			description: node.data.description,
			blobUrl: node.data.blobUrl || '',
			position: {
				x: node.position.x,
				y: node.position.y
			}
		}));

		// Convert edges to the format expected by the API
		const formattedEdges = edges.map(edge => ({
			source: edge.source,
			target: edge.target,
			type: edge.type || 'default'
		}));

		return {
			pathway,
			nodes: formattedNodes,
			edges: formattedEdges
		};
	};

	// Handle submitting changes
	const handleSubmitChanges = () => {
		// Store the current nodes and edges as the changes
		setChangedNodes(nodes);
		setChangedEdges(edges);
		setChangesSubmitted(true);
		setEditMode(false);
		
		// Prepare the changes for submission
		const changes = prepareChangesForSubmission();
		
		// Here you would typically call an API to save the changes
		console.log("Changes prepared for submission:", changes);
		
		// This is where you would fire off a function with the new changes
		// For now, we're just logging them
		
		// Example of how you might call an API:
		// saveRoadmapChanges(changes)
		//   .then(response => {
		//     console.log("Changes saved successfully:", response);
		//   })
		//   .catch(error => {
		//     console.error("Error saving changes:", error);
		//     // Handle error, possibly revert to edit mode
		//     setEditMode(true);
		//     setChangesSubmitted(false);
		//   });
	};

	// Toggle edit mode
	const toggleEditMode = () => {
		setEditMode(!editMode);
		if (editMode) {
			// If turning off edit mode without submitting, reset changes
			setChangesSubmitted(false);
		}
	};

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
						<div className="flex gap-2">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button 
											variant={editMode ? "default" : "outline"} 
											size="icon" 
											onClick={toggleEditMode}
										>
											<Edit className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										{editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							
							{editMode && (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button 
												variant="default" 
												size="icon"
												onClick={handleSubmitChanges}
											>
												<Save className="h-4 w-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											Submit Changes
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						</div>
					</div>
					{editMode && (
						<div className="bg-yellow-100 p-3 rounded-md text-sm">
							<p className="font-medium">Edit Mode Active</p>
							<p>Right-click to add a new node. Click and drag between nodes to create connections.</p>
						</div>
					)}
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
					editMode={editMode}
				/>
			</ReactFlowProvider>
		</div>
	);
}
