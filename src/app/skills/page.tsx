import { getAllSkills } from "./serverFunctions";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Helper function to convert skill name to URL slug
function skillNameToSlug(name: string) {
	return name.toLowerCase().replace(/\s+/g, "-");
}

export default async function SkillsPage() {
	// Fetch all roadmaps with their skills
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const roadmapsWithSkills = await getAllSkills(session?.user?.email || null);

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Skills Portal</h1>

			{roadmapsWithSkills.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-lg text-muted-foreground">
						No roadmaps available.
					</p>
				</div>
			) : (
				<div className="grid gap-8">
					{Array.from(roadmapsWithSkills.entries()).map(
						([roadmapId, skills]) => (
							<Card key={roadmapId} className="overflow-hidden">
								<CardHeader className="bg-muted/50">
									<CardTitle>
										{skills[0]?.roadmapName || `Roadmap ${roadmapId}`}
									</CardTitle>
									{skills[0]?.roadmapDescription && (
										<CardDescription>
											{skills[0].roadmapDescription}
										</CardDescription>
									)}
								</CardHeader>
								<CardContent className="pt-6">
									{skills.length === 0 ? (
										<p className="text-muted-foreground text-sm">
											No skills available for this roadmap.
										</p>
									) : (
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
											{skills.map((skill) => (
												<Link
													key={skill.id}
													href={`/skills/${skill.machineName || skillNameToSlug(skill.name)}`}
													className="block"
												>
													<Card className="h-full hover:shadow-md transition-shadow relative">
														{skill.level && (
															<Badge
																variant="secondary"
																className="absolute top-2 right-2 z-10"
															>
																Level {skill.level}
															</Badge>
														)}
														<CardHeader className="pb-2">
															<CardTitle className="text-lg pr-16">
																{skill.name}
															</CardTitle>
															{skill.madeBy && (
																<Badge variant="outline" className="mt-1">
																	{skill.madeBy}
																</Badge>
															)}
														</CardHeader>
														<CardContent>
															{skill.description ? (
																<p className="text-sm text-muted-foreground line-clamp-3">
																	{skill.description}
																</p>
															) : (
																<p className="text-sm text-muted-foreground italic">
																	No description available
																</p>
															)}
														</CardContent>
													</Card>
												</Link>
											))}
										</div>
									)}
								</CardContent>
							</Card>
						),
					)}
				</div>
			)}
		</div>
	);
}
