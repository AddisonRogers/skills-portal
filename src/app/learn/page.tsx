import SuggestedRoadmapsSection from "@/app/learn/SuggestedRoadmapsSection";
import AllRoadmapsSection from "@/app/learn/AllRoadmapsSection";
import {
    getAllRoadmaps,
} from "@/db/repositories/roadmap";
import {fetchUserAndGetSuggestedRoadmaps} from "@/app/learn/serverFunctions.ts";
import {getAllCapabilities} from "@/db/repositories/capabilities";
import {Suspense} from "react";

export default async function LearnPage() {
    // if (!(await isSignedIn)) {
    // 	// TODO redirect to the login page
    // }

    const suggestedRoadmaps = fetchUserAndGetSuggestedRoadmaps();
    const allRoadmapsData = getAllRoadmaps();
    const capabilities = getAllCapabilities();

    // TODO map all the things to capabilities and such so that it appears correctly

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-medium text-fsp-core-teal mb-8">Learn</h1>

            {/* Continue Learning Section */}
            {/*<ContinueLearningSection currentRoadmap={currentRoadmap} />*/}

            {/* Suggested Roadmaps Section */}

            <Suspense fallback={<div>Loading suggested roadmaps...</div>}>
                <SuggestedRoadmapsSectionWrapper suggestedRoadmapsPromise={suggestedRoadmaps}/>
            </Suspense>

            <Suspense fallback={<div>Loading roadmaps...</div>}>
                <AllRoadmapsSection
                    allRoadmapsData={allRoadmapsData}
                    allCapabilitiesData={capabilities}
                />
            </Suspense>
        </main>
    );
}

async function SuggestedRoadmapsSectionWrapper({suggestedRoadmapsPromise}: {
    suggestedRoadmapsPromise: Promise<any[]>
}) {
    const suggestedRoadmaps = await suggestedRoadmapsPromise;

    if (!suggestedRoadmaps?.length) {
        return null;
    }

    return <SuggestedRoadmapsSection suggestedRoadmaps={suggestedRoadmaps}/>;
}