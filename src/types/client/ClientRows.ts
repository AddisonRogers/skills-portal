import { getClients } from "@/db/repositories/client";

export type ClientRow = Awaited<ReturnType<typeof getClients>>[number];
