// REMOVE "use client"!

import { checkPathwayValid, getRoadmap } from "@/db/repositories/roadmap";
import { getSkillsForRoadmapForUser } from "@/db/repositories/skills";
import { getUserByEmail } from "@/db/repositories/users"; // adjust as needed
import { useUserInfo } from "@/hooks/useUserInfo";
import RoadmapInfoClient from "@/components/RoadmapInfoClient";
import { auth } from "@/lib/auth";

export default async function PathwayPage({
	params,
}: {
	params: { pathway: string };
}) {
	const pathway = await params.pathway;

	// Fetch all needed data at once
	const [roadmapInfoRaw, valid] = await Promise.all([
		getRoadmap(pathway), // This is an array! (from your function)
		checkPathwayValid(pathway),
	]);

	// Pick single roadmap, or adjust if multiple expected
	const roadmapInfo = Array.isArray(roadmapInfoRaw)
		? roadmapInfoRaw[0]
		: roadmapInfoRaw;

	if (!valid) {
		// Optionally render 404 or redirect
		console.debug(roadmapInfoRaw);
		return <div>Not found</div>;
	}

	return <RoadmapInfoClient pathway={pathway} roadmapInfo={roadmapInfo} />;
}
