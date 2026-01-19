import { createPersonWithSkillIndex } from "@/lib/test/fixtures/people";
import { vi, describe, it, expect } from "vitest";

vi.mock("@/db/repositories/users", () => ({
	getUsers: vi.fn(async () => [
		// user-001 skill 101
		{
			userId: "user-001",
			userName: "Jon Doe",
			userImage: null,
			jobRoleId: 10,
			jobRoleTitle: "Senior Cloud Engineer",
			locationId: 1,
			locationName: "Reading",
			managerId: "manager-001",
			managerName: "Jane Smith",
			managerImage: null,
			managerJobRoleId: 20,
			managerJobRoleTitle: "Engineering Manager",
			managerLocationId: 1,
			managerLocationName: "Reading",
			capabilityId: 100,
			capabilityName: "Cloud Engineering",
			skillId: 101,
			skillName: "Azure",
			skillLevel: 5,
		},
		// user-001 skill 102 (same user, different skill)
		{
			userId: "user-001",
			userName: "Jon Doe",
			userImage: null,
			jobRoleId: 10,
			jobRoleTitle: "Senior Cloud Engineer",
			locationId: 1,
			locationName: "Reading",
			managerId: "manager-001",
			managerName: "Jane Smith",
			managerImage: null,
			managerJobRoleId: 20,
			managerJobRoleTitle: "Engineering Manager",
			managerLocationId: 1,
			managerLocationName: "Reading",
			capabilityId: 100,
			capabilityName: "Cloud Engineering",
			skillId: 102,
			skillName: "Terraform",
			skillLevel: 4,
		},
		// user-002 skill 103
		{
			userId: "user-002",
			userName: "Alice Brown",
			userImage: null,
			jobRoleId: 11,
			jobRoleTitle: "Platform Engineer",
			locationId: 2,
			locationName: "London",
			managerId: "manager-001",
			managerName: "Jane Smith",
			managerImage: null,
			managerJobRoleId: 20,
			managerJobRoleTitle: "Engineering Manager",
			managerLocationId: 1,
			managerLocationName: "Reading",
			capabilityId: 101,
			capabilityName: "Platform Engineering",
			skillId: 103,
			skillName: "Kubernetes",
			skillLevel: 3,
		},
	]),
}));

import getAllPeople from "./getAllPeople";
import { getUsers } from "@/db/repositories/users";

describe("getAllPeople", () => {
	it("should return every person that is stored in the db as well as aggregating any instances where there are multiple rows for the same user", async () => {
		const people = await getAllPeople();

		expect(people).toHaveLength(2);

		const jon = people.find((p) => p.id === "user-001")!;
		expect(jon.topSkills.map((s) => s.id).sort()).toEqual([101, 102]);
		expect(jon.totalSkills).toBe(2);

		const alice = people.find((p) => p.id === "user-002")!;
		expect(alice.topSkills.map((s) => s.id)).toEqual([103]);
		expect(alice.totalSkills).toBe(1);
	});
});
