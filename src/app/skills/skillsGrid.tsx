"use client";

import Link from "next/link";
import { SkillCard } from "@/app/skills/skillCard.tsx";
import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs";
import { useMemo } from "react";

interface SkillsGridProps {
	allSkills: unknown[];
	roadmapsWithSkills: Map<string, unknown[]>;
	isLoggedIn: boolean;
}

function skillNameToSlug(name: string) {
	return name.toLowerCase().replace(/\s+/g, "-");
}

export function SkillsGrid({
	allSkills,
	roadmapsWithSkills,
	isLoggedIn,
}: SkillsGridProps) {
	const [skillName] = useQueryState("skillName", parseAsString.withDefault(""));
	const [roadmapId] = useQueryState(
		"roadmapId",
		parseAsString.withDefault("all"),
	);

	const filteredSkills = useMemo(() => {
		let skills = allSkills;

		// Filter by roadmap
		if (roadmapId && roadmapId !== "all") {
			skills = roadmapsWithSkills.get(roadmapId) || [];
		}

		// Filter by search query
		if (skillName.trim()) {
			skills = skills.filter((skill) =>
				skill.name.toLowerCase().includes(skillName.toLowerCase()),
			);
		}

		return skills;
	}, [skillName, roadmapId, allSkills, roadmapsWithSkills]);

	return (
		<>
			<h2 className="text-2xl font-bold mb-4">
				Skills ({filteredSkills.length})
			</h2>

			{filteredSkills.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-lg text-muted-foreground">
						No skills found matching your criteria.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredSkills.map((skill) => (
						<Link
							key={skill.id}
							href={`/skills/${skillNameToSlug(skill.name)}`}
							className="block"
						>
							<SkillCard skill={skill} loggedIn={isLoggedIn} />
						</Link>
					))}
				</div>
			)}
		</>
	);
}
