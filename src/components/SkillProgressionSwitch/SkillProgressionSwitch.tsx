"use client";

import { TripleToggle } from "@/components/ui/tripleToggleSwitch";
import { use, useState } from "react";
import { useUserInfo } from "@/hooks/useUserInfo";
import { changeSkillProgression } from "@/components/SkillProgressionSwitch/serverFunctions";
import type { getSkillForUserEmailResult } from "@/db/repositories/skills";

export default function SkillProgressionSwitch({
	skillName,
	skillProgressionProp,
}: {
	skillName: string;
	skillProgressionProp: Promise<
		getSkillForUserEmailResult[] | null | undefined
	>;
}) {
	const options = [
		{ value: "NotStarted", label: "Not Started" },
		{ value: "Learning", label: "Learning" },
		{ value: "Learned", label: "Learned" },
	];

	const skillProgression = use<getSkillForUserEmailResult[] | null | undefined>(
		skillProgressionProp,
	);

	const [value, setValue] = useState(
		skillProgression !== null && skillProgression.length > 0
			? options[skillProgression[0].level ?? 0].value
			: "NotStarted",
	);
	const { loggedIn } = useUserInfo();

	if (!loggedIn) {
		return null;
	}

	const onValueChange = (value: string) => {
		setValue(value);
		const numericalValue = options.findIndex(
			(option) => option.value === value,
		);
		console.debug(numericalValue);
		changeSkillProgression(skillName, numericalValue);
	};

	return (
		<TripleToggle
			value={value}
			onValueChange={onValueChange}
			options={options}
		/>
	);
}
