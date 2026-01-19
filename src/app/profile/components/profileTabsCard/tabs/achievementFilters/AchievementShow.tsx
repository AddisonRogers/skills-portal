"using client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type AchievementShowOptions =
	| "All"
	| "Unknown"
	| "Bronze"
	| "Silver"
	| "Gold"
	| "Diamond";

type Props = {
	showFilter: AchievementShowOptions;
	setShowFilter: (s: AchievementShowOptions) => void;
};

export default function AchievementShow({ showFilter, setShowFilter }: Props) {
	const toggle = () => {
		const next: AchievementShowOptions =
			showFilter === "All"
				? "Unknown"
				: showFilter === "Unknown"
					? "Bronze"
					: showFilter === "Bronze"
						? "Silver"
						: showFilter === "Silver"
							? "Gold"
							: showFilter === "Gold"
								? "Diamond"
								: "All";
		setShowFilter(next);
	};

	return (
		<Button
			onClick={toggle}
			className="gap-1 px-2 rounded-2xl mt-3 mb-1 ml-3 font-medium"
		>
			Show:<a className="font-bold">{showFilter}</a>
		</Button>
	);
}

export { AchievementShow };
