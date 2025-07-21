import SuggestedRoadmapsSection from "@/app/learn/SuggestedRoadmapsSection";
import AllRoadmapsSection from "@/app/learn/AllRoadmapsSection";
import {
	getAllRoadmaps,
	getSuggestedRoadmaps,
} from "@/db/repositories/roadmap";
import { getAllCapabilities } from "@/db/repositories/capabilities";
import { isSignedIn, useSession } from "@/lib/auth-client";
import * as dummyRoadmaps from "@/dummyData/roadmaps.json";
import { AZRoadmapData, Roadmap } from "@/types/Roadmap";

export default async function LearnPage() {
	if (!(await isSignedIn)) {
		// TODO redirect to the login page
	}

	const { data } = useSession();
	const userEmail = data!.user!.email;

	let suggestedRoadmaps = null;
	let allRoadmapsData = null;
	let capabilities = null;

	try {
		suggestedRoadmaps = await getSuggestedRoadmaps(userEmail);
		allRoadmapsData = await getAllRoadmaps();
		capabilities = await getAllCapabilities();
	} catch (error) {
		console.debug(error);
		console.debug("Failed to get item will be using local data instead.");
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-medium text-fsp-core-teal mb-8">Learn</h1>

			{/* Continue Learning Section */}
			{/*<ContinueLearningSection currentRoadmap={currentRoadmap} />*/}

			{/* Suggested Roadmaps Section */}
			{suggestedRoadmaps.length > 0 && (
				<SuggestedRoadmapsSection suggestedRoadmaps={suggestedRoadmaps} />
			)}

			<AllRoadmapsSection
				allRoadmapsData={allRoadmapsData}
				allCapabilities={capabilities}
			/>
		</main>
	);
}
