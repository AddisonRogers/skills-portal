export type UserSkill = {
	id: number;
	skillName: string;
	proficiency: Proficiency;
	lastUsed: Date;
	tags: Tag[];
};

export type Tag = {
	id: number;
	label: string;
};

export type Proficiency = {
	id: number;
	value: number;
	label: string;
};
