import type { SkillDto } from "../skills/SkillDto";
import type { Location } from "../Location";
import type { Capability } from "../Capability";
import type { JobRole } from "../JobRole";
import { ScoringResult } from "../matchScore/ScoringResult";
import { UserSkill } from "../skills/UserSkill";

type Manager = {
	id: string | null;
	name: string | null;
	image: string;
	role: JobRole;
	location: Location;
};
export interface PersonDto {
	id: string;
	name: string;
	role: JobRole;
	capability: Capability;
	image: string;
	location: Location;
	topSkills: UserSkill[];
	totalSkills: number;
	isAvailable: boolean;
	reportsTo: Manager;
}

export interface PersonWithSkillIndex extends PersonDto {
	skillIndex: Map<number, number>;
}

export interface RankedPerson extends PersonWithSkillIndex {
	ScoringResult: ScoringResult;
}
