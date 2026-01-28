import { SearchCriteriaSkills } from "@/types/matchScore/SearchCriteria";

export const searchCriteriaBasic: SearchCriteriaSkills = {
	requiredIds: [101, 102, 103],
	minProficiency: 3,
};

export const createSearchCriteria = (
	overrides?: Partial<SearchCriteriaSkills>,
): SearchCriteriaSkills => ({
	...searchCriteriaBasic,
	...overrides,
});
