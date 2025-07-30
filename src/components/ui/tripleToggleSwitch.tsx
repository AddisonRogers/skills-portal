"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TripleToggleProps {
	value: string;
	onValueChange: (value: string) => void;
	options: {
		value: string;
		label: string;
	}[];
	className?: string;
	disabled?: boolean;
}

const TripleToggle = React.forwardRef<HTMLDivElement, TripleToggleProps>(
	(
		{ value, onValueChange, options, className, disabled = false, ...props },
		ref,
	) => {
		if (options.length !== 3) {
			throw new Error("TripleToggle requires exactly 3 options");
		}

		return (
			<div
				ref={ref}
				className={cn(
					"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
					disabled && "opacity-50 cursor-not-allowed",
					className,
				)}
				role="tablist"
				{...props}
			>
				{options.map((option, index) => (
					<button
						key={option.value}
						type="button"
						role="tab"
						aria-selected={value === option.value}
						disabled={disabled}
						className={cn(
							"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
							value === option.value
								? "bg-background text-foreground shadow-sm"
								: "hover:bg-muted-foreground/10",
						)}
						onClick={() => !disabled && onValueChange(option.value)}
					>
						{option.label}
					</button>
				))}
			</div>
		);
	},
);

TripleToggle.displayName = "TripleToggle";

export { TripleToggle };
