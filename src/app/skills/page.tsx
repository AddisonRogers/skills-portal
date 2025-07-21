// "use client";
//
// import { useEffect } from "react";
// import { useSession } from "@/lib/auth-client";
// import SkillsSidebar from "@/components/skills-sidebar";
// import SkillsFlow from "@/components/skills-flow";
// import { useQueryState } from "nuqs";
// import { getPathInfo, getProgressOnPath } from "@/app/skills/serverFunctions";
//
// export default function PathwayPage() {
// 	const { isPending, data } = useSession();
// 	const status = isPending ? "loading" : "authenticated";
// 	const user = data?.user;
//
// 	const [path, setPath] = useQueryState("path", { defaultValue: "front-end" });
//
// 	const pathInfo = getPathInfo(path);
// 	const progressInfo = getProgressOnPath(path);
// 	//
//
// 	return (
// 		<div className="w-full min-h-screen bg-accent">
// 			<SkillsFlow />
// 		</div>
// 	);
// }
