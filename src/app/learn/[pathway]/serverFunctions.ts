"use server";

import {
	checkPathwayValid,
	getSkillsOnRoadmap,
} from "@/db/repositories/roadmap";
import { getSkillsForRoadmapForUser } from "@/db/repositories/skills";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SkillNode } from "@/types/Roadmap";
import type { NodeBase } from "@xyflow/system";
import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";

type getSkillNodesReturnType = Promise<Map<string, SkillNode> | null>;

export async function getSkillNodes(pathway: string): getSkillNodesReturnType {
	const user = auth.api.getSession({
		headers: await headers(),
	});

	const userEmail = (await user)?.user.email;
	const valid = checkPathwayValid(pathway);
	if (!valid) {
		console.error("Invalid pathway:", pathway);
		return null;
	}

	if (userEmail === undefined) {
		console.error("User not logged in");
		const data = await getSkillsOnRoadmap(pathway);
		return data;
	}

	const data = await getSkillsForRoadmapForUser(pathway, userEmail);
	return data;
}

export async function convertToSkillNodes(
	data: Map<string, SkillNode>,
): Promise<NodeBase[]> {
	return Array.from(data.entries()).map(([id, skillNode]) => ({
		id,
		type: skillNode.nodeType, // You may want to map this further based on your needs
		position: { x: skillNode.x, y: skillNode.y },
		data: {
			label: skillNode.name,
			blobUrl: skillNode.blobUrl,
			description: skillNode.description,
			name: skillNode.name,
		},
	}));
}

export async function uploadChanges(pathway: string, edges: any[]) {
	try {
		// Get environment variables for Azure Table Storage
		const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
		const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
		const tableName = process.env.AZURE_TABLE_NAME || "edges";

		if (!accountName || !accountKey) {
			throw new Error("Azure Storage credentials not configured");
		}

		// Create table client
		const credential = new AzureNamedKeyCredential(accountName, accountKey);
		const tableClient = new TableClient(
			`https://${accountName}.table.core.windows.net`,
			tableName,
			credential,
		);

		// Ensure table exists
		await tableClient.createTable();

		// Prepare entities for batch operation
		const entities = edges.map((edge, index) => ({
			partitionKey: pathway,
			rowKey: pathway,
			sourceNodeId: edge.source,
			targetNodeId: edge.target,
			edgeType: edge.type || "default",
		}));

		// First, delete existing edges for this pathway and user
		const existingEntities = tableClient.listEntities({
			queryOptions: {
				filter: `PartitionKey eq '${pathway}'`,
			},
		});

		for await (const entity of existingEntities) {
			await tableClient.deleteEntity(entity.partitionKey, entity.rowKey);
		}

		// Upload new edges
		for (const entity of entities) {
			await tableClient.createEntity(entity);
		}

		console.log(
			`Successfully uploaded ${entities.length} edges for pathway: ${pathway}`,
		);
		return { success: true, count: entities.length };
	} catch (error) {
		console.error("Error uploading changes:", error);
		throw new Error(`Failed to upload changes: ${error.message}`);
	}
}
