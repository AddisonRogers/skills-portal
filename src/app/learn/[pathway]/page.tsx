import { checkPathwayValid, getRoadmap } from "@/db/repositories/roadmap";
import RoadmapInfoClient from "@/components/RoadmapInfoClient";
import { getSkillNodes } from "@/app/learn/[pathway]/serverFunctions";

// I am essentially using this as the loading page.
export default async function PathwayPage({
	params,
}: {
	params: Promise<{ pathway: string }>;
}) {
	const pathway = (await params).pathway;

	// Fetch all needed data at once
	const [roadmapInfoRaw, valid, skillNodes] = await Promise.all([
		getRoadmap(pathway),
		checkPathwayValid(pathway),
		getSkillNodes(pathway),
	]);

	// Pick single roadmap, or adjust if multiple expected
	const roadmapInfo = Array.isArray(roadmapInfoRaw)
		? roadmapInfoRaw[0]
		: roadmapInfoRaw;

	if (!valid || skillNodes === null) {
		// Optionally render 404 or redirect
		console.debug(roadmapInfoRaw);
		return <div>Not found</div>;
	}

	return (
		<RoadmapInfoClient
			pathway={pathway}
			roadmapInfo={roadmapInfo}
			skillNodes={skillNodes}
		/>
	);
}
