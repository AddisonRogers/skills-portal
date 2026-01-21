"use client";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	CardAction,
} from "@/components/ui/card";
import { UserSkill } from "@/types/skill";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SortOptions from "./skillFilters/SortOptions";
import ShowFilters, { ShowFilterOption } from "./skillFilters/ShowFilters";
import { useState } from "react";

const skills: UserSkill[] = [
	{
		id: 0,
		skillName: "React",
		proficiency: { id: 0, value: 2, label: "Novice" },
		lastUsed: new Date("2025-10-01"),
		tags: [{ id: 0, label: "Frontend" }],
	},
	{
		id: 1,
		skillName: "C#",
		proficiency: { id: 0, value: 4, label: "Advanced" },
		lastUsed: new Date("2025-09-15"),
		tags: [{ id: 0, label: "Backend" }],
	},
	{
		id: 2,
		skillName: "Bicep",
		proficiency: { id: 0, value: 3, label: "Intermediate" },
		lastUsed: new Date("2026-08-01"),
		tags: [{ id: 0, label: "DevOps" }],
	},
	{
		id: 3,
		skillName: "Presenting",
		proficiency: { id: 0, value: 5, label: "Expert" },
		lastUsed: new Date(),
		tags: [{ id: 0, label: "Soft Skill" }],
	},
	{
		id: 4,
		skillName: "Azure",
		proficiency: { id: 0, value: 1, label: "Beginner" },
		lastUsed: new Date("2024-09-15"),
		tags: [{ id: 0, label: "Backend" }],
	},
];

const proficiencyColors: Record<string, string> = {
	Beginner: "bg-[#C6EBFF] text-[#5A6BE2]",
	Novice: "bg-[#ABC8FF] text-[#4F5FEA]",
	Intermediate: "bg-[#A39BFF] text-[#6235B6]",
	Advanced: "bg-[#D1B0FF] text-[#6D28D9]",
	Expert: "bg-[#E698FF] text-[#A21CAF]",
};

export default function ProfileSkillsCard() {
	const [showFilter, setShowFilter] = useState<ShowFilterOption>("All");
	const [sortBy, setSortBy] = useState("Proficiency");
	const SortOptionsAny = SortOptions as any;

	// Apply filter first, then sort the filtered list so both work together.
	let filteredSkills: UserSkill[] = [...skills];

	if (showFilter === "Frontend") {
		filteredSkills = filteredSkills.filter((skill) =>
			skill.tags.some((tag) => tag.label === "Frontend"),
		);
	} else if (showFilter === "Backend") {
		filteredSkills = filteredSkills.filter((skill) =>
			skill.tags.some((tag) => tag.label === "Backend"),
		);
	} else if (showFilter === "DevOps") {
		filteredSkills = filteredSkills.filter((skill) =>
			skill.tags.some((tag) => tag.label === "DevOps"),
		);
	} else if (showFilter === "Soft Skill") {
		filteredSkills = filteredSkills.filter((skill) =>
			skill.tags.some((tag) => tag.label === "Soft Skill"),
		);
	}

	const sortedSkills: UserSkill[] = [...filteredSkills];

	if (sortBy === "Proficiency") {
		sortedSkills.sort((a, b) => b.proficiency.value - a.proficiency.value);
	} else if (sortBy === "Alphabetical") {
		sortedSkills.sort((a, b) => a.skillName.localeCompare(b.skillName));
	} else if (sortBy === "Recent") {
		sortedSkills.sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime());
	}

	return (
		<div>
			<div className="flex flex-row justify-start">
				<ShowFilters showFilter={showFilter} setShowFilter={setShowFilter} />
				<SortOptionsAny sortBy={sortBy} setSortBy={setSortBy} />
				<Button className="gap-1 px-2 rounded-2xl mt-3 mb-1 ml-auto mr-3 font-bold">
					Manage Skills
				</Button>
			</div>
			{sortedSkills.map((skill) => (
				<Card key={skill.id} className="mx-2 my-2 p-4">
					<CardHeader className="gap-0">
						<div className="flex items-center">
							<div>
								<CardTitle className="flex items-center mb-0">
									<a className="mr-3">{skill.skillName}</a>
									{skill.tags.map((tag) => (
										<a
											key={tag.id}
											className="border-2 rounded-2xl px-1.5 bg-gray-200 font-semibold text-gray-700"
										>
											{tag.label}
										</a>
									))}
								</CardTitle>
								<CardDescription className="mt-1">
									{skill.lastUsed.toDateString()}
								</CardDescription>
							</div>
							<div className="flex ml-auto items-center gap-4">
								<CardDescription
									className={cn(
										"rounded-2xl px-2 py-0.5 font-semibold whitespace-nowrap",
										proficiencyColors[skill.proficiency.label],
									)}
								>
									{skill.proficiency.label}
								</CardDescription>
								<CardDescription className="flex flex-col items-center leading-none">
									<a className="mb-1">Proficiency</a>
									<a className="font-bold text-foreground text-lg">
										{skill.proficiency.value}
									</a>
								</CardDescription>
							</div>
						</div>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}
