import { getAllSkills } from "./serverFunctions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { SearchParams } from "nuqs";
import { SkillsSearchBar } from "@/app/skills/SkillsSearchBar.tsx";
import { RoadmapFilter } from "@/app/skills/RoadmapFilter.tsx";
import { SkillsGrid } from "@/app/skills/skillsGrid.tsx";

type PageProps = {
	searchParams: Promise<SearchParams>;
};

export default async function SkillsPage({ searchParams }: PageProps) {
	// Fetch all roadmaps with their skills
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const isLoggedIn = !!session;
	const roadmapsWithSkills = await getAllSkills(session?.user?.id || null);

	const allRoadmaps = Array.from(roadmapsWithSkills.keys());
	const allSkills = Array.from(roadmapsWithSkills.values()).flat();

	// TODO add skeleton
	// TODO add search bar
	// TODO add "all skills" by default then allowing to filter by roadmap
	// TODO add grid vs list view
	// TODO standardise titles of pages
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Skills Portal</h1>

			{roadmapsWithSkills.size === 0 ? (
				<div className="text-center py-12">
					<p className="text-lg text-muted-foreground">No skills available.</p>
				</div>
			) : (
				<div>
					{/* Search and Filter Bar */}
					<div className="flex flex-col gap-4 md:flex-row md:items-end mb-8">
						<SkillsSearchBar />
						<RoadmapFilter roadmaps={allRoadmaps} />
					</div>

					{/* Skills Grid */}
					<SkillsGrid
						allSkills={allSkills}
						roadmapsWithSkills={roadmapsWithSkills}
						isLoggedIn={isLoggedIn}
					/>
				</div>
			)}
		</div>
	);
}
