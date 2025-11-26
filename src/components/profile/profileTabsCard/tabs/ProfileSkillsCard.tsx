"use client";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	CardAction,
} from "@/components/ui/card";
import { UserSkill } from "@/types/skill";

const skills: UserSkill[] = [
	{
		id: 0,
		skillName: "React",
		proficiency: 4,
		lastUsed: new Date(),
		tags: [{ id: 0, label: "Frontend" }],
	},
	{
		id: 1,
		skillName: "C#",
		proficiency: 4,
		lastUsed: new Date(),
		tags: [{ id: 0, label: "Backend" }],
	},
	{
		id: 2,
		skillName: "Bicep",
		proficiency: 3,
		lastUsed: new Date(),
		tags: [{ id: 0, label: "DevOps" }],
	},
	{
		id: 3,
		skillName: "Presenting",
		proficiency: 4,
		lastUsed: new Date(),
		tags: [{ id: 0, label: "Soft Skill" }],
	},
];

export default function ProfileSkillsCard() {
	return (
		<div>
			{skills.map((skill) => (
				<Card key={skill.id} className="mx-2 my-2">
					<CardHeader>
						<CardTitle>
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
						<CardDescription>{skill.lastUsed.toDateString()}</CardDescription>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}
