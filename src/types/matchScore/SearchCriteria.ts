export interface SearchCriteria {
	requiredIds: number[];
}

export interface SearchCriteriaSkills extends SearchCriteria {
	minProficiency?: number;
};
