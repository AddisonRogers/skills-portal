"use client";

import { Label } from "@/components/ui/label";
import {
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet.tsx";
import { CheckCircle, Loader2, Settings, XCircle } from "lucide-react";
import { MCPServerInput } from "./MCPServerInput.tsx";
import { useMCPToolsQuery } from "../queries/useMCPToolsQuery.ts";
import { useContext } from "react";

import { McpContext } from "../contexts/mcpContext.tsx";
import { ToolsList } from "./ToolsList.tsx";
import { ErrorContext } from "../contexts/errorContext.tsx";

export default function DebugPanel() {
	const { mcpEndpoint } = useContext(McpContext);
	const { errors } = useContext(ErrorContext);

	const {
		data: toolsArray,
		isLoading,
		isSuccess,
		isError,
	} = useMCPToolsQuery();

	const getStatusIcon = () => {
		if (isLoading)
			return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
		if (isSuccess) return <CheckCircle className="h-4 w-4 text-green-500" />;
		if (isError) return <XCircle className="h-4 w-4 text-red-500" />;
		return <Settings className="h-4 w-4 text-gray-400" />;
	};

	const getStatusText = () => {
		if (isLoading) return "Connecting...";
		if (isSuccess) return "Connected";
		if (isError) return "Connection failed";
		return "Not connected";
	};

	return (
		<SheetContent className="w-2/6 sm:w-[540px] overflow-y-auto">
			<SheetHeader>
				<SheetTitle>Debug Panel</SheetTitle>
				<SheetDescription>Debug MCP server and its tools</SheetDescription>
			</SheetHeader>

			<div className="px-4 flex flex-col gap-2 justify-start">
				<MCPServerInput />

				{/* Connection Status */}
				<div className="flex items-center p-3 gap-2 bg-gray-50 rounded-md">
					{getStatusIcon()}
					<span className="text-sm font-medium dark:text-gray-950 leading-none">
						{getStatusText()}
					</span>
				</div>

				{/* Error Message */}
				{isError && errors.length > 0 && (
					<div className="p-3 bg-red-50 border border-red-200 rounded-md">
						<p className="text-sm text-red-700">{errors[0]}</p>
					</div>
				)}

				{/* Tools List */}
				<ToolsList />

				{/* Connection Statistics */}
				{isSuccess && (
					<div className="mt-4 flex flex-col gap-2">
						<Label className="text-sm font-medium">Connection Info</Label>
						<div className="p-3 bg-green-100 border border-green-200 rounded-md text-sm dark:text-gray-950">
							<p>Endpoint: {mcpEndpoint}</p>
							<p>Tools found: {toolsArray.length}</p>
							<p>Status: Ready for use</p>
						</div>
					</div>
				)}
			</div>
		</SheetContent>
	);
}
