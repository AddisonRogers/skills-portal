import RoadmapCard from "@/components/roadmapCard";
import {Roadmap} from "@/types/Roadmap";

export default function SuggestedRoadmapsSection({
	suggestedRoadmaps,
}: {
	suggestedRoadmaps: any;
}) {
	return (
		<section className="mb-12">
			<h2 className="text-xl font-normal mb-4">Suggested Roadmaps</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{suggestedRoadmaps.slice(0, 3).map((roadmap: Roadmap) => (
					<RoadmapCard key={roadmap.id} {...roadmap} />
				))}
			</div>
		</section>
	);
}
