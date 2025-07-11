"use client"

import {useEffect} from "react";
import {useSession} from "@/lib/auth-client";
import SkillsSidebar from "@/components/skills-sidebar";
import SkillsFlow from "@/components/skills-flow";


export default function Home() {
  const {isPending, data} = useSession();
  const status = isPending ? "loading" : "authenticated";
  const user = data?.user;


  return (
    <div className={"w-full min-h-screen bg-gray-950 dark:bg-gray-900"}>
      <SkillsFlow/>
    </div>
  );
}
