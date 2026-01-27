import { JobRole } from "../jobRoles/JobRole";

export type ProjectUser = {
	id: string;
	name: string;
	jobRole: JobRole;
};
