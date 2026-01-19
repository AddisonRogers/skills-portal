import { PersonDto, PersonWithSkillIndex } from "@/types/users/PersonDto";

export const basePersonDto: PersonDto = {
	id: "person-001",
	name: "Jon Doe",
	role: { id: 0, title: "Senior Cloud Engineer" },
	capability: { id: 0, name: "Cloud Engineering" },
	image: "",
	location: { id: 1, name: "Reading" },
	topSkills: [
		{ id: 101, name: "Azure", level: 5, proficiency: "expert" },
		{ id: 102, name: "Terraform", level: 4, proficiency: "advanced" },
		{ id: 103, name: "Kubernetes", level: 3, proficiency: "intermediate" },
	],
	totalSkills: 3,
	isAvailable: true,
	reportsTo: {
		id: "manager-001",
		name: "Jane Smith",
		image: "",
		role: { id: 1, title: "Engineering Manager" },
		location: { id: 1, name: "Reading" },
	},
};

export const personWithSkillIndex: PersonWithSkillIndex = {
	...basePersonDto,
	skillIndex: new Map([
		[101, 5],
		[102, 4],
		[103, 3],
	]),
};

export const createPersonWithSkillIndex = (
	overrides?: Partial<PersonWithSkillIndex>,
): PersonWithSkillIndex => ({
	...personWithSkillIndex,
	...overrides,
	skillIndex: overrides?.skillIndex
		? new Map(overrides.skillIndex)
		: new Map(personWithSkillIndex.skillIndex),
});
