import { getAllJobRolesDb } from "@/db/repositories/jobRoles";

export type JobRoleRow = Awaited<ReturnType<typeof getAllJobRolesDb>>[number];
