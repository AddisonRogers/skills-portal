import { db } from "@/lib/db";
import { client } from "../schema";

export async function getClients() {
	return db.select().from(client);
}
