"use client";

import { useState } from "react";
import ProfileSkillsCard from "./tabs/ProfileSkillsCard";
import ProfileProjectsCard from "./tabs/ProfileProjectsCard";
import ProfileGoalsCard from "./tabs/ProfileGoalsCard";
import ProfileAchievementsCard from "./tabs/ProfileAchievementsCard";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const tabs = [
	{ id: "skills", label: "Skills" },
	{ id: "learningPaths", label: "Learning Paths" },
	{ id: "projects", label: "Projects" },
	{ id: "goals", label: "Goals" },
	{ id: "achievements", label: "Achievements" },
];

export default function ProfileTabsCard() {
	const [activeTab, setActiveTab] = useState("skills");

	const tabContent: Record<string, React.ReactNode> = {
		skills: <ProfileSkillsCard />,
		projects: <ProfileProjectsCard />,
		goals: <ProfileGoalsCard />,
		achievements: <ProfileAchievementsCard />,
	};

	return (
		<div className="w-full">
			<Card className="p-0 w-full gap-0">
				<nav className="flex w-full px-4 backdrop-blur border-b border-gray-200 shadow-sm sticky justify-between items-center rounded-t-2xl mt-3 pb-2">
					<div className="flex items-start justify-baseline">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={cn(
									"inline-block px-4 py-2 font-semibold text-lg transition-colors duration-150 relative",
									"hover:text-primary hover:font-medium" +
										" focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
									"after:content-[''] after:block after:h-[2px] after:bg-primary after:scale-x-0 after:transition-transform after:duration-200 after:absolute after:left-0 after:right-0 after:-bottom-1 hover:after:scale-x-100",
								)}
							>
								{tab.label}
							</button>
						))}
					</div>
				</nav>
				<div>{tabContent[activeTab]}</div>
			</Card>
		</div>
	);
}
