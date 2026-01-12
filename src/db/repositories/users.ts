"use server";

import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import {
	capabilities,
	capabilityUser,
	skill,
	user,
	userSkill,
	location,
	jobRole,
} from "@/db/schema";
import { db } from "@/lib/db";
import { markAsUntransferable } from "worker_threads";

// Get a user by email
export async function getUserByEmail(email: string) {
	return db.select().from(user).where(eq(user.email, email)).limit(1);
}

// Get a user by id
export async function getUserById(id: string) {
	return db.select().from(user).where(eq(user.id, id)).limit(1);
}

// Get all users with their capability and skills
export async function getUsers() {
	const manager = alias(user, "manager");
	const managerJobRole = alias(jobRole, "manager_job_role");
	const managerLocation = alias(location, "manager_location");
	return db
		.select({
			userId: user.id,
			userName: user.name,
			userImage: user.image,
			jobRoleId: jobRole.id,
			jobRoleTitle: jobRole.title,
			locationId: location.id,
			locationName: location.name,
			managerId: manager.id,
			managerName: manager.name,
			managerImage: manager.image,
			managerJobRoleId: managerJobRole.id,
			managerJobRoleTitle: managerJobRole.title,
			managerLocationId: managerLocation.id,
			managerLocationName: managerLocation.name,
			capabilityId: capabilities.id,
			capabilityName: capabilities.name,
			skillId: skill.id,
			skillName: skill.name,
			skillLevel: userSkill.level,
		})
		.from(user)
		.leftJoin(jobRole, eq(user.jobRoleId, jobRole.id))
		.leftJoin(location, eq(user.locationId, location.id))
		.leftJoin(manager, eq(user.reportsToUserId, manager.id))
		.leftJoin(managerJobRole, eq(manager.jobRoleId, managerJobRole.id))
		.leftJoin(managerLocation, eq(manager.locationId, managerLocation.id))
		.leftJoin(capabilityUser, eq(capabilityUser.userId, user.id))
		.leftJoin(capabilities, eq(capabilities.id, capabilityUser.capabilityId))
		.leftJoin(userSkill, eq(userSkill.userId, user.id))
		.leftJoin(skill, eq(skill.id, userSkill.skillId));
}

// Get a user by capability
export async function getUsersByCapabilityDB(capabilityId: number) {
	return db
		.select()
		.from(user)
		.innerJoin(capabilityUser, eq(capabilityUser.userId, user.id))
		.where(eq(capabilityUser.capabilityId, capabilityId));
}

// Create a new user
export async function test_use_createUser({
	id,
	name,
	email,
	emailVerified = false,
	image,
}: {
	id: string;
	name: string;
	email: string;
	emailVerified?: boolean;
	image?: string | null;
}) {
	return db.insert(user).values({
		id,
		name,
		email,
		emailVerified,
		image,
	});
}

// Update a user's info
export async function updateUser(
	id: string,
	data: Partial<{
		name: string;
		email: string;
		emailVerified: boolean;
		image: string | null;
		updatedAt: Date;
	}>,
) {
	return db
		.update(user)
		.set({
			...data,
			updatedAt: new Date(),
		})
		.where(eq(user.id, id));
}

// Delete a user by id
export async function deleteUser(id: string) {
	return db.delete(user).where(eq(user.id, id));
}

// List all users (optional: with a limit)
export async function listUsers(limit = 50) {
	return db.select().from(user).limit(limit);
}

export async function listUserEmails() {
	return db
		.select({
			id: user.id,
			email: user.email,
		})
		.from(user);
}
