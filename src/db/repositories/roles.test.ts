import { describe, it, expect, vi, beforeEach } from "vitest";
import * as rolesModule from "./roles";
import { db } from "@/lib/db";
import { PostgreSqlContainer } from "@testcontainers/postgresql"; // TODO

vi.mock("@/lib/db", () => ({
    db: {
        select: vi.fn(),
        insert: vi.fn(),
        delete: vi.fn(),
        update: vi.fn()
    }
}));

const mockUser = { id: "user-id", email: "user@example.com" };
const mockRole = { id: "role-id", name: "admin", description: "Administrator" };

describe("roles.ts", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getRoles", () => {
        it("returns roles for an existing user", async () => {
            (db.select as any).mockReturnValueOnce({
                from: vi.fn().mockReturnThis(),
                innerJoin: vi.fn().mockReturnThis(),
                where: vi.fn().mockResolvedValueOnce([{ name: "admin" }]),
            });

            const result = await rolesModule.getRoles(mockUser.email);
            expect(result).toEqual([{ name: "admin" }]);
        });
    });

    describe("userHasRole", () => {
        it("returns true when user has the role", async () => {
            (db.select as any).mockReturnValueOnce({
                from: vi.fn().mockReturnThis(),
                innerJoin: vi.fn().mockReturnThis(),
                where: vi.fn().mockReturnThis(),
                limit: vi.fn().mockResolvedValueOnce([{}]),
            });

            const result = await rolesModule.userHasRole(mockUser.email, "admin");
            expect(result).toBe(true);
        });

        it("returns false when user does not have the role", async () => {
            (db.select as any).mockReturnValueOnce({
                from: vi.fn().mockReturnThis(),
                innerJoin: vi.fn().mockReturnThis(),
                where: vi.fn().mockReturnThis(),
                limit: vi.fn().mockResolvedValueOnce([]),
            });

            const result = await rolesModule.userHasRole(mockUser.email, "editor");
            expect(result).toBe(false);
        });
    });

    describe("isAdmin", () => {
        it("returns true if user is admin", async () => {
            vi.spyOn(rolesModule, "userHasRole").mockResolvedValueOnce(true);
            const result = await rolesModule.isAdmin(mockUser.email);
            expect(result).toBe(true);
        });
        it("returns false if user is not admin", async () => {
            vi.spyOn(rolesModule, "userHasRole").mockResolvedValueOnce(false);
            const result = await rolesModule.isAdmin(mockUser.email);
            expect(result).toBe(false);
        });
    });

    describe("getRolesForUser", () => {
        it("returns role list for user", async () => {
            (db.select as any).mockReturnValueOnce({
                from: vi.fn().mockReturnThis(),
                innerJoin: vi.fn().mockReturnThis(),
                where: vi.fn().mockResolvedValueOnce([{ name: "editor" }]),
            });

            const result = await rolesModule.getRolesForUser(mockUser.email);
            expect(result).toEqual([{ name: "editor" }]);
        });
    });

    describe("addRoleToSomeone", () => {
        it("inserts role_user mapping with correct ids", async () => {
            (db.select as any)
                .mockReturnValueOnce({
                    from: vi.fn().mockReturnThis(),
                    where: vi.fn().mockReturnThis(),
                    limit: vi.fn().mockResolvedValueOnce([{ id: "user-123" }]),
                })
                .mockReturnValueOnce({
                    from: vi.fn().mockReturnThis(),
                    where: vi.fn().mockReturnThis(),
                    limit: vi.fn().mockResolvedValueOnce([{ id: "role-123" }]),
                });

            (db.insert as any).mockReturnValueOnce({
                values: vi.fn().mockResolvedValueOnce({ success: true }),
            });

            await rolesModule.addRoleToSomeone("some@user", "admin");
            expect(db.insert).toHaveBeenCalled();
        });
    });

    describe("removeRoleFromSomeone", () => {
        it("removes a role-user mapping", async () => {
            (db.select as any)
                .mockReturnValueOnce({
                    from: vi.fn().mockReturnThis(),
                    where: vi.fn().mockReturnThis(),
                    limit: vi.fn().mockResolvedValueOnce([{ id: "user-123" }]),
                })
                .mockReturnValueOnce({
                    from: vi.fn().mockReturnThis(),
                    where: vi.fn().mockReturnThis(),
                    limit: vi.fn().mockResolvedValueOnce([{ id: "role-123" }]),
                });

            (db.delete as any).mockReturnValueOnce({
                where: vi.fn().mockResolvedValueOnce({ success: true }),
            });

            await rolesModule.removeRoleFromSomeone("foo@bar", "admin");
            expect(db.delete).toHaveBeenCalled();
        });
    });

    describe("addRole", () => {
        it("inserts new role", async () => {
            (db.insert as any).mockReturnValueOnce({
                values: vi.fn().mockResolvedValueOnce({}),
            });

            await rolesModule.addRole("editor", "Editor Role");
            expect(db.insert).toHaveBeenCalled();
        });
    });

    describe("removeRole", () => {
        it("removes role by name", async () => {
            (db.delete as any).mockReturnValueOnce({
                where: vi.fn().mockResolvedValueOnce({}),
            });

            await rolesModule.removeRole("admin");
            expect(db.delete).toHaveBeenCalled();
        });
    });

    describe("updateRole", () => {
        it("updates a role's name and description", async () => {
            (db.update as any).mockReturnValueOnce({
                set: vi.fn().mockResolvedValueOnce({}),
            });

            await rolesModule.updateRole("editor", "Can edit");
            expect(db.update).toHaveBeenCalled();
        });
    });
});