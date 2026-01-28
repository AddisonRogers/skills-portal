import { ProjectRoleDto } from "@/types/projectRoles.ts/ProjectRoleDto";
import { ProjectRoleRow } from "@/types/projectRoles.ts/ProjectRoleRow";

export default function mapProjectRoleToProjectRoleDto(
	rows: ProjectRoleRow[],
): ProjectRoleDto[] {
	const projectRoles = new Map<number, ProjectRoleDto>();

	for (const r of rows) {
		let projectRole = projectRoles.get(r.id);

		if (!projectRole) {
			projectRole = {
				id: r.id,
				name: r.name,
				description: r.description ?? "N/A",
			};
			projectRoles.set(r.id, projectRole);
		}
	}
	return Array.from(projectRoles.values());
}
