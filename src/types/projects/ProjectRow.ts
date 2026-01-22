import { getProjects } from "@/db/repositories/projects";

export type ProjectRow = Awaited<ReturnType<typeof getProjects>>[number];
