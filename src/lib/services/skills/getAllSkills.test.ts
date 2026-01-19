import { vi, describe, it, expect } from "vitest";


vi.mock("@/db/repositories/skills", () => ({
  getSkills: vi.fn(async () => [
    { id: 101, name: "Azure", description: "Microsoft Azure is a cloud computing platform used to build, deploy, and manage applications and infrastructure through Microsoft-managed data centres. It provides services such as virtual machines, networking, storage, databases, and identity management." },
    { id: 102, name: "Terraform", description: "Terraform is an infrastructure-as-code tool that allows engineers to define, provision, and manage cloud and on-premise infrastructure using declarative configuration files. It is commonly used to automate and standardise infrastructure deployment across environments." },
  ]),
}));

import getAllSkills from "./getAllSkills";
import { getSkills } from "@/db/repositories/skills";

describe("getAllSkills", () => {
	it("should return every skill that is stored in the db", async () => {
		const skills = await getAllSkills();

		expect(skills.length).toBeGreaterThan(0);
		expect(skills).toEqual([
			{id: 101, name: "Azure", description: "Microsoft Azure is a cloud computing platform used to build, deploy, and manage applications and infrastructure through Microsoft-managed data centres. It provides services such as virtual machines, networking, storage, databases, and identity management."}, 
			{id: 102, name: "Terraform", description: "Terraform is an infrastructure-as-code tool that allows engineers to define, provision, and manage cloud and on-premise infrastructure using declarative configuration files. It is commonly used to automate and standardise infrastructure deployment across environments."}
		])
	});
});
