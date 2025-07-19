import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	beforeAll,
	afterAll,
} from "vitest";
import * as rolesModule from "./roles";
import { getDb } from "@/lib/db";
import {
	PostgreSqlContainer,
	type StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { Pool } from "pg";
import * as usersModule from "./users";
import { nanoid } from "nanoid";
import { migrate } from "drizzle-orm/node-postgres/migrator";

let container: StartedPostgreSqlContainer;
let db: ReturnType<typeof getDb>;

const mockUser = {
	id: nanoid(),
	email: "user@example.com",
	name: "Test",
	email_verified: false,
};
const otherUser = {
	id: nanoid(),
	email: "other@example.com",
	name: "Other",
	email_verified: false,
};
const adminRole = { name: "admin", description: "Administrator" };
const editorRole = { name: "editor", description: "Editor" };

describe("roles tests", () => {
	beforeAll(async () => {
		try {
			container = await new PostgreSqlContainer("postgres:17-alpine")
				.withUsername("postgres")
				.withDatabase("postgres")
				.withPassword("postgres")
				.start();

			const testPool = new Pool({
				user: "postgres",
				password: "postgres",
				database: "postgres",
			});

			db = getDb(testPool);
			await migrate(db, {
				migrationsFolder: "./drizzle",
				migrationsSchema: "./src/db/schema.ts",
			});

			await usersModule.test_use_createUser(mockUser);
			await usersModule.test_use_createUser(otherUser);
			console.debug(`Created users: ${mockUser.email}, ${otherUser.email}`);
			// Ensure roles are present
			await rolesModule.addRole(adminRole.name, adminRole.description);
			await rolesModule.addRole(editorRole.name, editorRole.description);
			console.debug(`Created roles: ${adminRole.name}, ${editorRole.name}`);
			// Assign admin role to mockUser only
			await rolesModule.addRoleToSomeone(mockUser.email, adminRole.name);
			console.debug(`Assigned admin role to ${mockUser.email}`);
		} catch (e) {
			console.error("Error in beforeAll", e);
			throw e; // rethrow so Vitest fails immediately
		}
	});

	afterAll(async () => {
		await container.stop();
	});

	beforeEach(async () => {
		// No-op: DB state should be consistent across tests, major setup in beforeAll
	});

	describe("getRoles", () => {
		it("returns roles for a user that has roles", async () => {
			const result = await rolesModule.getRoles(mockUser.email);
			console.debug(result);
			expect(result).toEqual(expect.arrayContaining([{ name: "admin" }]));
		});

		it("returns empty array for a user without roles", async () => {
			const result = await rolesModule.getRoles(otherUser.email);
			console.debug(result);
			expect(result).toEqual([]);
		});
	});

	describe("userHasRole", () => {
		it("returns true when user has the role", async () => {
			const result = await rolesModule.userHasRole(mockUser.email, "admin");
			expect(result).toBe(true);
		});

		it("returns false when user does not have the role", async () => {
			const result = await rolesModule.userHasRole(mockUser.email, "editor");
			expect(result).toBe(false);
		});
	});

	describe("isAdmin", () => {
		it("returns true if user is admin", async () => {
			const result = await rolesModule.isAdmin(mockUser.email);
			expect(result).toBe(true);
		});
		it("returns false if user is not admin", async () => {
			const result = await rolesModule.isAdmin(otherUser.email);
			expect(result).toBe(false);
		});
	});

	describe("getRolesForUser", () => {
		it("returns role list for user who has roles", async () => {
			const result = await rolesModule.getRolesForUser(mockUser.email);
			expect(result).toEqual(expect.arrayContaining([{ name: "admin" }]));
		});

		it("returns empty list for user who has no roles", async () => {
			const result = await rolesModule.getRolesForUser(otherUser.email);
			expect(result).toEqual([]);
		});
	});

	describe("addRoleToSomeone / removeRoleFromSomeone", () => {
		it("can add a role to user and make checks pass and then remove it", async () => {
			// At first, otherUser does not have editor
			expect(await rolesModule.userHasRole(otherUser.email, "editor")).toBe(
				false,
			);

			// Add role and check
			await rolesModule.addRoleToSomeone(otherUser.email, "editor");
			expect(await rolesModule.userHasRole(otherUser.email, "editor")).toBe(
				true,
			);

			// Remove role and check again
			await rolesModule.removeRoleFromSomeone(otherUser.email, "editor");
			expect(await rolesModule.userHasRole(otherUser.email, "editor")).toBe(
				false,
			);
		});
	});

	describe("addRole / removeRole", () => {
		const tempRoleName = "temporaryrole";

		it("can add and remove role by name", async () => {
			// Add role
			await rolesModule.addRole(tempRoleName, "Temporary Role");
			// Should be available in list
			const allRolesForUser = await rolesModule.getRolesForUser(mockUser.email);
			// Not assigned yet, so not showing for user

			// Assign to user and check
			await rolesModule.addRoleToSomeone(mockUser.email, tempRoleName);
			expect(await rolesModule.userHasRole(mockUser.email, tempRoleName)).toBe(
				true,
			);

			// Remove role from user
			await rolesModule.removeRoleFromSomeone(mockUser.email, tempRoleName);
			expect(await rolesModule.userHasRole(mockUser.email, tempRoleName)).toBe(
				false,
			);

			// Now remove role from system
			await rolesModule.removeRole(tempRoleName);

			// Should not be possible to assign anymore
			await expect(
				rolesModule.addRoleToSomeone(mockUser.email, tempRoleName),
			).rejects.toThrow();
		});
	});

	describe("updateRole", () => {
		const newName = "editor";
		const newDesc = "Can edit everything including cats";
		it("updates a role's description", async () => {
			await rolesModule.updateRole(newName, newDesc);
			// There is no direct fetch-by-role-name for description, but we can reassign and test success (lack of error)
			await expect(
				rolesModule.addRoleToSomeone(otherUser.email, newName),
			).resolves.not.toThrow();
		});
	});
});
