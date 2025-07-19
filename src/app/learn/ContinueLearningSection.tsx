import { Button } from "@/components/ui/button";
import RoadmapCard from "@/components/roadmapCard";
import { Roadmap } from "@/types/Roadmap";

export default function ContinueLearningSection({
	currentRoadmap,
}: {
	currentRoadmap: Roadmap;
}) {
	console.debug("currentRoadmap: ", currentRoadmap);

	return (
		<section className="mb-12">
			<h2 className="text-xl font-normal mb-4">Continue Learning</h2>
			<div>
				<RoadmapCard {...currentRoadmap} />
			</div>
		</section>
	);
}
