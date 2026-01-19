"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export type SortOption = "highest-lowest" | "lowest-highest";

type Props = {
	sortBy: SortOption;
	setSortBy: (s: SortOption) => void;
};

export default function AchievementSort({ sortBy, setSortBy }: Props) {
	const toggle = () => {
		const next: SortOption =
			sortBy === "highest-lowest" ? "lowest-highest" : "highest-lowest";
		setSortBy(next);
	};

	return (
		<Button
			onClick={toggle}
			className="gap-1 px-2 rounded-2xl mt-3 mb-1 ml-3 font-medium"
		>
			Sort by: <span className="font-bold">{sortBy}</span>
		</Button>
	);
}

export { AchievementSort };
