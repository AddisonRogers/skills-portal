import { ClientDto } from "@/types/client/ClientDto";
import { ClientRow } from "@/types/client/ClientRows";

export default function mapClientsDbToClientsDto(
	rows: ClientRow[],
): ClientDto[] {
	const clients = new Map<Number, ClientDto>();

	for (const r of rows) {
		let client = clients.get(r.id);

		if (!client) {
			client = {
				id: r.id,
				name: r.name,
				description: r.description ?? "",
			};
			clients.set(r.id, client);
		}
	}
	return Array.from(clients.values());
}
