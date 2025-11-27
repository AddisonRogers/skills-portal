import SuggestedRoadmapsSection from "@/app/learn/SuggestedRoadmapsSection";
import AllRoadmapsSection from "@/app/learn/AllRoadmapsSection";
import {
	getAllRoadmaps,
	getSuggestedRoadmaps,
} from "@/db/repositories/roadmap";
import { getAllCapabilities } from "@/db/repositories/capabilities";
import { isSignedIn, useSession } from "@/lib/auth-client";

export default async function LearnPage() {
	if (!(await isSignedIn)) {
		// TODO redirect to the login page
	}

	const suggestedRoadmaps = getSuggestedRoadmaps(userEmail);
	const allRoadmapsData = getAllRoadmaps();
	const capabilities = getAllCapabilities();

	// TODO map all the things to capabilities and such so that it appears correctly

	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-medium text-fsp-core-teal mb-8">Learn</h1>

			{/* Continue Learning Section */}
			{/*<ContinueLearningSection currentRoadmap={currentRoadmap} />*/}

			{/* Suggested Roadmaps Section */}
			{suggestedRoadmaps && suggestedRoadmaps.length > 0 && (
				<SuggestedRoadmapsSection suggestedRoadmaps={suggestedRoadmaps} />
			)}

			<AllRoadmapsSection
				allRoadmapsData={allRoadmapsData}
				allCapabilitiesData={capabilities}
			/>
		</main>
	);
}
