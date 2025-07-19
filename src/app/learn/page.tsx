import {
	getCurrentLearningRoadmap,
	getSuggestedRoadmaps,
	getAllRoadmaps,
	getAllCapabilities,
} from "./serverFunctions";
import ContinueLearningSection from "@/app/learn/ContinueLearningSection";
import SuggestedRoadmapsSection from "@/app/learn/SuggestedRoadmapsSection";
import AllRoadmapsSection from "@/app/learn/AllRoadmapsSection";

export default async function LearnPage() {
	const currentRoadmap = await getCurrentLearningRoadmap();
	const suggestedRoadmaps = await getSuggestedRoadmaps();
	const allRoadmapsData = await getAllRoadmaps();
	const capabilities = await getAllCapabilities();


	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-medium text-fsp-core-teal mb-8">Learn</h1>

			{/* Continue Learning Section */}
			<ContinueLearningSection currentRoadmap={currentRoadmap} />

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
