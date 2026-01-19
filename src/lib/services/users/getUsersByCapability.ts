import { getUsersByCapabilityDB } from "@/db/repositories/users";

export async function getUsersByCapability(capabilityId: number) {
	const users = await getUsersByCapabilityDB(capabilityId);
	return users.map((user) => user);
}
