"use client";

import LevelBar from "./InfoAddOns/LevelBar";
import SkillRadar from "./InfoAddOns/SkillRadar";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { UserSkill } from "@/types/skill";


const skills: UserSkill[] = [
    {
        id: 0,
        skillName: "React",
        proficiency: { id: 0, value: 4, label: "Advanced" },
        lastUsed: new Date(),
        tags: [{ id: 0, label: "Frontend" }],
    },
    {
        id: 1,
        skillName: "C#",
        proficiency: { id: 0, value: 4, label: "Advanced" },
        lastUsed: new Date(),
        tags: [{ id: 0, label: "Backend" }],
    },
    {
        id: 2,
        skillName: "Bicep",
        proficiency: { id: 0, value: 3, label: "Intermediate" },
        lastUsed: new Date(),
        tags: [{ id: 0, label: "DevOps" }],
    },
    {
        id: 3,
        skillName: "Presenting",
        proficiency: { id: 0, value: 5, label: "Expert" },
        lastUsed: new Date(),
        tags: [{ id: 0, label: "Soft Skill" }],
},
];

export default function InfoTabs() {
    const userImg = `https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff`;

    return (
        <div className="w-full">
            <Card className="p-0 w-full gap-0">
                <nav className="flex w-full px-4 backdrop-blur border-b border-gray-200 shadow-sm sticky justify-between items-center rounded-t-2xl mt-3 pb-2">
                    <div className="flex items-start justify-baseline">
                        <a className="inline-block px-4 py-2 font-semibold text-lg transition-colors duration-150 relative">
                            Information
                        </a>
                    </div>
                </nav>
                <div className="flex flex-row justify-start items-center gap-2">
                    <Avatar className="m-4" style={{ width: 150, height: 150 }}>
                        <img
                            src={userImg}
                            alt="User Avatar"
                        />
                    </Avatar>
                    <div className="flex flex-col justify-center items-start">
                        <a className="inline-block px-4 py-2 font-semibold text-2xl transition-colors duration-150 relative">
                            Ada Lovegrove
                        </a>
                        <a className="inline-block px-4 py-2 text-sm transition-colors duration-150 relative">
                            Senior Cloud Engineer
                        </a>
                        <LevelBar currentXP={345} length="100%" minXP={225} maxXP={400} baseLevel={64} nextLevel={65} text/>
                    </div>
                </div>
                <div className="flex justify-center w-full p-4">
                    <button className="px-6 py-2 bg-primary text-white rounded-2xl hover:bg-primary/80 transition">
                        Edit Profile
                    </button>
                </div>
                <div>
                    <div className="flex flex-col items-start mb-4">
                        <nav className="flex w-full px-4 backdrop-blur border-b border-gray-200 shadow-sm sticky justify-between items-center rounded-t-2xl mt-3 pb-2">
                            <div className="flex items-start justify-baseline">
                                <a className="inline-block px-4 py-2 font-semibold text-lg transition-colors duration-150 relative">
                                    Skill Focus
                                </a>
                            </div>
                        </nav>
                        <p className="text-sm text-muted-foreground mb-2 ml-4">
                            A summary of your primary skills and areas of expertise.
                        </p>
                        <div className="flex items-center flex-wrap gap-2 ml-4">
                            {skills.flatMap((skill) =>
                                skill.proficiency.value >= 4
                                    ? skill.tags.map((tag) => (
                                        <a
                                            key={`${skill.id}-${tag.id}`}
                                            className="border-2 rounded-2xl px-1.5 bg-gray-200 font-semibold text-gray-700"
                                        >
                                            {tag.label}
                                        </a>
                                    ))
                                    : []
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full mb-4">
                    <nav className="flex w-full px-4 backdrop-blur border-b border-gray-200 shadow-sm sticky justify-between items-center rounded-t-2xl mt-3 pb-2">
                        <div className="flex items-start justify-baseline">
                            <a className="inline-block px-4 py-2 font-semibold text-lg transition-colors duration-150 relative">
                                Skill Radar
                            </a>
                        </div>
                    </nav>
                    <div className="mt-4">
                        <SkillRadar
                            skills={[
                                { label: 'Frontend', value: 90 },
                                { label: 'Backend', value: 70 },
                                { label: 'DevOps', value: 100 },
                                { label: 'Soft Skills', value: 90 },
                                { label: 'Databases', value: 50 },
                            ]}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}