import { getClients } from "@/db/repositories/client";
import mapClientsDbToClientsDto from "@/lib/mappers/clients/client.mapper";

export default async function getAllClients() {
	const clients = await getClients();
	return mapClientsDbToClientsDto(clients);
}
