"use server";

import { eq } from "drizzle-orm";
import { user } from "@/db/schema";
import { db } from "@/lib/db";

// Get a user by email
export async function getUserByEmail(email: string) {
	return db.select().from(user).where(eq(user.email, email)).limit(1);
}

// Get a user by id
export async function getUserById(id: string) {
	return db.select().from(user).where(eq(user.id, id)).limit(1);
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
