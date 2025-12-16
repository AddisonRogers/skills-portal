"use client"; // Error boundaries must be Client Components

import Link from "next/link";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen h-full gap-4">
			<h1 className="text-2xl font-bold">Something went wrong!</h1>
			<p className="text-center text-muted-foreground">
				Error: {error.message}
			</p>
			<button type="button" onClick={() => reset()}>
				Try again
			</button>
			<Link href="/">Go to Home</Link>
		</div>
	);
}
