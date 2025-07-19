import fs from "fs";
import path from "path";
import { TABLES } from "./tableClient";

// Path to the data directory
const DATA_DIR = path.join(process.cwd(), "data");

/**
 * Load data from a local JSON file
 * @param filename The name of the JSON file
 * @returns The parsed JSON data
 */
export const loadLocalData = <T>(filename: string): T[] => {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent) as T[];
  } catch (error) {
    console.error(`Error loading local data from ${filename}:`, error);
    return [];
  }
};

/**
 * Get all roadmaps from local data
 * @returns All roadmaps
 */
export const getLocalRoadmaps = <T>(): T[] => {
  return loadLocalData<T>("roadmaps.json");
};

/**
 * Get all skills from local data
 * @returns All skills
 */
export const getLocalSkills = <T>(): T[] => {
  return loadLocalData<T>("skills.json");
};

/**
 * Get all positions from local data
 * @returns All positions
 */
export const getLocalPositions = <T>(): T[] => {
  return loadLocalData<T>("positions.json");
};

/**
 * Get all links from local data
 * @returns All links
 */
export const getLocalLinks = <T>(): T[] => {
  return loadLocalData<T>("links.json");
};

/**
 * Get local data based on table name
 * @param tableName The name of the table
 * @returns The data from the corresponding local file
 */
export const getLocalDataByTable = <T>(tableName: string): T[] => {
  switch (tableName) {
    case TABLES.ROADMAPS:
      return getLocalRoadmaps<T>();
    case TABLES.SKILLS:
      return getLocalSkills<T>();
    case TABLES.POSITIONS:
      return getLocalPositions<T>();
    case TABLES.LINKS:
      return getLocalLinks<T>();
    default:
      throw new Error(`Unknown table name: ${tableName}`);
  }
};