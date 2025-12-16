import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { getMissingRequiredEnv } from "@/lib/envChecker.ts";
import MissingEnvScreen from "@/app/MissingEnvScreen.tsx";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Skills Portal - Home",
	description: "Portal for all your skills needs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const missing = getMissingRequiredEnv();

	if (missing.length > 0) {
		return (
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-svh`}
				>
					<MissingEnvScreen missingKeys={missing} />
				</body>
			</html>
		);
	}

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-svh`}
			>
				<NuqsAdapter>
					<Navbar />
					{children}
				</NuqsAdapter>
			</body>
		</html>
	);
}
