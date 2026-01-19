import { SearchCriteria } from "@/types/matchScore/SearchCriteria";

export const searchCriteriaBasic: SearchCriteria = {
	requiredSkills: [101, 102, 103],
	minProficiency: 3,
};

export const createSearchCriteria = (overrides?: Partial<SearchCriteria>): SearchCriteria => ({
    ...searchCriteriaBasic,
    ...overrides,
})
