"use server";

import { getRoadmapCertifications } from "@/db/repositories/certifications";
import { getUserByEmail } from "@/db/repositories/users";

export async function getAllCertifications(userEmail: string | null) {
    const user = await getUserByEmail(userEmail);
    const rawRoadmapSkills = await getRoadmapCertifications(user.id);

    return Map.groupBy(rawRoadmapSkills, (skill) => skill.roadmapId);
}