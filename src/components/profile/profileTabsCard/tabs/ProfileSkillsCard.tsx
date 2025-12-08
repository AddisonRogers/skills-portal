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

const skills: UserSkill[] = [
	{
		id: 0,
		skillName: "React",
		proficiency: {id: 0, value: 4, label: "Advanced"},
		lastUsed: new Date(),
		tags: [{ id: 0, label: "Frontend" }],
	},
	{
		id: 1,
		skillName: "C#",
		proficiency: {id: 0, value: 4, label: "Advanced"},
		lastUsed: new Date(),
		tags: [{ id: 0, label: "Backend" }],
	},
	{
		id: 2,
		skillName: "Bicep",
		proficiency: {id: 0, value: 3, label: "Intermediate"},
		lastUsed: new Date(),
		tags: [{ id: 0, label: "DevOps" }],
	},
	{
		id: 3,
		skillName: "Presenting",
		proficiency: {id: 0, value: 5, label: "Expert"},
		lastUsed: new Date(),
		tags: [{ id: 0, label: "Soft Skill" }],
	},
];

const proficiencyColors: Record<string, string> = {
  Beginner: "bg-gray-200 text-gray-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-purple-100 text-purple-700",
  Expert: "bg-pink-100 text-pink-700",
};

export default function ProfileSkillsCard() {
	return (
		<div>
			{skills.map((skill) => (
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
                                <CardDescription className="mt-1">{skill.lastUsed.toDateString()}</CardDescription>
                            </div>
                            <div className="flex ml-auto items-center gap-4">
                                <CardDescription className={cn(
                                        "rounded-2xl px-2 py-0.5 font-semibold whitespace-nowrap",
                                        proficiencyColors[skill.proficiency.label])}>
                                        {skill.proficiency.label}
                                </CardDescription>
                                <CardDescription className="flex flex-col items-center leading-none">
                                    <a className="mb-1">Proficiency</a>
                                    <a className="font-bold text-black text-lg">{skill.proficiency.value}</a>
                                </CardDescription>
                            </div>
                        </div>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}
