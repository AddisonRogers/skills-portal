import { Briefcase, User } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import FavouriteIcon from "@/components/favouriteIcon/favouriteIcon";
import type { Roadmap } from "@/types/Roadmap";
import Image from "next/image";

export default function RoadmapCard(roadmap: Roadmap) {
	// TODO remove
	const generateAvatarUrl = (index: number) => {
		return `https://i.pravatar.cc/40?img=${index}`;
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
			<div className="flex justify-between items-start">
				<div className={"flex items-center gap-2"}>
					<h3 className="text-lg font-normal">{roadmap.name}</h3>

					{roadmap.suggestedBy === "manager" && (
						<Tooltip>
							<TooltipTrigger asChild>
								<Briefcase size={18} className="text-fsp-core-teal" />
							</TooltipTrigger>
							<TooltipContent>
								<p>Suggested by manager</p>
							</TooltipContent>
						</Tooltip>
					)}

					{roadmap.suggestedBy === "role" && (
						<Tooltip>
							<TooltipTrigger asChild>
								<User size={18} className="text-fsp-core-teal" />
							</TooltipTrigger>
							<TooltipContent>
								<p>Suggested by role</p>
							</TooltipContent>
						</Tooltip>
					)}
				</div>

				<div className="flex space-x-2">
					<FavouriteIcon roadmap={roadmap} />
				</div>
			</div>
			<Badge className={"mb-2"} asChild>
				<span>{roadmap.capability}</span>
			</Badge>

			<p className="text-gray-600 mb-4">{roadmap.description}</p>
			{roadmap.usersLearning && roadmap.usersLearning > 0 && (
				<div className="flex items-center justify-between gap-2">
					<span className="text-sm text-gray-500">
						{roadmap.usersLearning}{" "}
						{roadmap.usersLearning === 1 ? "person" : "people"} learning
					</span>
					<div className="flex -space-x-2 mr-2">
						{[...Array(Math.min(3, roadmap.usersLearning))].map((_, i) => (
							<Image
								key={i}
								width={8}
								height={8}
								className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
								src={generateAvatarUrl(i + 1)}
								alt={`User ${i + 1}`}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
