import { getProjectRolesDb } from "@/db/repositories/jobRoles";
import mapProjectRoleToProjectRoleDto from "@/lib/mappers/projectRoles/projectRole.mapper";

export default async function getAllProjectRoles() {
	const projectRolesDb = await getProjectRolesDb();
	return mapProjectRoleToProjectRoleDto(projectRolesDb);
}
