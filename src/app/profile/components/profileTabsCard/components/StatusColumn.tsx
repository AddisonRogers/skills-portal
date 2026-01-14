import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  statusLabel: string;
  statusColours?: Record<string, string>;
  className?: string;
  children?: React.ReactNode;
};

export default function StatusColumn({ statusLabel, statusColours = {}, className = "", children }: Props) {
  const colour = statusColours[statusLabel] ?? "";

  return (
    <div className={cn("w-20 shrink-0 flex flex-col items-center justify-center", className)}>
      {/* <span className={cn("rounded-2xl px-2 py-0.5 font-semibold whitespace-nowrap text-center", colour)}>
        {statusLabel}
      </span> */}
      <div className="mt-1">{children}</div>
    </div>
  );
}
