import { checkPathwayValid, getRoadmap } from "@/db/repositories/roadmap";
import RoadmapInfoClient from "@/components/RoadmapInfoClient";
import {
	convertToSkillNodes,
	getSkillNodes,
} from "@/app/learn/[pathway]/serverFunctions";
import { getLinks } from "@/lib/tableClient";

// I am essentially using this as the loading page.
export default async function PathwayPage({
	params,
}: {
	params: Promise<{ pathway: string }>;
}) {
	const pathway = (await params).pathway;

	// Fetch all needed data at once
	const [roadmapInfoRaw, valid, skillNodes, links] = await Promise.all([
		getRoadmap(pathway),
		checkPathwayValid(pathway),
		getSkillNodes(pathway),
		getLinks(pathway),
	]);

	// Pick single roadmap, or adjust if multiple expected
	const roadmapInfo = Array.isArray(roadmapInfoRaw)
		? roadmapInfoRaw[0]
		: roadmapInfoRaw;

	if (
		!valid ||
		skillNodes === null ||
		skillNodes === undefined ||
		skillNodes.size === 0
	) {
		// Optionally render 404 or redirect
		return <div>Not found</div>;
	}

	const flowSkillNodes = await convertToSkillNodes(skillNodes);

	return (
		<div>
			<div>
				{/*	learn > frontend button*/}
				<div></div>
				<div></div>
			</div>

			<div>{/*	intro */}</div>
			<div>{/*	related people */}</div>
			<RoadmapInfoClient
				pathway={pathway}
				roadmapInfo={roadmapInfo}
				flowSkillNodes={flowSkillNodes}
				initialLinks={links}
			/>
		</div>
	);
}
