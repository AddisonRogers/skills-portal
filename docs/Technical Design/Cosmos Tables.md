
Roadmaps
this is essentially just a map for each roadmap to store relevant things
```json
roadmaps: [

 {
	 name: frontend
	meta: {
		RelatedRoadmaps : []
	}
	skills: [
		{
			skillId: number,
			type: 
			position: {x: 12, y: 2}
		}
	]
}
]
```

Roadmaps

| partitionKey | rowkey      | relatedRoadmap               |
| ------------ | ----------- | ---------------------------- |
| "roadmap"    | roadmapName | ["list of related roadmaps"] |

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

| partitionKey | id        | blob |     |
| ------------ | --------- | ---- | --- |
| skillName    | skillName |      |     |
