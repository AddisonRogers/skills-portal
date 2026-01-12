export type SkillProficiency =
	| "Beginner"
	| "Intermediate"
	| "Advanced"
	| "Expert";

export const PROFICIENCY_MAP: Record<number, SkillProficiency> = {
	1: "Beginner",
	2: "Beginner",
	3: "Intermediate",
	4: "Advanced",
	5: "Expert",
} as const;

export default function skillProficiencyMap(
	level?: number | null,
): SkillProficiency {
	return PROFICIENCY_MAP[level ?? 1] ?? "Beginner";
}
