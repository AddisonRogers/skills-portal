import { createAuthClient } from "better-auth/react";
import * as rolesDb from "@/db/repositories/roles";

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: "http://localhost:3000",
});

export const MicrosoftSignIn = async () => {
	const data = await authClient.signIn.social({
		provider: "microsoft",
		callbackURL: "/", // The URL to redirect to after the sign in
	});
};

export const GithubSignIn = async () => {
	const data = await authClient.signIn.social({
		provider: "github",
		callbackURL: "/"
	})
}

export const isAdmin = async () => {
	const { data: session, error } = await authClient.getSession();
	if (error) return false;

	if (session === undefined || session?.user === undefined) return false;

	// get from roles
	return await rolesDb.isAdmin(session.user.email);
};

export const isSignedIn = async () => {
	const { data: session, error } = await authClient.getSession();
	if (error) return false;

	if (session === undefined || session?.user === undefined) return false;
	return true;
};

export const { useSession } = authClient;
