import { test, describe, it, expect } from "vitest";
import { getUsersByCapability } from "./getUsersByCapability";
import getAllPeople from "./getAllPeople";

describe("getAllPeople", () => {
	it("should return every person that is stored in the db", async () => {
		const res = await getAllPeople();
		expect(res.length).toEqual(49);
	});
});
