import { parseAsString, createLoader } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const searchTermParams = {
	skillName: parseAsString.withDefault(""),
	roadmapId: parseAsString.withDefault("all"),
};

export const searchTermLoader = createLoader(searchTermParams);
