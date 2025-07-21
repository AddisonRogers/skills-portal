"use server";

import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
	capabilities,
	capabilityRoadmap,
	roadmap,
	user,
	capabilityUser,
} from "@/db/schema";
import { Capability } from "@/types/Capability";

// Get ALL capabilities
export async function getAllCapabilities(): Promise<Capability[]> {
	return db
		.select({
			name: capabilities.name,
		})
		.from(capabilities);
}

// Get capabilities for a given roadmap
export async function getCapabilitiesForRoadmap(roadmapId: string) {
	return db
		.select({
			id: capabilities.id,
			name: capabilities.name,
			description: capabilities.description,
		})
		.from(capabilities)
		.innerJoin(
			capabilityRoadmap,
			eq(capabilities.id, capabilityRoadmap.capabilityId),
		)
		.where(eq(capabilityRoadmap.roadmapId, roadmapId));
}

// Get all roadmaps for a capability
export async function getRoadmapsForCapability(capabilityId: number) {
	return db
		.select({
			id: roadmap.id,
			title: roadmap.name,
			description: roadmap.description,
		})
		.from(roadmap)
		.innerJoin(capabilityRoadmap, eq(roadmap.id, capabilityRoadmap.roadmapId))
		.where(eq(capabilityRoadmap.capabilityId, capabilityId));
}

// Get all capabilities for a user
export async function getCapabilitiesForUser(userId: string) {
	return db
		.select({
			id: capabilities.id,
			name: capabilities.name,
			description: capabilities.description,
		})
		.from(capabilities)
		.innerJoin(capabilityUser, eq(capabilities.id, capabilityUser.capabilityId))
		.where(eq(capabilityUser.userId, userId));
}

// Attach a capability to a user
export async function addCapabilityForUser(
	userId: string,
	capabilityId: number,
) {
	return db.insert(capabilityUser).values({
		userId,
		capabilityId,
	});
}

// Remove a capability from a user
export async function removeCapabilityForUser(
	userId: string,
	capabilityId: number,
) {
	return db
		.delete(capabilityUser)
		.where(
			and(
				eq(capabilityUser.userId, userId),
				eq(capabilityUser.capabilityId, capabilityId),
			),
		);
}

// Add a new capability
export async function addCapability(
	capabilityName: string,
	capabilityDescription: string,
) {
	return db.insert(capabilities).values({
		name: capabilityName,
		description: capabilityDescription,
	});
}

// Remove a capability by name
export async function removeCapability(capabilityName: string) {
	return db.delete(capabilities).where(eq(capabilities.name, capabilityName));
}

// Update an existing capability's description (and optionally the name)
export async function updateCapability(
	capabilityName: string,
	capabilityDescription: string,
) {
	return db
		.update(capabilities)
		.set({
			description: capabilityDescription,
		})
		.where(eq(capabilities.name, capabilityName));
}

// Add a roadmap to a capability
export async function addRoadmapForCapability(
	capabilityId: number,
	roadmapId: string,
) {
	return db.insert(capabilityRoadmap).values({
		capabilityId,
		roadmapId,
	});
}

// Remove a roadmap from a capability
export async function removeRoadmapForCapability(
	capabilityId: number,
	roadmapId: string,
) {
	return db
		.delete(capabilityRoadmap)
		.where(
			and(
				eq(capabilityRoadmap.capabilityId, capabilityId),
				eq(capabilityRoadmap.roadmapId, roadmapId),
			),
		);
}

export async function getUsersForCapability(capabilityId: number) {
	return db
		.select({
			id: user.id,
			name: user.name,
			email: user.email,
		})
		.from(user)
		.innerJoin(capabilityUser, eq(user.id, capabilityUser.userId))
		.where(eq(capabilityUser.capabilityId, capabilityId));
}
