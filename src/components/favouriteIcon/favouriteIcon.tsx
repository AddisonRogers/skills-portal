"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star } from "lucide-react";
import { useState } from "react";
import { Roadmap } from "@/types/Roadmap";
import { serverChangeFavourite } from "@/components/favouriteIcon/serverFunctions";

export default function FavouriteIcon(roadmap: Roadmap) {
	const [favourite, setFavourite] = useState(roadmap.isFavorite);

	function changeFavourite(roadmapId: string) {
		serverChangeFavourite(roadmapId, !favourite);
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
