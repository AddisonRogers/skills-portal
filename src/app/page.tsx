"use client"

import {useEffect} from "react";
import {useSession} from "@/lib/auth-client";
import SkillsSidebar from "@/components/skills-sidebar";
import SkillsFlow from "@/components/skills-flow";

import rawNodes from "./dummyData/nodes.json";
import rawEdges from "./dummyData/edges.json";
import {Edge, Node} from "@xyflow/react";

export default function Home() {
  const {isPending, data} = useSession();
  const status = isPending ? "loading" : "authenticated";
  const user = data?.user;

  // Get data from backend with user info
  // Otherwise show default
  const nodes: Node[] = rawNodes;
  const edges: Edge[] = rawEdges;


  return (
    <div className={"w-full min-h-screen bg-gray-950 dark:bg-gray-900"}>
        <SkillsFlow/>
    </div>
  );
}
