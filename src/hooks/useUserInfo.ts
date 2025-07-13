"use client"

import { useSession } from "@/lib/auth-client";
import { isAdmin } from "@/db/repositories/roles";

export function useUserInfo() {
  const { data: session } = useSession();

  const loggedIn = !!session?.user?.email;
  const user = loggedIn ? session!.user : null;
  const userEmail = user?.email ?? null;

  const isAdminBool = !!(loggedIn &&
    userEmail &&
    isAdmin(userEmail));

  return { loggedIn, user, userEmail, isAdmin: isAdminBool };
}