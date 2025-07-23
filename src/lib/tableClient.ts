// src/infrastructure/cosmosTableClient.ts
import {TableClient} from "@azure/data-tables";
import type {AZTPositionData, LinkData, SkillNode} from "@/types/Roadmap";

// Replace with your own connection string retrieval
const COSMOS_CONNECTION_STRING = process.env.AZTABLE_CONNECTION_STRING!;
const LINKS_TABLE = process.env.AZTABLE_LINKS_TABLE!;
const POSITIONS_TABLE = process.env.AZTABLE_POSITIONS_TABLE!;

const positionsClient = TableClient.fromConnectionString(
	COSMOS_CONNECTION_STRING,
	POSITIONS_TABLE,
);

const linksClient = TableClient.fromConnectionString(
	COSMOS_CONNECTION_STRING,
	LINKS_TABLE,
);

export async function attachPositions(
	roadmapName: string,
	nodesMap: Map<string, SkillNode>,
): Promise<Map<string, SkillNode>> {
	const entities = positionsClient.listEntities<AZTPositionData>({
		queryOptions: { filter: `partitionKey eq '${roadmapName}'` },
	});

	for await (const entity of entities) {
		const skillId = entity.Rowkey; // handle both possible keys
		const node = nodesMap.get(skillId);
		if (node) {
			// Update x, y, and nodeType (from PositionData)
			node.x = entity.x;
			node.y = entity.y;
			node.nodeType = entity.nodeType;
		}
	}
	return nodesMap;
}

export async function getLinks(roadmapName: string): Promise<LinkData[]> {
	const entities = linksClient.listEntities<LinkData>({
		queryOptions: { filter: `partitionKey eq '${roadmapName}'` },
	});
	const results: LinkData[] = [];
	for await (const entity of entities) {
		results.push(entity);
	}
	return results;
}
