export type UserSkill = {
	id: number;
	skillName: string;
	proficiency: number;
	lastUsed: Date;
	tags: Tag[];
};

export type Tag = {
	id: number;
	label: string;
};
