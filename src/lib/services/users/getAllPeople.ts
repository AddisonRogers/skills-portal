import { getUsers } from "@/db/repositories/users";
import mapUsersToPeople from "../../mappers//people/person.mapper";

export default async function getAllPeople() {
	const rows = await getUsers();
	return mapUsersToPeople(rows);
}
