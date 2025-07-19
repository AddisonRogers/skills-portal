"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star } from "lucide-react";
import { useState } from "react";
import { Roadmap } from "@/types/Roadmap";
import {
	addFavouriteRoadmapEmail,
	addFavouriteRoadmapId,
	removeFavouriteRoadmapEmail,
} from "@/db/repositories/favourite";
import { useSession } from "@/lib/auth-client";

export default function FavouriteIcon(roadmap: Roadmap) {
	const userEmail = useSession().data?.user?.email;

	const [favourite, setFavourite] = useState(roadmap.isFavorite);

	function changeFavourite(roadmapId: string) {
		if (userEmail === undefined) return; // TODO implement it so it asks someone to sign in
		if (favourite === true) addFavouriteRoadmapEmail(userEmail, roadmapId);
		else removeFavouriteRoadmapEmail(userEmail, roadmapId);
		setFavourite(!favourite);
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Star
					size={18}
					onClick={() => changeFavourite(roadmap.id)}
					className={
						favourite
							? "text-yellow-400 fill-yellow-400"
							: "text-gray-400 hover:text-yellow-400 fill-none"
					}
				/>
			</TooltipTrigger>
			<TooltipContent>
				<p>Favourite</p>
			</TooltipContent>
		</Tooltip>
	);
}
