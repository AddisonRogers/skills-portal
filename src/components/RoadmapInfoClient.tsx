"use client";

import React from "react";
import { SkillNode } from "@/types/Roadmap";

export default function RoadmapInfoClient({
	pathway,
	roadmapInfo,
	skillNodes,
}: {
	pathway: string;
	roadmapInfo: any;
	skillNodes: Map<string, SkillNode>;
}) {
	console.debug("roadmapInfo: ", roadmapInfo);
	console.debug("pathway: ", pathway);

	console.debug("skillNodes: ", skillNodes);

	return (
		<>
			<div>{pathway} Page</div>
			<div>
				<h2>Roadmap Info</h2>
				<pre>{JSON.stringify(roadmapInfo, null, 2)}</pre>
			</div>
			<div>
				<h2>Your Skills</h2>
				{skillNodes.size === 0 ? (
					<div>No skills found</div>
				) : (
					<ul>
						{Array.from(skillNodes.entries()).map(([key, skill]) => (
							<li key={key} style={{ marginBottom: "1rem" }}>
								<strong>{skill.name ?? key}</strong>
								<ul style={{ marginTop: "0.4rem", paddingLeft: "1.2rem" }}>
									{Object.entries(skill).map(
										([prop, value]) =>
											prop !== "name" && (
												<li key={prop}>
													<span style={{ fontWeight: 500 }}>{prop}:</span>{" "}
													<span>
														{typeof value === "object"
															? JSON.stringify(value)
															: String(value)}
													</span>
												</li>
											),
									)}
								</ul>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
}
