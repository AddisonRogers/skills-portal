"use client";

import React from "react";
import {Handle} from "@xyflow/react";

type SkillStatus = "completed" | "in progress" | "not started";

function getStatus(data): SkillStatus {
  // Example logic: adjust according to your completion logic!
  if (data.acquiredAt) return "completed";
  if (data.level && data.level > 0) return "in progress";
  return "not started";
}

const statusInfo: Record<SkillStatus, { label: string; bg: string }> = {
  completed: {
    label: "Completed",
    bg: "bg-green-100",
  },
  "in progress": {
    label: "In Progress",
    bg: "bg-yellow-100",
  },
  "not started": {
    label: "Not Started",
    bg: "bg-gray-200",
  },
};

export function TargetHandleWithValidation({ position, source }) {
  return (
    <Handle
      type="target"
      position={position}
      onConnect={(params) => console.log('handle onConnect', params)}
      style={{ background: '#fff' }}
    />
  );
}

export function SkillNode({ data }) {

  const status = getStatus(data);
  const { label, bg } = statusInfo[status];

  return (
    <div className={`relative p-4 rounded-lg shadow border ${bg} min-w-[180px] min-h-[70px]`}>
      <div className="flex justify-between items-start">
        <div className="font-semibold text-lg">{data.name}</div>
        <span
          className={`
            text-xs px-2 py-0.5 rounded-full font-medium
            ${status === "completed"
            ? "bg-green-300 text-black"
            : status === "in progress"
              ? "bg-yellow-200 text-black"
              : "bg-gray-300 text-black"
          }
          `}
        >
          {label}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-600">+{data.level ?? 0}xp</div>
      <Handle position={"top"} type={"source"}/>
      <TargetHandleWithValidation position="bottom" source={data.id} />
    </div>
  );
}