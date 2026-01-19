"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorProvider } from "@/app/ai/providers/errorProvider.tsx";
import { McpProvider } from "@/app/ai/providers/mcpProvider.tsx";
import Chat from "@/app/ai/chat";

const queryClient = new QueryClient();

export default function AiPage() {
	return (
		<QueryClientProvider client={queryClient}>
			<ErrorProvider>
				<McpProvider>
					<Chat />
				</McpProvider>
			</ErrorProvider>
		</QueryClientProvider>
	);
}
