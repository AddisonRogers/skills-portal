import { UserSkill } from "@/types/skills/UserSkill";
import { PersonDto, PersonWithSkillIndex } from "@/types/users/PersonDto";

export default function userSkillIndexMapper(skills: UserSkill[]) {
	const map = new Map<number, number>();
	for (const skill of skills) {
		map.set(skill.id, skill.level ?? 0);
	}
	return map;
}

export function addSkillIndexToPerson(person: PersonDto): PersonWithSkillIndex {
    return{
        ...person,
        skillIndex: userSkillIndexMapper(person.topSkills)
    }
}
