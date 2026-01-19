import { describe, it, expect } from "vitest";
import matchScore from "./matchScore"
import { createPersonWithSkillIndex, personWithSkillIndex } from "@/lib/test/fixtures/people";
import { createSearchCriteria } from "@/lib/test/fixtures/searchCriteria";

describe("matchScore", () => {
    it("gives a higher score if someone has more matching skills", () => {
        const personWithLessSkills = createPersonWithSkillIndex();
        personWithLessSkills.skillIndex.delete(101)
        
        const searchCriteriaSkillsOnly = createSearchCriteria({minProficiency: 0});

        const personA = matchScore(personWithSkillIndex, searchCriteriaSkillsOnly);
        const personB = matchScore(personWithLessSkills, searchCriteriaSkillsOnly)
        expect(personA.score).toBeGreaterThan(personB.score)
    });

    it("doesn't count as a match if the min proficiency isnt reached", () => {
        const criteria = createSearchCriteria({requiredSkills: [101], minProficiency: 5})

        const personA = createPersonWithSkillIndex();
        const personB = createPersonWithSkillIndex({skillIndex: new Map([[101, 3]])});

        const scoreA = matchScore(personA, criteria);
        const scoreB = matchScore(personB, criteria);
        
        expect(scoreA.score).toBe(100);
        expect(scoreB.score).toBe(0);
    });

    it("returns matchedSkillIds and missingSkillIds correctly", () => {
        const criteria = createSearchCriteria({requiredSkills: [101, 102, 999], minProficiency: 0});

        const person = createPersonWithSkillIndex();

        const personScore = matchScore(person, criteria)

        expect(personScore.matchedSkillIds.sort()).toEqual([101,102]);
        expect(personScore.missingSkillIds.sort()).toEqual([999]);
    });

    it("returns a neutral score if the criteria is empty", () => {
        const criteria = createSearchCriteria({requiredSkills: []});
        const person = createPersonWithSkillIndex();

        const personScore = matchScore(person, criteria)

        expect(personScore.score).toBe(0);
    })
});