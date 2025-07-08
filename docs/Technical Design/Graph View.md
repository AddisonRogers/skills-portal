```mermaid
graph TD
RoadmapRepo --> FunctionAPP
FunctionAPP --> UpdateQueue
UpdateQueue --> FunctionAPP
FunctionAPP --> RoadmapSkillsTable

Website <--> AzSQL
RoadmapSkillsTable --> Website
Website --> OurUpdateQueue
OurUpdateQueue --> OurSkillsTable
Website <--> OpenAI

```


