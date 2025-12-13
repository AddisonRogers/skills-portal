"use client";

import { useQueryState } from "nuqs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { parseAsString } from "nuqs";

interface RoadmapFilterProps {
	roadmaps: string[];
}

export function RoadmapFilter({ roadmaps }: RoadmapFilterProps) {
	const [roadmapId, setRoadmapId] = useQueryState(
		"roadmapId",
		parseAsString.withDefault("all"),
	);

	return (
		<div className="w-full md:w-48">
			<label className="text-sm font-medium mb-2 block">
				Filter by roadmap
			</label>
			<Select value={roadmapId} onValueChange={setRoadmapId}>
				<SelectTrigger>
					<SelectValue placeholder="All Roadmaps" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Roadmaps</SelectItem>
					{roadmaps.map((roadmap) => (
						<SelectItem key={roadmap} value={roadmap}>
							{roadmap}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
