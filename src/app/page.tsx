"use client"

import {useEffect} from "react";
import {useSession} from "@/lib/auth-client";
import SkillsSidebar from "@/components/skills-sidebar";

export default function Home() {
  const { isPending, data } = useSession();
  const status = isPending ? "loading" : "authenticated";
  const user = data?.user;

  // Get data from backend with user info
  // Otherwise show default

  //


  return (
    <div >
    </div>
  );
}
