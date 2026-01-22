import { ClientDto } from "../client/ClientDto";
import { ProjectUser } from "../users/ProjectUser";

export type ProjectDto = {
	id: number;
	name: string;
	description: string;
	status: string;
	users: ProjectUser[];
	client: ClientDto;
};

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
