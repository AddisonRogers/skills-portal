"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
	getSkillForUserEmail,
	setSkillProgressionForUserEmail,
} from "@/db/repositories/skills";

export async function changeSkillProgression(skillId: string, value: number) {
	const session = await auth.api.getSession({
		headers: await headers(), // some endpoint might require headers
	});

	const userEmail = session?.user?.email;
	if (!userEmail) {
		console.debug("No user email");
		return;
	}

	setSkillProgressionForUserEmail(skillId, userEmail, value);
}

export async function getSkillProgression(skillId: string) {
	const session = await auth.api.getSession({
		headers: await headers(), // some endpoint might require headers
	});

	const userEmail = session?.user?.email;
	if (!userEmail) {
		return null;
	}

	return getSkillForUserEmail(skillId, userEmail);
}

// TODO calculate xp here