"use client";

import { useSession } from "@/lib/auth-client";

export function useUserInfo() {
	const { data: session } = useSession();

	const loggedIn = !!session?.user?.email;
	const user = loggedIn ? session!.user : null;
	const userEmail = user?.email ?? null;

	//const isAdminBool = !!(loggedIn && userEmail && isAdmin(userEmail));

	return { loggedIn, user, userEmail };
}
