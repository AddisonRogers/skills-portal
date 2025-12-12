"use server";

import { and, eq } from "drizzle-orm";
import { roadmap, certification, certificationRoadmap, user, userCertification } from "@/db/schema";
import { db } from "@/lib/db";
import { PGCertificationData, PGCertificationDataUser, CertificationNode } from "@/types/Roadmap";
import { getUserByEmail } from "@/db/repositories/users";

export async function getAllSkills() {
	try {
		return db
			.select({
				id: certification.id,
				name: certification.name,
				issuer: certification.issuer,
				machineName: certification.machineName,
				bigSkill: certification.bigSkill,
				xpAmount: certification.xpAmount,
				description: certification.description,
				blobUrl: certification.blobUrl,
				madeBy: certification.madeBy,
				createdAt: certification.createdAt,
				updatedAt: certification.updatedAt,
			})
			.from(certification);
	} catch (e) {
		console.error(e);
	}
}

// Only possible with the positions table
export async function getCerForRoadmap(
	roadmapId: string,
): Promise<Map<string, CertificationNode>> {
	const data: PGCertificationData[] = await db
		.select({
			name: certification.name,
			description: certification.description,
			blobUrl: certification.blobUrl,
		})
		.from(certification)
		.innerJoin(certificationRoadmap, eq(certification.id, certificationRoadmap.certificationId))
		.innerJoin(roadmap, eq(certificationRoadmap.roadmapId, roadmap.id))
		.where(eq(roadmap.id, roadmapId));

	return new Map(
		data.map((certification) => [
			certification.name,
			{
				...certification,
				nodeType: "certification",
				x: 0,
				y: 0,
			} as CertificationNode,
		]),
	);
}

export async function getCertificationsForRoadmapForUser(
	roadmapId: string,
	userEmail: string,
): Promise<Map<string, CertificationNode>> {
	const userData = await db
		.select({ id: user.id })
		.from(user)
		.where(eq(user.email, userEmail))
		.limit(1);

	if (userData.length === 0) {
		throw new Error("User not found");
	}

	const userId = userData[0].id;

	// Then get all skills for the roadmap with optional user skill data
	const data: PGCertificationDataUser[] = await db
		.select({
			name: certification.name,
			description: certification.description,
			blobUrl: certification.blobUrl,
			acquiredAt: userCertification.acquiredAt,
			level: userCertification.level,
		})
		.from(certification)
		.innerJoin(certificationRoadmap, eq(certification.id, certificationRoadmap.certificationId))
		.innerJoin(roadmap, eq(certificationRoadmap.roadmapId, roadmap.id))
		.leftJoin(
			userCertification,
			and(eq(certification.id, userCertification.certificationId), eq(userCertification.userId, userId)),
		)
		.where(eq(roadmap.id, roadmapId));

	console.debug(`we got: ${data.length} certifications`);
	return new Map(
		data.map((certification) => [
			certification.name,
			{
				...certification,
				nodeType: "certification",
				x: 0,
				y: 0,
				// Set defaults for users who haven't acquired the skill
				level: certification.level ?? 0,
				acquiredAt: certification.acquiredAt ?? null,
			} as CertificationNode,
		]),
	);
}

// Helper function to convert certification name to slug (same as in the certifications page)
function certificationNameToSlug(name: string) {
	return name.toLowerCase().replace(/\s+/g, "-");
}

export async function getCertification(certificationIdentifier: string) {
	try {
		// First try to find by machine name
		const certificationsByMachineName = await db
			.select({
				name: certification.name,
				description: certification.description,
				blobUrl: certification.blobUrl,
				madeBy: certification.madeBy,
			})
			.from(certification)
			.where(eq(certification.machineName, certificationIdentifier));

		// If found, return the result
		if (certificationsByMachineName && certificationsByMachineName.length > 0) {
			return certificationsByMachineName;
		}

		// If not found by machine name, get all certifications and find by slug
		const allCertifications = await db
			.select({
				name: certification.name,
				description: certification.description,
				blobUrl: certification.blobUrl,
				madeBy: certification.madeBy,
			})
			.from(certification);

		// Find the certification where the slug matches the identifier
		const matchingCertification = allCertifications.find(
			(s) => certificationNameToSlug(s.name) === certificationIdentifier,
		);

		return matchingCertification ? [matchingCertification] : null;
	} catch (error) {
		console.error("Error fetching skill:", error);
		return null;
	}
}

export async function getRoadmapCertifications(userId: string | null) {
	if (userId) {
		return db
			.select({
				id: certification.id,
				name: certification.name,
				description: certification.description,
				madeBy: certification.madeBy,
				roadmapId: certificationRoadmap.roadmapId,
				roadmapName: roadmap.name, // Add this
				acquiredAt: userCertification.acquiredAt,
				level: userCertification.level,
			})
			.from(certification)
			.innerJoin(userCertification, eq(certification.id, userCertification.certificationId))
			.innerJoin(certificationRoadmap, eq(certification.id, certificationRoadmap.certificationId))
			.innerJoin(roadmap, eq(certificationRoadmap.roadmapId, roadmap.id))
			.where(eq(userCertification.userId, userId))
			.orderBy(roadmap.name);
	}

	return db
		.select({
			id: certification.id,
			name: certification.name,
			description: certification.description,
			madeBy: certification.madeBy,
			roadmapId: certificationRoadmap.roadmapId,
			roadmapName: roadmap.name, // Add this
		})
		.from(certification)
		.innerJoin(certificationRoadmap, eq(certification.id, certificationRoadmap.certificationId))
		.innerJoin(roadmap, eq(certificationRoadmap.roadmapId, roadmap.id));
}

export type getCertificationForUserEmailResult = {
	id: number;
	name: string;
	description: string | null;
	madeBy: string | null;
	acquiredAt: Date | null;
	level: number | null;
};

export async function getCertificationForUserEmail(
	certificationIdentifier: string,
	userEmail: string,
): Promise<getCertificationForUserEmailResult | null> {
	try {
		const userData = await db
			.select({ id: user.id })
			.from(user)
			.where(eq(user.email, userEmail))
			.limit(1);

		const userId = userData[0].id;

		console.debug(`certificationIdentifier: ${certificationIdentifier}`);

		const machineNameCertification = certificationIdentifier
			.toLowerCase()
			.replace(/\s+/g, "-") // Replace spaces with dashes
			.replace(/[^a-zA-Z0-9\-]/g, ""); // Remove all except a-z, A-Z, 0-9, and dash

		const certificationData = await db
			.select({
				id: certification.id,
				name: certification.name,
				description: certification.description,
				madeBy: certification.madeBy,
			})
			.from(certification)
			.where(and(eq(certification.machineName, machineNameCertification)));

		const userCertificationData = await db
			.select({
				level: userCertification.level,
				acquiredAt: userCertification.acquiredAt,
			})
			.from(userCertification)
			.where(
				and(
					eq(userCertification.userId, userId),
					eq(userCertification.certificationId, certificationData[0].id),
				),
			)
			.limit(1);

		const result: getCertificationForUserEmailResult = {
			id: certificationData[0].id,
			name: certificationData[0].name,
			description: certificationData[0].description,
			madeBy: certificationData[0].madeBy,
			// Use data from userCertificationData if it exists, otherwise use defaults
			level: userCertificationData.length > 0 ? userCertificationData[0].level : 0,
			acquiredAt: userCertificationData.length > 0 ? userCertificationData[0].acquiredAt : null,
		};

		return result;
	} catch (error) {
		console.error("Error fetching certification:", error);
		return null;
	}
}

export async function setCertificationProgressionForUserEmail(
	certificationIdentifier: string,
	userEmail: string,
	level: number,
) {
	const certification = await getCertificationForUserEmail(certificationIdentifier, userEmail);
	if (!certification) return null;

	const user = await getUserByEmail(userEmail);
	console.debug(
		`line 234 setting certification ${certification.id} for user ${user[0].id} to ${level}`,
	);
	if (!user || !user[0]) return null;

	const certificationId = certification.id;
	console.debug(`setting certification ${certificationId} for user ${user[0].id} to ${level}`);

	return db
		.insert(userCertification)
		.values({
			userId: user[0].id,
			certificationId: certificationId,
			acquiredAt: new Date(),
			level,
		})
		.onConflictDoUpdate({
			target: [userCertification.userId, userCertification.certificationId],
			set: {
				acquiredAt: new Date(),
				level,
			},
		});
}
