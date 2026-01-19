"use client";

import { Wrench } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { useMCPToolsQuery } from "../queries/useMCPToolsQuery.ts";

export function ToolsList() {
	const { data: toolsArray, isLoading } = useMCPToolsQuery();

	return (
		!isLoading &&
		toolsArray !== undefined &&
		toolsArray.length > 0 && (
			<div className="mt-4 flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<Wrench className="h-4 w-4" />
					<Label className="text-sm font-medium leading-none">
						Available Tools ({toolsArray.length})
					</Label>
				</div>

				<div className="flex flex-col gap-2">
					{toolsArray.map((tool, index) => (
						<div key={index} className="p-3 border rounded-md bg-white">
							<h4 className="font-medium text-sm dark:text-gray-950">
								{tool.name}
							</h4>
							{tool.description && (
								<p className="text-xs text-gray-600 mt-1">{tool.description}</p>
							)}
							{tool.inputSchema && (
								<details className="mt-2">
									<summary className="text-xs text-blue-600 cursor-pointer">
										View Schema
									</summary>
									<pre className="text-xs bg-gray-50 text-gray-600 p-2 rounded mt-1 overflow-x-auto">
										{JSON.stringify(tool.inputSchema, null, 2)}
									</pre>
								</details>
							)}
						</div>
					))}
				</div>
			</div>
		)
	);
}
