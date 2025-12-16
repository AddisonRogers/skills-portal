"use server";

import { db } from "@/lib/db";
import { user, userSkill, skill } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getMemberDetails } from "@/lib/opshubClient";
import { getKards } from "@/lib/opshubClient";
import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables";
import { listUserEmails } from "@/db/repositories/users";

// Type definitions
export type PersonWithAccount = {
	id: string;
	name: string;
	email: string;
	team?: string;
	hasAccount: boolean;
	timeRemaining?: number; // in hours
	xp: number;
};

// Check if a person has an account in Postgres by email
export async function checkIfPersonHasAccount(email: string): Promise<boolean> {
	const users = await db
		.select({ id: user.id })
		.from(user)
		.where(eq(user.email, email))
		.limit(1);

	return users.length > 0;
}

// Calculate time remaining from kards for a person
export async function calculateTimeRemaining(
	personName: string,
): Promise<number> {
	try {
		// Get all kards assigned to the person
		const kardsData = await getKards({
			personName: personName,
			status: "In Progress", // Only consider in-progress kards
		});

		// Calculate time remaining (this will depend on the structure of kards data)
		// This is a simplified example - adjust based on actual kards structure
		let timeRemaining = 0;

		if (Array.isArray(kardsData)) {
			for (const kard of kardsData) {
				// Assuming kard has effort and percentComplete fields
				if (kard.effort && kard.percentComplete) {
					const remainingEffort =
						kard.effort * (1 - kard.percentComplete / 100);
					timeRemaining += remainingEffort;
				}
			}
		}

		return timeRemaining;
	} catch (error) {
		console.error("Error calculating time remaining:", error);
		return 0;
	}
}

// Calculate XP for a user from completed skills
export async function calculateUserXP(userId: string): Promise<number> {
	try {
		// Get all skills the user has completed
		const userSkills = await db
			.select({
				skillId: userSkill.skillId,
				xpAmount: skill.xpAmount,
			})
			.from(userSkill)
			.innerJoin(skill, eq(userSkill.skillId, skill.id))
			.where(eq(userSkill.userId, userId));

		// Sum up the XP amounts
		const totalXP = userSkills.reduce(
			(sum, item) => sum + (item.xpAmount || 0),
			0,
		);

		return totalXP;
	} catch (error) {
		console.error("Error calculating user XP:", error);
		return 0;
	}
}

// Cache XP calculations in Azure Cosmos Table
export async function cacheUserXP(userId: string, xp: number): Promise<void> {
	try {
		// Get environment variables for Azure Table Storage
		const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
		const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
		const tableName = process.env.AZURE_USER_XP_TABLE || "userxp";

		if (!accountName || !accountKey) {
			throw new Error("Azure Storage credentials not configured");
		}

		// Create table client
		const credential = new AzureNamedKeyCredential(accountName, accountKey);
		const tableClient = TableClient.fromNamedKeyCredential(
			`https://${accountName}.table.core.windows.net`,
			tableName,
			credential,
		);

		// Create or update entity
		await tableClient.upsertEntity({
			partitionKey: "userxp",
			rowKey: userId,
			xp: xp,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error caching user XP:", error);
	}
}

// Get cached XP for a user
export async function getCachedUserXP(userId: string): Promise<number | null> {
	try {
		// Get environment variables for Azure Table Storage
		const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
		const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
		const tableName = process.env.AZURE_USER_XP_TABLE || "userxp";

		if (!accountName || !accountKey) {
			throw new Error("Azure Storage credentials not configured");
		}

		// Create table client
		const credential = new AzureNamedKeyCredential(accountName, accountKey);
		const tableClient = TableClient.fromNamedKeyCredential(
			`https://${accountName}.table.core.windows.net`,
			tableName,
			credential,
		);

		// Get entity
		const entity = await tableClient.getEntity("userxp", userId);

		return entity.xp as number;
	} catch (error) {
		// If entity not found or other error, return null
		return null;
	}
}

// Get all people with account status, time remaining, and XP
export async function getAllPeopleWithDetails(): Promise<PersonWithAccount[]> {
	try {
		// Get all people from OpHub
		const peopleData = await getMemberDetails();

		if (!Array.isArray(peopleData)) {
			throw new Error("Invalid people data from OpHub");
		}

		// Get all users from Postgres for faster lookups
		const dbUsers = await listUserEmails();

		// Create a map of email to user ID for quick lookups
		const emailToUserIdMap = new Map<string, string>();
		for (const dbUser of dbUsers) {
			emailToUserIdMap.set(dbUser.email.toLowerCase(), dbUser.id);
		}

		// Process each person
		const peopleWithDetails: PersonWithAccount[] = [];

		for (const person of peopleData) {
			const email = person.email?.toLowerCase();
			const hasAccount = email ? emailToUserIdMap.has(email) : false;
			let xp = 0;

			// If the person has an account, calculate or get cached XP
			if (hasAccount && email) {
				const userId = emailToUserIdMap.get(email)!;

				// Try to get cached XP first
				const cachedXP = await getCachedUserXP(userId);

				if (cachedXP !== null) {
					xp = cachedXP;
				} else {
					// Calculate XP if not cached
					xp = await calculateUserXP(userId);

					// Cache the calculated XP
					await cacheUserXP(userId, xp);
				}
			}

			// Calculate time remaining
			const timeRemaining = await calculateTimeRemaining(person.name);

			peopleWithDetails.push({
				id: person.id,
				name: person.name,
				email: person.email || "",
				team: person.team,
				hasAccount,
				timeRemaining,
				xp,
			});
		}

		return peopleWithDetails;
	} catch (error) {
		console.error("Error getting people with details:", error);
		return [];
	}
}

// Search people by skill
export async function searchPeopleBySkill(
	skillName: string,
): Promise<PersonWithAccount[]> {
	try {
		// Get all people with details first
		const allPeople = await getAllPeopleWithDetails();

		// Get users who have the specified skill
		const usersWithSkill = await db
			.select({
				userId: userSkill.userId,
			})
			.from(userSkill)
			.innerJoin(skill, eq(userSkill.skillId, skill.id))
			.where(eq(skill.name, skillName));

		// Create a set of user IDs who have the skill
		const userIdsWithSkill = new Set(usersWithSkill.map((u) => u.userId));

		// Get all users to map IDs to emails
		const dbUsers = await db
			.select({
				id: user.id,
				email: user.email,
			})
			.from(user);

		// Create a map of user ID to email
		const userIdToEmailMap = new Map<string, string>();
		for (const dbUser of dbUsers) {
			userIdToEmailMap.set(dbUser.id, dbUser.email.toLowerCase());
		}

		// Filter people who have the skill
		return allPeople.filter((person) => {
			const email = person.email.toLowerCase();

			// Find if any user with this email has the skill
			for (const [userId, userEmail] of userIdToEmailMap.entries()) {
				if (userEmail === email && userIdsWithSkill.has(userId)) {
					return true;
				}
			}

			return false;
		});
	} catch (error) {
		console.error("Error searching people by skill:", error);
		return [];
	}
}
