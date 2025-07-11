import { betterAuth } from "better-auth";
import { db } from "@/lib/db";
import {drizzleAdapter} from "better-auth/adapters/drizzle";



export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      // Optional
      tenantId: process.env.MICROSOFT_TENANT_ID as string,
      requireSelectAccount: true
    }
  }
})