```mermaid
graph TD
RoadmapRepo --> FunctionAPP
FunctionAPP --> CosmosDB
FunctionAPP --> AzSQL
User --> Website
Website <--> AzSQL
Website <--> CosmosDB
Website <--> OpenAI
Website <--> FunctionAPP
```

