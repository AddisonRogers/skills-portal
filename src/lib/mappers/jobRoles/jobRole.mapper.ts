import { JobRoleDto } from "@/types/jobRoles/JobRoleDto";
import { JobRoleRow } from "@/types/jobRoles/JobRoleRows";

export default function mapJobRoleToJobRoleDto(
	rows: JobRoleRow[],
): JobRoleDto[] {
	const jobRoles = new Map<number, JobRoleDto>();

	for (const r of rows) {
		let jobRole = jobRoles.get(r.id);

		if (!jobRole) {
			jobRole = {
				id: r.id,
				title: r.title,
			};
			jobRoles.set(r.id, jobRole);
		}
	}
	return Array.from(jobRoles.values());
}
