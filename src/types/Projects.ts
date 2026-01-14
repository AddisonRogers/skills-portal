export type UserProjects = {
	id: number;
	projectName: string;
    projectDescription: string;
	Status: Proficiency;
	lastUpdated: Date;
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