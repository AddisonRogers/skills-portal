import { test, describe, it, expect } from "vitest";
import type { PersonWithAccount } from "../../../app/people/serverFunctions";
import { getUsersByCapability } from "./getUsersByCapability";

describe("getPeopleByCapability", () => {
	it("should only return people that are within the specified capability", async () => {
		const res = await getUsersByCapability(1);
		expect(res[0].user.name).toEqual(["User 017"]);
	});
});
