import { Skill } from "@/types/Skill";

export default function skillIndexMapper(skills: Skill[]) {
	const map = new Map<number, number>();
	for (const skill of skills) {
		map.set(skill.id, skill.level ?? 0);
	}
	return map;
}
