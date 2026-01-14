export type UserGoals = {
	id: number;
	goalName: string;
	goalDescription: string;
	status: Proficiency;
	due: Date;
};

export type Tag = {
	id: number;
	label: string;
};

export type Proficiency = {
	id: number;
	label: string;
};
