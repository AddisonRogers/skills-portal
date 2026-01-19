import { createPersonWithSkillIndex } from "@/lib/test/fixtures/people";
import { createSearchCriteria } from "@/lib/test/fixtures/searchCriteria";
import { describe, it, expect } from "vitest";
import rankPeople from "./rankPeople";

describe("rankPeople", () => {
	it("Should rank people in descending order of their match score", () => {
		const criteria = createSearchCriteria();

		const personA = createPersonWithSkillIndex();
		const personB = createPersonWithSkillIndex();
		personB.skillIndex.delete(101);

		const rankedPeople = rankPeople([personA, personB], criteria);

		expect(rankedPeople.map((rp) => rp.id)).toEqual([personA.id, personB.id]);
	});
});
