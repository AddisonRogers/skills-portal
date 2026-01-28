import { getAllJobRolesDb } from "@/db/repositories/jobRoles";
import mapJobRoleToJobRoleDto from "@/lib/mappers/jobRoles/jobRole.mapper";

export default async function getAllJobRoles() {
	const jobRolesDb = await getAllJobRolesDb();
	return mapJobRoleToJobRoleDto(jobRolesDb);
}
