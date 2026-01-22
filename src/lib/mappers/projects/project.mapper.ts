import { ProjectDto } from "@/types/projects/ProjectDto";
import { ProjectRow } from "@/types/projects/ProjectRow";

const PROJECT_STATUS_LABELS: Record<string, string> = {
		upComing: "UpComing",
		active: "Active",
		completed: "Completed",
	};

export default function mapProjectsDbToProjects(rows: ProjectRow[]): ProjectDto[] {
    const projects = new Map<Number, ProjectDto>();

    for(const r of rows) {
        let project = projects.get(r.projectId)

        if(!project) {
            project = {
                id: r.projectId,
                name: r.projectName,
                description: r.projectDescription ?? "N/A",
                status: PROJECT_STATUS_LABELS[r.projectStatus],
                users: [],
                client: {id: r.clientId ?? 0, name: r.clientName ?? "Internal", description: r.clientDescription ?? "Internal work"}
            }
            projects.set(r.projectId, project)
        }
        if(r.userId && r.userName){
            project.users.push({
                id: r.userId,
                name: r.userName,
                jobRole: {id: r.userJobRoleId, title: r.userJobRoleTitle}
            })
        }
    }
    return Array.from(projects.values())
}