import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";

export function SkillCard(props: {
	skill: {
		id: number;
		name: string;
		description: string | null;
		madeBy: string | null;
		roadmapId: string;
		roadmapName: string;
		acquiredAt: Date | null;
		level: number | null;
	};
	loggedIn: boolean;
}) {
	let skillLevelText: string;
	switch (props.skill.level) {
		case 1:
			skillLevelText = "Learning";
			break;
		case 2:
			skillLevelText = "Learned";
			break;
		case 3:
			skillLevelText = "Advanced";
			break;
		default:
			skillLevelText = "Not Learned";
	}

	return (
		<Card className="h-full hover:shadow-md transition-shadow relative">
			<CardHeader>
				<div className={"flex flex-row justify-between"}>
					<CardTitle>{props.skill.name}</CardTitle>
					{props.loggedIn && (
						<Badge variant="default" className="mt-1">
							{skillLevelText}
						</Badge>
					)}
				</div>
				<Badge variant="outline" className="mt-1">
					{props.skill.roadmapName}
				</Badge>
			</CardHeader>
			<CardDescription className={"px-6 line-clamp-2"}>
				{props.skill.description}
			</CardDescription>
		</Card>
	);
}
