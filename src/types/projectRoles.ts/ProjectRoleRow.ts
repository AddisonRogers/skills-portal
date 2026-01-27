import { getProjectRolesDb } from "@/db/repositories/jobRoles";

export type ProjectRoleRow = Awaited<
	ReturnType<typeof getProjectRolesDb>
>[number];
