"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import React from "react";
import {
	useEditModeStore,
	useFlowStore,
} from "@/app/learn/[pathway]/zustandStore";
import { Edit, Save } from "lucide-react";
import { useEdges, useNodes } from "@xyflow/react";
import { uploadChanges } from "@/app/learn/[pathway]/serverFunctions";

export type EditButtonsParams = {
	pathway: string;
};

export function EditButtons(params: EditButtonsParams) {
	const { pathway } = params;

	const {
		editMode,
		setEditMode,
		getChangedNodes,
		getChangedEdges,
		commitChanges,
		resetChanges,
	} = useFlowStore();
	// Prepare changes for submission
	const prepareChangesForSubmission = () => {
		const changedNodes = getChangedNodes();
		const changedEdges = getChangedEdges();

		const formattedNodes = changedNodes.map((node) => ({
			id: node.id,
			name: node.data.name,
			description: node.data.description,
			blobUrl: node.data.blobUrl || "",
			position: {
				x: node.position.x,
				y: node.position.y,
			},
		}));

		const formattedEdges = changedEdges.map((edge) => ({
			id: edge.id,
			source: edge.source,
			target: edge.target,
			type: edge.type || "default",
		}));

		return {
			pathway,
			nodes: formattedNodes,
			edges: formattedEdges,
		};
	};

	// Handle submitting changes
	const handleSubmitChanges = async () => {
		const changes = prepareChangesForSubmission();

		console.log("Changes prepared for submission:", changes);

		await uploadChanges(pathway, changes.edges);

		// For now, just simulate success
		commitChanges();
		setEditMode(false);
	};

	// Toggle edit mode
	const toggleEditMode = () => {
		if (editMode) {
			// Exiting edit mode - this will automatically reset to original state
			setEditMode(false);
		} else {
			// Entering edit mode
			setEditMode(true);
		}
	};

	return (
		<>
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
							<TooltipContent>Submit Changes</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>
			{editMode && (
				<div className="bg-yellow-100 p-3 rounded-md text-sm">
					<p className="font-medium">Edit Mode Active</p>
					<p>
						Right-click to add a new node. Click and drag between nodes to
						create connections.
					</p>
				</div>
			)}
		</>
	);
}
