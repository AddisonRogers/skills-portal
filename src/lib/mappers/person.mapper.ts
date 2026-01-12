import { jobRole } from "@/db/schema";
import { PersonDto } from "@/types/PersonDto";
import { UserRow } from "@/types/UserRow";
import skillProficiencyMap from "./skillProficiency.mapper";

export default function mapUsersToPeople(rows: UserRow[]): PersonDto[] {
	const people = new Map<string, PersonDto>();

	for (const r of rows) {
		let person = people.get(r.userId);

		if (!person) {
			person = {
				id: r.userId,
				name: r.userName,
				image:
					r.userImage ??
					"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
				role: { id: r.jobRoleId, title: r.jobRoleTitle },
				location: { id: r.locationId, name: r.locationName },
				reportsTo: {
					id: r.managerId,
					name: r.managerName ?? "N/A",
					image:
						r.managerImage ??
						"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
					role: {
						id: r.managerJobRoleId ?? null,
						title: r.managerJobRoleTitle ?? "N/A",
					},
					location: {
						id: r.managerLocationId,
						name: r.managerLocationName ?? "N/A",
					},
				},
				capability: { id: r.capabilityId, name: r.capabilityName },
				isAvailable: true,
				topSkills: [],
				totalSkills: 0,
			};
			people.set(r.userId, person);
		}
		if (r.skillId && r.skillName) {
			person.topSkills.push({
				id: r.skillId,
				name: r.skillName,
				level: r.skillLevel,
				proficiency: skillProficiencyMap(r.skillLevel),
			});
			person.totalSkills += 1;
		}
		person.topSkills.sort((a, b) => (b.level ?? 0) - (a.level ?? 0));
	}
	return Array.from(people.values());
}
