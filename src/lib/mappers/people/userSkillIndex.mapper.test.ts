import { describe, it, expect } from "vitest";
import userSkillIndexMapper, {
	addSkillIndexToPerson,
} from "./userSkillIndex.mapper";
import { basePersonDto } from "@/lib/test/fixtures/people";

describe("userSkillIndex.mapper", () => {
	describe("userSkillIndexMapper", () => {
		it("maps skillId to level for each provided skill", () => {
			const res = userSkillIndexMapper(basePersonDto.topSkills);

			expect(res).toBeInstanceOf(Map);
			expect(Array.from(res.entries())).toEqual([
				[101, 5],
				[102, 4],
				[103, 3],
			]);
		});

		it("uses 0 when skill.level is null/undefined", () => {
			const res = userSkillIndexMapper([
				{
					id: 201,
					name: "SomeSkill",
					level: undefined,
					proficiency: "beginner",
				} as any,
			]);

			expect(res.get(201)).toBe(0);
		});
	});

	describe("addSkillIndexToPerson", () => {
		it("returns the person with a derived skillIndex Map from topSkills", () => {
			const res = addSkillIndexToPerson(basePersonDto);

			expect(res.skillIndex).toBeInstanceOf(Map);
			expect(Array.from(res.skillIndex.entries())).toEqual([
				[101, 5],
				[102, 4],
				[103, 3],
			]);
		});
	});
});
