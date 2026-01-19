"use client";

import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";
import { useMCPToolsQuery } from "../queries/useMCPToolsQuery.ts";
import { useContext } from "react";

import { McpContext } from "../contexts/mcpContext.tsx";
import { ErrorContext } from "../contexts/errorContext.tsx";

export function MCPServerInput() {
	const { mcpEndpoint, setMcpEndpoint } = useContext(McpContext);
	const { addError } = useContext(ErrorContext);

	const { isLoading, refetch, isError } = useMCPToolsQuery();

	const handleTest = async () => {
		await refetch();
		if (!isError) return;
		console.error("Error testing MCP server");
		addError(
			"Failed to test MCP server. Please check the endpoint URL and try again.",
		);
	};

	return (
		<>
			{/* MCP Server Configuration */}
			<div className="flex flex-col gap-2">
				<Label htmlFor="mcp-endpoint" className="text-sm font-medium">
					MCP Server Endpoint
				</Label>
				<div className="flex gap-2 items-center">
					<Input
						id="mcp-endpoint"
						placeholder="http://localhost:3000"
						value={mcpEndpoint}
						onChange={(e) => {
							setMcpEndpoint(e.target.value);
						}}
						disabled={isLoading}
					/>
					<Button onClick={handleTest} disabled={isLoading} size="sm">
						{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Test"}
					</Button>
				</div>
			</div>
		</>
	);
}
