"use client";

import React, { use } from "react";
import { getSkillsForRoadmapForUser } from "@/db/repositories/skills";
import { useUserInfo } from "@/hooks/useUserInfo";

export default function RoadmapInfoClient({
	pathway,
	roadmapInfo,
}: {
	pathway: string;
	roadmapInfo: any;
}) {
	console.debug("roadmapInfo: ", roadmapInfo);
	console.debug("pathway: ", pathway);

	const { userEmail } = useUserInfo();

	const skillNodes = use(getSkillsForRoadmapForUser(pathway, userEmail!));

	return (
		<>
			<div>{pathway} Page</div>
			<div>
				<h2>Roadmap Info</h2>
				<pre>{JSON.stringify(roadmapInfo, null, 2)}</pre>
			</div>
			<div>
				<h2>Your Skills</h2>
				<pre>{JSON.stringify(skillNodes, null, 2)}</pre>
			</div>
		</>
	);
}
