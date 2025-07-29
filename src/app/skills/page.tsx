"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useQueryState } from "nuqs";
import { getPathInfo, getProgressOnPath } from "@/app/skills/serverFunctions";

export default function PathwayPage() {
	const { isPending, data } = useSession();
	const status = isPending ? "loading" : "authenticated";
	const user = data?.user;
  // TODO implement a skills viewer

	return (
		<div className="w-full min-h-screen bg-accent">
      wassup
		</div>
	);
}
