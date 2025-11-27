"use server";
//
// // TODO id checks the last roadmap clicked on ?? no idea how to do this properly probably a bit in data
// // export async function getCurrentLearningRoadmap() {
// //
// // }
//
import { auth } from "@/lib/auth.ts";
import { headers } from "next/headers";
import { getSuggestedRoadmaps } from "@/db/repositories/roadmap.ts";

export async function fetchUserAndGetSuggestedRoadmaps() {
	const session = await auth.api.getSession({
		headers: await headers(), // some endpoints might require headers
	});

	const userEmail = session?.user?.email;

	if (
		!userEmail ||
		userEmail === "" ||
		userEmail === null ||
		userEmail === undefined
	) {
		return [];
	}

	return getSuggestedRoadmaps(userEmail!);
}

//
// import { getAllRoadmaps } from "@/db/repositories/roadmap";
//
// // export async function getAllRoadmaps() {
// //   return getAllRoadmaps
// // }
//
// // export async function getAllCapabilities() {
// //   return getAllCapabilities()
// // }
//
// // export async function getSkillsForRoadmap(userId: string, roadmapId: string) {
// //   return getSkillsForRoadmap(userId, roadmapId)
// // }
