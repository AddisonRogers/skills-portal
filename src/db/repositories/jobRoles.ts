import { db } from "@/lib/db";
import { jobRole, projectRole } from "../schema";

//Get all job roles from the database
export async function getAllJobRolesDb() {
	return await db.select().from(jobRole);
}

//Get all project roles from the database
export async function getProjectRolesDb() {
	return await db.select().from(projectRole);
}
