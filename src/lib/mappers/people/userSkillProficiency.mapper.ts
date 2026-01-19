export type UserSkillProficiency =
	| "Beginner"
	| "Intermediate"
	| "Advanced"
	| "Expert";

export const PROFICIENCY_MAP: Record<number, UserSkillProficiency> = {
	1: "Beginner",
	2: "Beginner",
	3: "Intermediate",
	4: "Advanced",
	5: "Expert",
} as const;

export default function userSkillProficiencyMap(
	level?: number | 0,
): UserSkillProficiency {
	return PROFICIENCY_MAP[level ?? 1] ?? "Beginner";
}
