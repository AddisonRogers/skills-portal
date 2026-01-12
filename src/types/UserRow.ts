import { getUsers } from "@/db/repositories/users"

export type UserRow = Awaited<ReturnType<typeof getUsers>>[number];