import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

import {
	user,
	skill,
	userSkill,
	capabilities,
	capabilityUser,
	location,
	jobRole,
	// session,
	// account,
	// verification,
} from "@/db/schema";

async function seedE2E() {
	// 1) Clean down (deterministic)
	// Use raw SQL TRUNCATE so we don't fight FK ordering.
	await db.execute(sql`
		TRUNCATE TABLE
			"user_skill",
			"capability_user",
			"session",
			"account",
			"verification",
			"user",
			"skill",
			"capabilities",
			"location",
			"job_role"
		RESTART IDENTITY CASCADE;
	`);

	// 2) Lookups
	const [reading] = await db
		.insert(location)
		.values({ name: "Reading" })
		.returning();

	const [london] = await db
		.insert(location)
		.values({ name: "London" })
		.returning();

	const [engineeringManagerRole] = await db
		.insert(jobRole)
		.values({ title: "Engineering Manager", description: "Manages an engineering team." })
		.returning();

	const [seniorCloudEngineerRole] = await db
		.insert(jobRole)
		.values({ title: "Senior Cloud Engineer", description: "Builds and maintains cloud platforms and services." })
		.returning();

	const [platformEngineerRole] = await db
		.insert(jobRole)
		.values({ title: "Platform Engineer", description: "Builds internal platforms, tooling, and CI/CD." })
		.returning();

	const [cloudEngineeringCapability] = await db
		.insert(capabilities)
		.values({
			name: "Cloud Engineering",
			description: "Cloud infrastructure, platform services, and reliability engineering.",
		})
		.returning();

	// 3) Users (manager first so reportsTo FK can reference it)
	await db.insert(user).values({
		id: "manager-001",
		name: "Jane Smith",
		email: "jane.smith@company.com",
		emailVerified: true,
		locationId: reading.id,
		reportsToUserId: null,
		jobRoleId: engineeringManagerRole.id,
		image: null,
		// createdAt/updatedAt are defaulted by schema
	});

	await db.insert(user).values([
		{
			id: "user-001",
			name: "Jon Doe",
			email: "jon.doe@company.com",
			emailVerified: true,
			locationId: reading.id,
			reportsToUserId: "manager-001",
			jobRoleId: seniorCloudEngineerRole.id,
			image: null,
		},
		{
			id: "user-002",
			name: "Alice Brown",
			email: "alice.brown@company.com",
			emailVerified: false,
			locationId: london.id,
			reportsToUserId: "manager-001",
			jobRoleId: platformEngineerRole.id,
			image: "https://example.com/alice.png",
		},
	]);

	// 4) Skills
	// skill.id is serial, but Postgres will allow explicit IDs if you provide them.
	await db.insert(skill).values([
		{
			id: 101,
			name: "Azure",
			machineName: "azure",
			description:
				"Microsoft Azure is a cloud computing platform used to build, deploy, and manage applications and infrastructure through Microsoft-managed data centres. It provides services such as virtual machines, networking, storage, databases, and identity management.",
			bigSkill: true,
			xpAmount: 500,
			madeBy: "seed",
		},
		{
			id: 102,
			name: "Terraform",
			machineName: "terraform",
			description:
				"Terraform is an infrastructure-as-code tool that allows engineers to define, provision, and manage cloud and on-premise infrastructure using declarative configuration files. It is commonly used to automate and standardise infrastructure deployment across environments.",
			bigSkill: true,
			xpAmount: 400,
			madeBy: "seed",
		},
		{
			id: 103,
			name: "Kubernetes",
			machineName: "kubernetes",
			description:
				"Kubernetes is a container orchestration platform used to deploy, scale, and manage containerised applications.",
			bigSkill: true,
			xpAmount: 450,
			madeBy: "seed",
		},
	]);

	// 5) Link users to skills (user_skill has a unique constraint userId+skillId)
	await db.insert(userSkill).values([
		{ userId: "user-001", skillId: 101, level: 5 },
		{ userId: "user-001", skillId: 102, level: 4 },
		{ userId: "user-001", skillId: 103, level: 3 },

		{ userId: "user-002", skillId: 102, level: 4 },
		{ userId: "user-002", skillId: 103, level: 2 },
	]);

	// 6) Capability membership
	await db.insert(capabilityUser).values([
		{ capabilityId: cloudEngineeringCapability.id, userId: "manager-001" },
		{ capabilityId: cloudEngineeringCapability.id, userId: "user-001" },
		{ capabilityId: cloudEngineeringCapability.id, userId: "user-002" },
	]);

	console.log("✅ E2E seed complete");
}

seedE2E()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("❌ E2E seed failed", err);
		process.exit(1);
	});
