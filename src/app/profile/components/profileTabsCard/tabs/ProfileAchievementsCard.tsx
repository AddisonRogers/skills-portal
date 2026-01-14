"use client";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Achievements } from "@/types/Achievements";
import LevelBar from "../../../../../components/InfoAddOns/LevelBar";
import Image from "next/image";

const Placeholder = "/badgeImages/Placeholder Badge.png";
const Bronze = "/badgeImages/Bronze Badge.png";
const Silver = "/badgeImages/Silver Badge.png";
const Gold = "/badgeImages/Gold Badge.png";
const Diamond = "/badgeImages/Diamond Badge.png";

const achievements: Achievements[] = [
	{
		id: 0,
		achievement: "Get 3 Certifications",
		achievementDescription: "Get three certifications in cloud computing.",
		baseLevel: 0,
		nextLevel: 3,
		currentLevel: 2,
		rank: 0,
	},
	{
		id: 1,
		achievement: "Work On 2 Projects",
		achievementDescription:
			"Take part in two projects at work to enhance practical experience.",
		baseLevel: 1,
		nextLevel: 2,
		currentLevel: 1,
		rank: 1,
	},
	{
		id: 2,
		achievement: "Learn New Skills",
		achievementDescription:
			"Acquire new skills relevant to your professional growth.",
		baseLevel: 3,
		nextLevel: 5,
		currentLevel: 4,
		rank: 2,
	},
	{
		id: 3,
		achievement: "Mentor Colleagues",
		achievementDescription:
			"Provide mentorship to colleagues to foster team development.",
		baseLevel: 1,
		nextLevel: 3,
		currentLevel: 2,
		rank: 3,
	},
	{
		id: 4,
		achievement: "Lead a Project",
		achievementDescription:
			"Successfully lead a  project from initiation to completion.",
		baseLevel: 0,
		nextLevel: 1,
		currentLevel: 0,
		rank: 4,
	},
];

let badgeSelector = (achievement: Achievements): string => {
	if (achievement.rank === 0) return Placeholder;
	else if (achievement.rank === 1) return Bronze;
	else if (achievement.rank === 2) return Silver;
	else if (achievement.rank === 3) return Gold;
	else if (achievement.rank === 4) return Diamond;
	return Placeholder;
};

export default function ProfileAchievementsCard() {
	return (
		<div>
			{achievements.map((achievement) => (
				<Card key={achievement.id} className="mx-2 my-2 p-4 relative">
					<CardHeader className="gap-0">
						<div className="flex items-center gap-3">
							<div className="flex-1 min-w-0 pr-4">
								<CardTitle className="flex items-center mb-0">
									<a className="mr-3">{achievement.achievement}</a>
								</CardTitle>
								<CardDescription className="mt-1 opacity-80 mr-0.5">
									{achievement.achievementDescription}
								</CardDescription>
								<LevelBar
									currentXP={achievement.currentLevel}
									length="100%"
									minXP={achievement.baseLevel}
									maxXP={achievement.nextLevel}
									baseLevel={achievement.baseLevel}
									nextLevel={achievement.nextLevel}
									text={false}
								/>
							</div>
							<div className="shrink-0 w-20 flex items-center justify-center overflow-visible">
								<CardDescription>
									<Image
										src={badgeSelector(achievement)}
										alt="Badge Image"
										width={64}
										height={64}
										className="w-16 h-16"
									/>
								</CardDescription>
							</div>
						</div>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}
