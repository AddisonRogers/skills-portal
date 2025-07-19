# Skills Portal Data

This directory contains local JSON data files used in development mode. In production, this data is stored in Azure Cosmos DB Table API.

## Data Structure

The data is organized into the following files:

- `roadmaps.json`: Contains roadmap definitions (without user-specific properties)
- `skills.json`: Contains skill definitions
- `positions.json`: Contains position information for skills in roadmaps
- `links.json`: Contains link information between skills in roadmaps

## User-Specific Properties

Note that `roadmaps.json` does **not** contain the user-specific properties `suggestedBy` and `isFavorite`. These properties are stored in the drizzle-based database and are associated with specific users.

In development mode, these properties are mocked in the `serverFunctions.ts` file using the `mockUserRoadmapPreferences` array.

## Development vs Production

The application can run in two modes:

1. **Development Mode**: Uses local JSON files from this directory
2. **Production Mode**: Uses Azure Cosmos DB Table API

The mode is determined by the `IS_DEVELOPMENT` environment variable in the `.env` file. If `IS_DEVELOPMENT=true`, the application will use local data files. Otherwise, it will attempt to connect to Azure Cosmos DB.

## How Data Loading Works

1. The `tableClient.ts` file provides functions for connecting to Azure Cosmos DB and querying data
2. The `localData.ts` file provides functions for loading data from local JSON files
3. The `serverFunctions.ts` file uses either Azure Cosmos DB or local data based on the `IS_DEVELOPMENT` flag
4. User-specific properties (`suggestedBy`, `isFavorite`) are added to roadmaps from the drizzle database (or mock data in development mode)

## Adding or Modifying Data

To add or modify data in development mode, simply edit the JSON files in this directory. The changes will be reflected immediately when the application is restarted.

In production, data should be added or modified through the appropriate Azure Cosmos DB management tools or APIs.