import RoadmapCard from "@/components/roadmapCard";

export default function SuggestedRoadmapsSection( {suggestedRoadmaps}: { suggestedRoadmaps: any } ) {

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Suggested Roadmaps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestedRoadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </div>
    </section>
  )
}