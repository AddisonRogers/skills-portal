import { betterAuth } from "better-auth";
import { db } from "@/lib/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import {headers} from "next/headers";
import {isAdmin} from "@/db/repositories/roles"; // adjust the path to where your exports are

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	socialProviders: {
		microsoft: {
			clientId: process.env.MICROSOFT_CLIENT_ID as string,
			clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
			// Optional
			tenantId: process.env.MICROSOFT_TENANT_ID as string,
			requireSelectAccount: true,
		},
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
	},
});

export const authIsAdmin = async () => {
	const session = await auth.api.getSession({
		headers: await headers(), // some endpoint might require headers
	});

	const userEmail = session?.user?.email;
	if (!userEmail) {
		return false;
	}

	return isAdmin(userEmail)
}