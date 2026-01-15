import { SkillDto } from "../skills/SkillDto";

export type SearchCriteria = {
	requiredSkills: number[];
	minProficiency?: number;
};
