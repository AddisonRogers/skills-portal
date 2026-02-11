"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export type SortOption = "Proficiency" | "Alphabetical" | "Recent";

type Props = {
	sortBy: SortOption;
	setSortBy: (s: SortOption) => void;
};

export default function SortOptions({ sortBy, setSortBy }: Props) {
	const toggle = () => {
		const next: SortOption =
			sortBy === "Proficiency"
				? "Alphabetical"
				: sortBy === "Alphabetical"
					? "Recent"
					: "Proficiency";
		setSortBy(next);
	};

	return (
		<Button
			onClick={toggle}
			className="gap-1 px-2 rounded-2xl mt-3 mb-1 ml-3 font-medium text-white hover:scale-105"
		>
			Sort by: <span className="font-bold">{sortBy}</span>
		</Button>
	);
}

export { SortOptions };
