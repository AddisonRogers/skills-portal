"use client";

import { useState, useMemo, useEffect } from "react";
import { PersonWithAccount, searchPeopleBySkill } from "./serverFunctions";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	CheckCircle,
	XCircle,
	ArrowUpDown,
	Search,
	Filter,
	MapPin,
} from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { PersonDto, RankedPerson } from "@/types/users/PersonDto";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { SkillDto } from "@/types/skills/SkillDto";
import { SearchCriteria } from "@/types/matchScore/SearchCriteria";
import { skill } from "@/db/schema";

type SortField = "relevance" | "person" | "skills" | "isAvailable" | "reportsTo";
type SortDirection = "asc" | "desc";

interface PeopleClientProps {
	initialPeople: PersonDto[];
	initialSkills: SkillDto[];
}

export default function PeopleClient({
	initialPeople = [],
	initialSkills = [],
}: PeopleClientProps) {
	const [people, setPeople] = useState<PersonDto[] | RankedPerson[]>(initialPeople);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortField, setSortField] = useState<SortField>("person");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
	const [skillFilter, setSkillFilter] = useState<SearchCriteria>({requiredSkills: []});
	const [currentSkillFilter, setCurrentSkillFilter] = useState<SkillDto>();
	const [availableSkills, setAvailableSkills] = useState<SkillDto[]>(initialSkills);
	const [isLoading, setIsLoading] = useState(false);

	function toggleId(list: number[], id: number) {
  		return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
	}

	function isRankedPerson(p: PersonDto | RankedPerson): p is RankedPerson {
		return typeof (p as RankedPerson).ScoringResult?.score === "number";
		}

	// // Fetch available skills for filtering
	// useEffect(() => {
	// 	const fetchSkills = async () => {
	// 		try {
	// 			// This would typically be a server action, but for simplicity we're mocking it
	// 			// In a real implementation, you would fetch this from the server
	// 			setAvailableSkills([
	// 				"JavaScript",
	// 				"TypeScript",
	// 				"React",
	// 				"Next.js",
	// 				"Node.js",
	// 				"SQL",
	// 				"Python",
	// 			]);
	// 		} catch (error) {
	// 			console.error("Error fetching skills:", error);
	// 		}
	// 	};

	// 	fetchSkills();
	// }, []);

	// Handle skill filter change
	useEffect(() => {
		const filterBySkill = async () => {
			if (skillFilter.requiredSkills.length === 0) {
				setPeople(initialPeople);
				return;
			}

			if (skillFilter.requiredSkills.length > 0) {
				setSortField("relevance");
				setSortDirection("desc");
			} else {
				setSortField("person");
				setSortDirection("asc");
			}

			setIsLoading(true);
			try {
				// In a real implementation, this would call the server function
				// For now, we'll simulate filtering by skill
				const filtered = await searchPeopleBySkill(skillFilter);
				setPeople(filtered);
			} catch (error) {
				console.error("Error filtering by skill:", error);
				setPeople(initialPeople);
			} finally {
				setIsLoading(false);
			}
		};

		filterBySkill();
	}, [skillFilter, initialPeople]);

	// Filter and sort people
	const filteredAndSortedPeople = useMemo(() => {
		// First filter by search term
		const searchLower = searchTerm.trim().toLocaleLowerCase();
		const filtered = people.filter((person) =>
			[
				person.name,
				person.role?.title,
				person.capability?.name,
				person.location?.name,
				...person.topSkills?.map((s) => s.name) ?? [],
			]
				.filter(Boolean)
				.some((field) => field!.toLowerCase().includes(searchLower)),
		);

		// Sort by selected field
		filtered.sort((a, b) => {
			let comparison = 0;

			switch (sortField) {
				case "relevance": {
					const scoreA = isRankedPerson(a) ? a.ScoringResult.score : 0;
					const scoreB = isRankedPerson(b) ? b.ScoringResult.score : 0;
					comparison = scoreA - scoreB;
					break;
				}
				case "person": {
					comparison = a.name.localeCompare(b.name);
					break;
				}
				case "skills": {
					const skillsA = a.topSkills[0].name || "";
					const skillsB = b.topSkills[0].name || "";
					comparison = skillsA.localeCompare(skillsB);
					break;
				}
				case "isAvailable": {
					comparison = Number(a.isAvailable) - Number(b.isAvailable);
					break;
				}
				// case "hasAccount": {
				// 	comparison = Number(a.hasAccount) - Number(b.hasAccount);
				// // 	break;
				// }
				// case "timeRemaining": {
				// 	const timeA = a.timeRemaining || 0;
				// 	const timeB = b.timeRemaining || 0;
				// 	comparison = timeA - timeB;
				// 	break;
				// }
				// case "xp": {
				// 	comparison = a.xp - b.xp;
				// 	break;
				// }
			}

			// Reverse if descending
			return sortDirection === "asc" ? comparison : -comparison;
		});

		return filtered;
	}, [people, searchTerm, sortField, sortDirection]);

	// Toggle sort direction or change sort field
	const handleSort = (field: SortField) => {
		if (field === sortField) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("asc");
		}
	};

	// Format time remaining to hours and minutes
	// const formatTimeRemaining = (hours?: number) => {
	// 	if (hours === undefined) return "N/A";

	// 	const wholeHours = Math.floor(hours);
	// 	const minutes = Math.round((hours - wholeHours) * 60);

	// 	if (wholeHours === 0) {
	// 		return `${minutes}m`;
	// 	} else if (minutes === 0) {
	// 		return `${wholeHours}h`;
	// 	} else {
	// 		return `${wholeHours}h ${minutes}m`;
	// 	}
	// };

	return (
		<Card>
			<CardHeader>
				<CardTitle>People Directory</CardTitle>
				<div className="flex flex-col sm:flex-row gap-4 mt-4">
					<div className="flex-1">
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search by name, capability or skill..."
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
									{skillFilter?.requiredSkills.length ? `${skillFilter.requiredSkills.length} selected` : "Filters"}
									<Filter className="ml-2 h-4 w-4" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-56 p-0" align="end">
								<div className="p-2">
									<div className="space-y-2">
										{availableSkills.map((skill) => {
											const isSelected = skillFilter?.requiredSkills.includes(skill.id);
											return(
											<div key={skill.id} className="flex items-center">
												<Button
													variant={isSelected ? "default" : "ghost"}
													className="w-full justify-start"
													onClick={() =>
														setSkillFilter((prev) => ({
															...prev,
															requiredSkills: toggleId(prev.requiredSkills, skill.id)
														}))
													}
												>
													{skill.name}
												</Button>
											</div>
										)})}
										{skillFilter && (
											<Button
												variant="outline"
												className="w-full mt-2"
												onClick={() => setSkillFilter({requiredSkills: []})}
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
								<SelectItem value="person">Person</SelectItem>
								<SelectItem value="skills">Top Skills</SelectItem>
								<SelectItem value="isAvailable">Is Available</SelectItem>
								<SelectItem value="reportsTo">Reports To</SelectItem>
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
				{isLoading ? (
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
											onClick={() => handleSort("person")}
										>
											Person{" "}
											{sortField === "person" &&
												(sortDirection === "asc" ? "↑" : "↓")}
										</TableHead>
										<TableHead
											className="cursor-pointer"
											onClick={() => handleSort("skills")}
										>
											Top Skills{" "}
											{sortField === "skills" &&
												(sortDirection === "asc" ? "↑" : "↓")}
										</TableHead>
										<TableHead
											className="cursor-pointer"
											onClick={() => handleSort("isAvailable")}
										>
											Availability{" "}
											{sortField === "isAvailable" &&
												(sortDirection === "asc" ? "↑" : "↓")}
										</TableHead>
										<TableHead
											className="cursor-pointer"
											onClick={() => handleSort("reportsTo")}
										>
											Reports To{" "}
											{sortField === "reportsTo" &&
												(sortDirection === "asc" ? "↑" : "↓")}
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredAndSortedPeople.length === 0 && skillFilter.requiredSkills.length === 0 ? (
										<TableRow>
											<TableCell colSpan={5} className="text-center py-8">
												{skillFilter.requiredSkills.length === 0 ? (
													<>No people found matching your search criteria.</>
												) : (
													<>
														No people found with the skills:{" "}
														<strong>{skillFilter.requiredSkills}</strong>
													</>
												)}
											</TableCell>
										</TableRow>
									) : (
										filteredAndSortedPeople.map((person) => (
											<TableRow key={person.id}>
												<TableCell className="align-middle">
													<div className="inline-flex items-center gap-3">
														<Avatar className="h-10 w-10">
															<AvatarImage
																src={person.image}
																className="rounded-full size-10"
															/>
														</Avatar>
														<div className="flex flex-col">
															<a className="font-semibold text-xl">
																{person.name}
															</a>
															<a>{person.role.title}</a>
															<div className="inline-flex items-center">
																<MapPin className="size-3.5 mr-1" />
																<a>{person.location.name}</a>
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>
													{person.topSkills.slice(0, 3).map((skill) => (
														<div className="justify-between font-light my-1.5" key={skill.id}>
															<span className="bg-gray-100 rounded-xl p-0.5">
																<a className="px-1 mr-1">{skill.name}</a>
																<a className="bg-gray-200 rounded-xl px-1">
																	{skill.proficiency}
																</a>
															</span>
														</div>
													)) || "—"}
													<a className="bg-gray-300 rounded-lg py-1 px-1.5">
														+{person.totalSkills - 3}
													</a>
												</TableCell>
												<TableCell>
													{person.isAvailable ? (
														<Badge
															variant="success"
															className="bg-green-100 text-green-800 flex items-center w-fit"
														>
															<CheckCircle className="h-4 w-4 mr-1" /> Yes
														</Badge>
													) : (
														<Badge
															variant="destructive"
															className="bg-red-100 text-red-800 flex items-center w-fit"
														>
															<XCircle className="h-4 w-4 mr-1" /> No
														</Badge>
													)}
												</TableCell>
												<TableCell className="align-middle">
													<div className="inline-flex items-center gap-3">
														<Avatar className="h-10 w-10">
															<AvatarImage
																src={person.reportsTo.image}
																className="rounded-full size-10"
															/>
														</Avatar>
														<div className="flex flex-col">
															<a className="font-semibold text-xl">
																{person.reportsTo.name}
															</a>
															<a>{person.reportsTo.role.title}</a>
															<div className="inline-flex items-center">
																<MapPin className="size-3.5 mr-1" />
																<a>{person.reportsTo.location.name}</a>
															</div>
														</div>
													</div>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
						<div className="mt-4 text-sm text-gray-500">
							Showing {filteredAndSortedPeople.length} of {initialPeople.length}{" "}
							people
							{skillFilter && (
								<span>
									{" "}
									filtered by skills: <strong>{skillFilter.requiredSkills}</strong>
								</span>
							)}
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}
