"use client";

import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { parseAsString } from "nuqs";

export function SkillsSearchBar() {
	const [skillName, setSkillName] = useQueryState(
		"skillName",
		parseAsString.withDefault(""),
	);

	return (
		<div className="flex-1">
			<label className="text-sm font-medium mb-2 block">Search skills</label>
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
				<Input
					placeholder="Search by skill name..."
					value={skillName}
					onChange={(e) => setSkillName(e.target.value)}
					className="pl-10"
				/>
			</div>
		</div>
	);
}
