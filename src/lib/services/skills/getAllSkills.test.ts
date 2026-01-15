import { test, describe, it, expect } from "vitest";
import getAllSkills from "./getAllSkills";


describe("getAllSkills", () => {
	it("should return every skill that is stored in the db", async () => {
		const res = await getAllSkills();
		expect(res.length).toEqual(45);
	});
});