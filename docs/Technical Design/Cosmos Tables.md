
Roadmap blob

Roadmaps

| partitionKey | rowkey      | relatedRoadmap               |
| ------------ | ----------- | ---------------------------- |
| "roadmap"    | roadmapName | ["list of related roadmaps"] |
\
Positions

| partitionKey | rowkey  | x   | y   | type |
| ------------ | ------- | --- | --- | ---- |
| roadmapName  | skillId |     |     |      |


Links

| partitionKey | id  | style | source | target |
| ------------ | --- | ----- | ------ | ------ |
| roadmapName  |     |       |        |        |
|              |     |       |        |        |

Skills
This is a unique table of all the possible nodes and links to a blob

| partitionKey | id        | blobUrl |     |
| ------------ | --------- | ---- | --- |
| skillName    | skillName |      |     |
