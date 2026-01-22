'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { client } from "@/db/schema";
import { ClientDto } from "@/types/client/ClientDto";
import { SearchCriteria } from "@/types/matchScore/SearchCriteria";
import { ProjectDto } from "@/types/projects/ProjectDto";
import { ArrowUpDown, Filter, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useState } from "react";

interface ProjectClientProps {
    allProjects: ProjectDto[];
	clients: ClientDto[];
}

type SortField =
	| "relevance"
	| "project"
	| "client"
	| "status";

export default function ProjectsClient({allProjects = [], clients = []}: ProjectClientProps) {
	const router = useRouter();
    const [projects, setProjects] = useState<ProjectDto[]>(allProjects);
    const [allProjectsScope, setAllProjectsScope] = useState(true);
const [clientFilter, setClientFilter] = useState<SearchCriteria>({requiredIds: []});
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [sortField, setSortField] = useState<SortField>("project");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const statusColours: Record<string, string> = {
		UpComing: "bg-red-100 text-red-700",
		Active: "bg-blue-100 text-blue-700",
		Completed: "bg-green-100 text-green-700",
	};

	function toggleId(list: number[], id: number) {
		return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
	}

	async function handleYourProjectsClick() {
		setLoading(true);

		const res = await fetch("/api/projects/your");

		if(res.status === 401) {
			router.push("/login?redirect=/projects");
			return;
		}

		const data = await res.json();
		setAllProjectsScope(false);
		setProjects(data);
		setLoading(false);
	}

	function handleAllProjectsClick() {
		setProjects(allProjects);
		setAllProjectsScope(true);
	}

	// Handle client filter change
		useEffect(() => {
			const filterByClient = async () => {
				if (clientFilter.requiredIds.length === 0) {
					setProjects(allProjects);
					return;
				}

				if (clientFilter.requiredIds.length > 0) {
					setSortField("relevance");
					setSortDirection("desc");
				} else {
					setSortField("project");
					setSortDirection("asc");
				}
	
				setLoading(true);
				try {
					const filtered = allProjects.filter((project) =>
						clientFilter.requiredIds.includes(project.client.id),
					);
					setProjects(filtered);
				} catch (error) {
					console.error("Error filtering by client:", error);
					setProjects(allProjects);
				} finally {
					setLoading(false);
				}
			};

			filterByClient();
		}, [clientFilter, allProjects]);

		// Filter and sort projects
			const filteredAndSortedProjects = useMemo(() => {
				// First filter by search term
				const searchLower = searchTerm.trim().toLocaleLowerCase();
				const filtered = projects.filter((project) =>
					[
						project.name,
						project.description,
						project.client?.name,	
					]
						.filter(Boolean)
						.some((field) => field!.toLowerCase().includes(searchLower)),
				);

				// Then sort based on sortField and sortDirection
				const sorted = [...filtered].sort((a, b) => {
					let compareA: string = "";
					let compareB: string = "";

					switch (sortField) {
						case "project":
							compareA = a.name;
							compareB = b.name;
							break;
						case "client":
							compareA = a.client?.name || "";
							compareB = b.client?.name || "";
							break;
						case "status":
							compareA = a.status || "";
							compareB = b.status || "";
							break;
						default:
							compareA = a.name;
							compareB = b.name;
					}
						return sortDirection === "asc" ? compareA.localeCompare(compareB) : compareB.localeCompare(compareA);
				});
				return sorted;
			}, [projects, searchTerm, sortField, sortDirection]);

			const handleSort = (field: SortField) => {
				if (field === sortField) {
					setSortDirection(sortDirection === "asc" ? "desc" : "asc");
				} else {
					setSortField(field);
					setSortDirection("asc");
				}
			};

    return (
        <Card>
			<CardHeader>
                <div className="inline-flex justify-between align-middle">
                    <CardTitle>Projects Directory</CardTitle>
                    <div>
                        <Button variant="outline" className={`mr-0.5 ${allProjectsScope ? "bg-primary text-white" : "bg-white"}`} onClick={handleAllProjectsClick}>All projects</Button>
                        <Button variant="outline" className={`ml-0.5 ${allProjectsScope ? "bg-white" : "bg-primary text-white"}`} onClick={handleYourProjectsClick}>Your projects</Button>
                    </div>
                </div>
				<div className="flex flex-col sm:flex-row gap-4 mt-4">
					<div className="flex-1">
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search by project name, description or client..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-8"
							/>
						</div>
					</div>

					<div className="w-full sm:w-48">
						<Popover>
							<PopoverTrigger asChild>
								<Button variant="outline" className="w-full justify-between">
									{clientFilter?.requiredIds.length
										? `${clientFilter.requiredIds.length} selected`
										: "Filters"}
									<Filter className="ml-2 h-4 w-4" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-56 p-0" align="end">
								<div className="p-2">
									<div className="space-y-2">
										{clients.map((client) => {
											const isSelected = clientFilter?.requiredIds.includes(
												client.id,
											);
											return (
												<div key={client.id} className="flex items-center">
													<Button
														variant={isSelected ? "default" : "ghost"}
														className="w-full justify-start"
														onClick={() =>
															setClientFilter((prev) => ({
																...prev,
																requiredIds: toggleId(
																	prev.requiredIds,
																	client.id,
																),
															}))
														}
													>
														{client.name}
													</Button>
												</div>
											);
										})}
										{clientFilter && (
											<Button
												variant="outline"
												className="w-full mt-2"
												onClick={() => setClientFilter({ requiredIds: [] })}
											>
												Clear Filter
											</Button>
										)}
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>

					<div className="w-full sm:w-48">
						<Select
							value={sortField}
							onValueChange={(value) => setSortField(value as SortField)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="project">Project</SelectItem>
								<SelectItem value="client">Client</SelectItem>
								<SelectItem value="status">Status</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Button
						variant="outline"
						onClick={() =>
							setSortDirection(sortDirection === "asc" ? "desc" : "asc")
						}
						className="w-full sm:w-auto"
					>
						{sortDirection === "asc" ? "Ascending" : "Descending"}
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{loading ? (
					<div className="flex justify-center items-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
					</div>
				) : (
					<>
						<div className="rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead
											className="w-[200px] cursor-pointer"
											onClick={() => handleSort("project")}
										>
											Project{" "}
											{sortField === "project" &&
												(sortDirection === "asc" ? "↑" : "↓")}
										</TableHead>
										<TableHead
											className="cursor-pointer"
											onClick={() => handleSort("client")}
										>
											Client{" "}
											{sortField === "client" &&
												(sortDirection === "asc" ? "↑" : "↓")}
										</TableHead>
										<TableHead
											className="cursor-pointer"
											onClick={() => handleSort("status")}
										>
											Status{" "}
											{sortField === "status" &&
												(sortDirection === "asc" ? "↑" : "↓")}
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{projects.length === 0 ? (
										<TableRow>
											<TableCell colSpan={5} className="text-center py-8">
												{projects.length === 0 ? (
													<>No projects found matching your search criteria.</>
												) : (
													<>
														No projects found for the client:{" "}
														<strong>{clientFilter.requiredIds}</strong>
													</>
												)}
											</TableCell>
										</TableRow>
									) : (
										projects.map((project) => (
											<TableRow key={project.id}>
												<TableCell className="align-middle">
													<div className="inline-flex items-center gap-3">
														<div className="flex flex-col">
															<a className="font-semibold text-xl">
																{project.name}
															</a>
															<a>{project.description}</a> 
														</div>
													</div>
												</TableCell>
												<TableCell>
													<div className="inline-flex items-center gap-3">
														<div className="flex flex-col">
															<a className="font-semibold text-xl">
																{project.client.name}
															</a>
															<a>{project.client.description}</a> 
														</div>
													</div>
												</TableCell>
												<TableCell>
													<div className={`inline-flex items-center text-center rounded-2xl font-semibold py-0.5 px-3 ${statusColours[project.status]}`}>
														<a>{project.status}</a>
													</div>
												</TableCell>
												<TableCell className="align-middle">
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
						<div className="mt-4 text-sm text-gray-500">
							Showing {projects.length} of {projects.length}{" "}
							projects
							{projects && (
								<span>
									{" "}
									filtered by client:{" "}
								</span>
							)}
						</div>
					</>
				)}
			</CardContent>
		</Card>
    )
}