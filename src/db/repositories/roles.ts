"use server";
// Need a drizzle repo where

import { and, eq } from "drizzle-orm";
import { accessRole, user, jobRole, userRoles as user_roles } from "@/db/schema";
import { db } from "@/lib/db";

export async function getRoles(userEmail: string) {
	return db
		.select({
			name: accessRole.name,
		})
		.from(user)
		.innerJoin(user_roles, eq(user.id, user_roles.userId))
		.innerJoin(accessRole, eq(user_roles.roleId, accessRole.id))
		.where(eq(user.email, userEmail));
}

export async function isAdmin(userEmail: string): Promise<boolean> {
	const response = userHasRole(userEmail, "admin");

	const data = await response;
	return data;
}

export async function userHasRole(
	userEmail: string,
	roleName: string,
): Promise<boolean> {
	const data = await db
		.select()
		.from(user)
		.innerJoin(user_roles, eq(user.id, user_roles.userId))
		.innerJoin(accessRole, eq(user_roles.roleId, accessRole.id))
		.where(and(eq(user.email, userEmail), eq(accessRole.name, roleName)))
		.limit(1);

	return data.length > 0;
}

export async function getRolesForUser(userEmail: string) {
	const data = await db
		.select({
			name: accessRole.name,
		})
		.from(user)
		.innerJoin(user_roles, eq(user.id, user_roles.userId))
		.innerJoin(accessRole, eq(user_roles.roleId, accessRole.id))
		.where(and(eq(user.email, userEmail)));

	return data;
}




export async function addRoleToSomeone(
	userEmail: string,
	roleName: string,
): Promise<void> {
	const foundUser = await db
		.select({
			id: user.id,
		})
		.from(user)
		.where(eq(user.email, userEmail))
		.limit(1);

	const foundRole = await db
		.select({
			id: accessRole.id,
		})
		.from(accessRole)
		.where(eq(accessRole.name, roleName))
		.limit(1);

	const result = await db.insert(user_roles).values({
		userId: foundUser[0].id,
		roleId: foundRole[0].id,
	});

	console.debug(result);
}

export async function removeRoleFromSomeone(
	userEmail: string,
	roleName: string,
): Promise<void> {
	const foundUser = await db
		.select({
			id: user.id,
		})
		.from(user)
		.where(eq(user.email, userEmail))
		.limit(1);

	const foundRole = await db
		.select({
			id: accessRole.id,
		})
		.from(accessRole)
		.where(eq(accessRole.name, roleName))
		.limit(1);

	const result = await db
		.delete(user_roles)
		.where(
			and(
				eq(user_roles.userId, foundUser[0].id),
				eq(user_roles.roleId, foundRole[0].id),
			),
		);

	console.debug(result);
}

export async function addRole(
	roleName: string,
	roleDescription: string,
): Promise<void> {
	const result = await db.insert(accessRole).values({
		name: roleName,
		description: roleDescription,
	});
}

export async function removeRole(roleName: string): Promise<void> {
	const result = await db
		.delete(accessRole)
		.where(eq(accessRole.name, roleName));
}

// TODO fix ??
export async function updateRole(
	roleName: string,
	roleDescription: string,
): Promise<void> {
	const result = await db.update(accessRole).set({
		name: roleName,
		description: roleDescription,
	});
}

export async function getJobTitleForUser(email: string) {
	const data = await db
		.select({
			jobTitle: jobRole.title,
		})
		.from(user)
		.innerJoin(jobRole, eq(user.jobRoleId, jobRole.id))
		.where(eq(user.email, email))
		.limit(1);

	return data[0]?.jobTitle ?? null;
}

