import { and, eq } from "drizzle-orm";
import {
	user,
	project,
	client,
	jobRole,
	projectUser,
	projectUserSkill,
} from "@/db/schema";
import { db } from "@/lib/db";
import { alias } from "drizzle-orm/pg-core";

//Get all projects
export async function getProjects() {
	return db
		.select({
			projectId: project.id,
			projectName: project.name,
			projectDescription: project.description,
			projectStatus: project.status,

			userId: user.id,
			userName: user.name,
			userJobRoleId: user.jobRoleId,
			userJobRoleTitle: jobRole.title,

			clientId: client.id,
			clientName: client.name,
			clientDescription: client.description,
		})
		.from(project)
		.leftJoin(projectUser, eq(projectUser.projectId, project.id))
		.leftJoin(user, eq(user.id, projectUser.userId))
		.leftJoin(jobRole, eq(jobRole.id, user.jobRoleId))
		.leftJoin(client, eq(client.id, project.clientId));
}

//Get all projects for one user
export async function getUserProjectsDb(userId: string) {
	const userProjects = db
		.select({ projectId: projectUser.projectId })
		.from(projectUser)
		.where(eq(projectUser.userId, userId))
		.as("user_projects");

	const teamLink = alias(projectUser, "team_link");
	const teamUser = alias(user, "team_user");
	const teamJobRole = alias(jobRole, "team_job_role");

	return db
		.select({
			projectId: project.id,
			projectName: project.name,
			projectDescription: project.description,
			projectStatus: project.status,

			userId: teamUser.id,
			userName: teamUser.name,
			userJobRoleId: teamUser.jobRoleId,
			userJobRoleTitle: teamJobRole.title,

			clientId: client.id,
			clientName: client.name,
			clientDescription: client.description,
		})
		.from(userProjects)
		.innerJoin(project, eq(project.id, userProjects.projectId))
		.leftJoin(client, eq(project.clientId, client.id))
		.innerJoin(teamLink, eq(teamLink.projectId, project.id))
		.innerJoin(teamUser, eq(teamUser.id, teamLink.userId))
		.leftJoin(teamJobRole, eq(teamJobRole.id, teamUser.jobRoleId));
}

//Upsert User Project with Skills
export async function upsertUserProjectWithSkillsDb(
	userId: string,
	projectId: number,
	roleId: number,
	skillIds: number[],
) {
	const uniqueSkillIds = [...new Set(skillIds)];

	return db.transaction(async (tx) => {
		const inserted = await tx
			.insert(projectUser)
			.values({
				userId: userId,
				projectId: projectId,
				projectRoleId: roleId,
			})
			.onConflictDoNothing()
			.returning();

		const userProject =
			inserted[0] ??
			(await tx
				.select()
				.from(projectUser)
				.where(
					and(
						eq(projectUser.userId, userId),
						eq(projectUser.projectId, projectId),
					),
				)
				.limit(1));

		if (!inserted) {
			await tx
				.update(projectUser)
				.set({
					projectRoleId: roleId,
				})
				.where(eq(projectUser.id, userProject.id));
		}

		if (uniqueSkillIds.length) {
			await tx
				.insert(projectUserSkill)
				.values(
					uniqueSkillIds.map((skillId) => ({
						projectUserId: userProject.id,
						skillId: skillId,
					})),
				)
				.onConflictDoNothing();
		}

		return userProject;
	});
}
