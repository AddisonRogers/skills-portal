import SuggestedRoadmapsSection from "@/app/learn/SuggestedRoadmapsSection";
import AllRoadmapsSection from "@/app/learn/AllRoadmapsSection";
import {getAllRoadmaps, getSuggestedRoadmaps} from "@/db/repositories/roadmap";
import {getAllCapabilities} from "@/db/repositories/capabilities";

export default async function LearnPage() {
	const suggestedRoadmaps = await getSuggestedRoadmaps();
	const allRoadmapsData = await getAllRoadmaps();
	const capabilities = await getAllCapabilities();

	// TODO if they are null replace with dummy data

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
