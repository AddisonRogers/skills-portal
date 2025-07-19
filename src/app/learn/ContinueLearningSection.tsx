import {Button} from "@/components/ui/button";
import RoadmapCard from "@/components/roadmapCard";
import {Roadmap} from "@/types/Roadmap";

export default function ContinueLearningSection({
                                                  currentRoadmap,
                                                }: {
  currentRoadmap: Roadmap;
}) {
  const generateAvatarUrl = (index: number) => {
    return `https://i.pravatar.cc/40?img=${index}`;
  };

  console.debug(currentRoadmap);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-normal mb-4">Continue Learning</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <RoadmapCard roadmap={currentRoadmap} />
        <div className="mt-4">
          <Button>Continue</Button>
        </div>
      </div>
    </section>
  );
}
