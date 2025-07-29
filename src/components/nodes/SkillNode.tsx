"use client";

import React from "react";
import {Handle} from "@xyflow/react";
import {useSelectedNodeStore} from "@/app/learn/[pathway]/zustandStore";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

type SkillStatus = "completed" | "in progress" | "not started";

function getStatus(data): SkillStatus {
  // Example logic: adjust according to your completion logic!
  if (data.acquiredAt) return "completed";
  if (data.level && data.level > 0) return "in progress";
  return "not started";
}

function getButtonLabel(status: SkillStatus): string {
  switch (status) {
    case "completed":
      return "Review";
    case "in progress":
      return "Continue";
    default:
      return "Start";
  }
}


const pastelBg: Record<SkillStatus, string> = {
  completed: "bg-green-100",
  "in progress": "bg-yellow-100",
  "not started": "bg-gray-100",
};
const statusColor: Record<SkillStatus, string> = {
  completed: "bg-blue-500 text-white dark:bg-blue-600",
  "in progress": "bg-yellow-300 text-black",
  "not started": "bg-gray-300 text-black",
};
const statusText: Record<SkillStatus, string> = {
  completed: "Completed",
  "in progress": "In progress",
  "not started": "Not started",
};


export function TargetHandleWithValidation({position, source}) {
  return (
    <Handle
      type="target"
      position={position}
      onConnect={(params) => console.log("handle onConnect", params)}
      style={{background: "#fff"}}
    />
  );
}

function skillNameToSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}


export function SkillNode({data}) {
  const status = getStatus(data);
  const {selectedNode, setSelectedNode} = useSelectedNodeStore();
  const isExpanded = selectedNode === data.name;
  const slug = skillNameToSlug(data.name);

  // Description: limit to ~3 sentences
  const description = data.description
    ? data.description.split(". ").slice(0, 3).join(". ") + (data.description.split(". ").length > 3 ? "..." : "")
    : "No description provided.";


  // Animation: expand (max-height & translateY)
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2">
        <Button onClick={() => setSelectedNode(data.name)}>
          {data.name}
        </Button>

        {/* Expansion: grows from bottom */}
        {
          isExpanded &&

            <div>
                <div className="rounded-md bg-white/90 backdrop-blur py-2 px-3 shadow mb-3">
                    <div className="text-gray-700 text-sm mb-2" style={{minHeight: "2.5em"}}>
                      {description}
                    </div>
                    <Link href={`/skills/${slug}`}>
                      {getButtonLabel(status)}
                    </Link>
                </div>
            </div>
        }

      </div>
      {/* ReactFlow handles */}


      <Handle position="top" type="source"/>
      <TargetHandleWithValidation position="bottom" source={data.id}/>
    </>
  );

}
