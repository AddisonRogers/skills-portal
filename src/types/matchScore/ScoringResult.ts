export type ScoringResult = {
	score: number;
	matchedSkillIds: number[];
	missingSkillIds: number[];
	factors: {
		coverageScore: number;
		proficiencyScore: number;
	};
};
