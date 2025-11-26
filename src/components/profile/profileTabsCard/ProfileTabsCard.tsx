"use client";

import { useState } from "react";
import ProfileSkillsCard from "./tabs/ProfileSkillsCard";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tabs = [
	{ id: "skills", label: "Skills" },
	{ id: "learningPaths", label: "Learning Paths" },
	{ id: "projects", label: "Projects" },
	{ id: "goals", label: "Goals" },
];

export default function ProfileTabsCard() {
	const [activeTab, setActiveTab] = useState("skills");
	const [showFilter, setShowFilter] = useState("All");
	const [sortBy, setSortBy] = useState("Proficiency");

	const tabContent: Record<string, React.ReactNode> = {
		skills: <ProfileSkillsCard />,
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
									"inline-block px-4 py-2 font-medium text-lg transition-colors duration-150 relative",
									"hover:text-primary hover:font-semibold" +
										" focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
									"after:content-[''] after:block after:h-[2px] after:bg-primary after:scale-x-0 after:transition-transform after:duration-200 after:absolute after:left-0 after:right-0 after:-bottom-1 hover:after:scale-x-100",
								)}
							>
								{tab.label}
							</button>
						))}
					</div>
				</nav>
				<div className="flex flex-row justify-start">
					<Button
						onClick={() =>
							setShowFilter(showFilter == "All" ? "Recent" : "All")
						}
						className="gap-1 px-2 rounded-2xl mt-3 mb-1 ml-3 font-medium"
					>
						Show:<a className="font-bold">{showFilter}</a>
					</Button>
					<Button
						onClick={() =>
							setSortBy(sortBy == "Proficiency" ? "Last used" : "Proficiency")
						}
						className="gap-1 px-2 rounded-2xl mt-3 mb-1 ml-3 font-medium"
					>
						Sort by:<a className="font-bold">{sortBy}</a>
					</Button>
					<Button className="gap-1 px-2 rounded-2xl mt-3 mb-1 ml-auto mr-3 font-bold">
						Manage Skills
					</Button>
				</div>
				<div>{tabContent[activeTab]}</div>
			</Card>
		</div>
	);
}
