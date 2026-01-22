import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserProjectsDb } from "@/db/repositories/projects";
import mapProjectsDbToProjects from "@/lib/mappers/projects/project.mapper";

export async function GET() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
	}

	const rows = await getUserProjectsDb(session.user.id);
	const projects = mapProjectsDbToProjects(rows);

	return NextResponse.json(projects);
}
