import { getSkills } from "@/db/repositories/skills";
import mapSkillToSkillDto from "@/lib/mappers/skills/skill.mapper";

export default async function getAllSkills() {
	const skills = await getSkills();
    return mapSkillToSkillDto(skills);
}
