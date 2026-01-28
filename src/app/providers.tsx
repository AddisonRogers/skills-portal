"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Theme, ThemeProvider } from "@/components/theme-context";

export default function Providers({
	children,
	initialTheme,
}: {
	children: React.ReactNode;
	initialTheme: Theme;
}) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider initialTheme={initialTheme}>
				<NuqsAdapter>{children}</NuqsAdapter>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
