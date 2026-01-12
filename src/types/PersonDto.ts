import type { Skill } from "./Skill"
import type { Location } from "./Location"
import type { Capability } from "./Capability"
import type { JobRole } from "./JobRole"
import { ScoringResult } from "./matchScore/ScoringResult"

type Manager = {
    id: string | null,
    name: string | null,
    image: string,
    role: JobRole,
    location: Location

}
export interface PersonDto{
    id: string,
    name: string,
    role: JobRole,
    capability: Capability,
    image: string,
    location: Location,
    topSkills: Skill[],
    totalSkills: number,
    isAvailable: boolean,
    reportsTo: Manager
}

export interface PersonWithSkillIndex extends PersonDto{
    skillIndex: Map<number, number>
}

export interface RankedPerson extends PersonWithSkillIndex{
    ScoringResult: ScoringResult;
}