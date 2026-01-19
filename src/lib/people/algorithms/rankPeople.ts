import { ScoringWeights } from "@/types/matchScore/ScoringWeights";
import { SearchCriteria } from "@/types/matchScore/SearchCriteria";
import { PersonWithSkillIndex, RankedPerson } from "@/types/users/PersonDto";
import matchScore from "./matchScore";
import { DefaultScoringWeights } from "../constraints/DefaultScoringWeights";

export default function rankPeople(
	people: PersonWithSkillIndex[],
	criteria: SearchCriteria,
	weights: ScoringWeights = DefaultScoringWeights,
): RankedPerson[] {
	const ranked = people.map((p) => {
		const res = matchScore(p, criteria, weights);
		const rankedPerson: RankedPerson = {
			...p,
			ScoringResult: {
				score: res.score,
				matchedSkillIds: res.matchedSkillIds,
				missingSkillIds: res.missingSkillIds,
				factors: res.factors,
			},
		};
		return rankedPerson;
	});

	ranked.sort(
		(a, b) =>
			b.ScoringResult.score - a.ScoringResult.score ||
			a.name.localeCompare(b.name),
	);
	return ranked;
}
