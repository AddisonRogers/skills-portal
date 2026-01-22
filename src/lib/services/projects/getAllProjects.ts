import { getProjects } from "@/db/repositories/projects";
import mapProjectsDbToProjects from "@/lib/mappers/projects/project.mapper";

export default async function getAllProjects() {
	const projectsDb = await getProjects();
	return mapProjectsDbToProjects(projectsDb);
}
