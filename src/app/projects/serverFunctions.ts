"use server";

import { upsertUserProjectWithSkillsDb } from "@/db/repositories/projects";
import getAllSkills from "@/lib/services/skills/getAllSkills";
import { getServerUser } from "@/lib/get-server-user";
import getAllProjectRoles from "@/lib/services/projectRoles/getAllProjectRoles";

export async function upsertUserProjectWithSkills(
	projectId: number,
	roleId: number,
	skillIds: number[],
) {
	const user = await getServerUser();
	if (!user) {
		throw new Error("User not authenticated");
	}
	const userId = user.id;
	return await upsertUserProjectWithSkillsDb(
		userId,
		projectId,
		roleId,
		skillIds,
	);
}

export async function getFormOptions() {
	const projectRoles = await getAllProjectRoles();
	const skills = await getAllSkills();

	return {
		projectRoles,
		skills,
	};
}
