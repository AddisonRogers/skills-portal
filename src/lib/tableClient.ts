// src/infrastructure/cosmosTableClient.ts
import {TableClient} from "@azure/data-tables";
import {AZTPositionData, EdgeData, LinkData, SkillNode} from "@/types/Roadmap";

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

export async function getLinks(roadmapName: string): Promise<EdgeData[]> {
  try {
    const entities = linksClient.listEntities<LinkData>({
      queryOptions: {filter: `partitionKey eq '${roadmapName}'`},
    });
    const results: EdgeData[] = [];
    for await (const entity of entities) {
      results.push({
        source: entity,
        target: entity,
      });
    }
    return results;
  } catch (error) {
    console.debug(error);
    return [];
  }
}
