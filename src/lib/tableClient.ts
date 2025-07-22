// src/infrastructure/cosmosTableClient.ts
import {TableClient} from "@azure/data-tables";

// Setup singleton TableClients
const POSITIONS_TABLE = "Positions";
const LINKS_TABLE = "Links";
// Replace with your own connection string retrieval
const COSMOS_CONNECTION_STRING = process.env.COSMOS_CONNECTION_STRING!;

const positionsClient = TableClient.fromConnectionString(
  COSMOS_CONNECTION_STRING,
  POSITIONS_TABLE
);

const linksClient = TableClient.fromConnectionString(
  COSMOS_CONNECTION_STRING,
  LINKS_TABLE
);

export type SkillNode = Node & {
  SkillLevel: number;
  AcquiredAt: Date;
}

export type Node = PositionData & {
  SkillName: string;
  SkillDescription: string;
  BlobUrl: string;
}

export type PositionData = {
  PartitionKey: string;
  Rowkey: string; // Skill ID
  Timestamp: string;
  nodeType: string;
  x: number;
  y: number;

};

export type Edge = LinkData & {

}

export type LinkData = {
  PartitionKey: string;
  RowKey: string;
  Timestamp: string;
  source: string;
  target: string;
  type: string;
};

export async function getPositions(
  roadmapName: string,
  mapSkillId: (skillId: string) => Promise<any>
): Promise<Position[]> {
  const entities: PositionData[] = positionsClient.listEntities<PositionData>({
    queryOptions: {filter: `partitionKey eq '${roadmapName}'`}
  });
  const results: Position[] = [];
  for await (const entity of entities) {
    const skillData = await mapSkillId(entity.rowkey);
    results.push({...entity, skillData});
  }
  return results;
}

export async function getLinks(
  roadmapName: string
): Promise<Link[]> {
  const entities = linksClient.listEntities<Link>({
    queryOptions: {filter: `partitionKey eq '${roadmapName}'`}
  });
  const results: Link[] = [];
  for await (const entity of entities) {
    results.push(entity);
  }
  return results;
}