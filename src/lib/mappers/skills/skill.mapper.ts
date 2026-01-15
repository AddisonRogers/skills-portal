import { Skill } from "@/types/skills/Skill";
import { SkillDto } from "@/types/skills/SkillDto";

export default function mapSkillToSkillDto(rows: Skill[]): SkillDto[] {
    const skills = new Map<number, SkillDto>();

    for (const r of rows) {
        let skill = skills.get(r.id);

        if (!skill){
            skill = {
                id: r.id,
                name: r.name,
                description: r.description ?? "",
            }
            skills.set(r.id, skill)
        }
    }
    return Array.from(skills.values())
}