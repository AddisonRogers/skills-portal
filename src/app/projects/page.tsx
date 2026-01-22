import getAllProjects from "@/lib/services/projects/getAllProjects";
import ProjectsClient from "./ProjectsClient";
import getAllClients from "@/lib/services/clients/getAllClients";

export default async function ProjectsPage() {
	const projects = await getAllProjects();
	const clients = await getAllClients();

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-6">Projects</h1>
			<ProjectsClient allProjects={projects} clients={clients}/>
		</div>
	);
}
