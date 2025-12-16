"use client";

import Link from "next/link";
import { SkillCard } from "@/app/skills/skillCard.tsx";
import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs";
import { useMemo } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkillRow from "@/app/skills/SkillRow.tsx";

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
	const [viewMode, setViewMode] = useQueryState(
		"viewMode",
		parseAsString.withDefault("grid"),
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
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-bold">Skills ({filteredSkills.length})</h2>
				<div className="flex gap-2">
					<Button
						variant={viewMode === "grid" ? "default" : "outline"}
						size="sm"
						onClick={() => setViewMode("grid")}
						aria-label="Grid view"
						title="Grid view"
					>
						<LayoutGrid className="w-4 h-4" />
					</Button>
					<Button
						variant={viewMode === "list" ? "default" : "outline"}
						size="sm"
						onClick={() => setViewMode("list")}
						aria-label="List view"
						title="List view"
					>
						<List className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{filteredSkills.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-lg text-muted-foreground">
						No skills found matching your criteria.
					</p>
				</div>
			) : viewMode === "grid" ? (
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
			) : (
				<div className="space-y-2">
					{filteredSkills.map((skill) => (
						<Link
							key={skill.id}
							href={`/skills/${skillNameToSlug(skill.name)}`}
							className="block"
						>
							<SkillRow skill={skill} />
						</Link>
					))}
				</div>
			)}
		</>
	);
}
