import { ScoringResult } from "@/types/matchScore/ScoringResult";
import { ScoringWeights } from "@/types/matchScore/ScoringWeights";
import { SearchCriteria } from "@/types/matchScore/SearchCriteria";
import { PersonWithSkillIndex } from "@/types/users/PersonDto";
import { DefaultScoringWeights } from "../constraints/DefaultScoringWeights";

export default function matchScore(
	person: PersonWithSkillIndex,
	criteria: SearchCriteria,
	weights: ScoringWeights = DefaultScoringWeights,
): ScoringResult {
	const requiredSkills = criteria.requiredSkills;

	if (requiredSkills.length === 0) {
		return {
			score: 0,
			matchedSkillIds: [],
			missingSkillIds: [],
			factors: { coverageScore: 0, proficiencyScore: 0 },
		};
	}

	const matchedSkillIds: number[] = [];
	const missingSkillIds: number[] = [];

	const minProf = criteria.minProficiency ?? 0;

	let profSum = 0;
	for (const skillId of requiredSkills) {
		const prof = person.skillIndex.get(skillId);
		if (prof !== undefined && prof >= minProf) {
			matchedSkillIds.push(skillId);
			profSum += prof;
		} else {
			missingSkillIds.push(skillId);
		}
	}

	const matchedCount = matchedSkillIds.length;
	const coverageScore = (matchedCount === 0 ? 0 : (matchedCount / requiredSkills.length) * 100);

	const maxProf = 5;
	const averageProf = profSum / matchedCount;
	const proficiencyScore = (matchedCount === 0 ? 0 : (averageProf / maxProf) * 100);

	const score =
		coverageScore * weights.coverage + proficiencyScore * weights.proficiency;

	return {
		score,
		matchedSkillIds,
		missingSkillIds,
		factors: { coverageScore, proficiencyScore },
	};
}
