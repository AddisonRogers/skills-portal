"use client";

import UnauthenticatedScreen from "@/app/login/UnauthenticatedScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";

import { useChat } from "@ai-sdk/react";

export default function ChatPage() {
	const { isPending, data } = useSession();
	const status = isPending ? "loading" : "authenticated";
	const user = data?.user;

	const { messages, input, handleInputChange, handleSubmit } = useChat({
		maxSteps: 5,
	});

	console.log(messages);

	if (status === "loading") {
		return (
			<div className="flex justify-center items-center min-h-screen">
				Loading…
			</div>
		);
	}

	if (status !== "authenticated" || !user) {
		return <UnauthenticatedScreen />;
	}

	return (
		<div className="flex flex-col items-center min-h-screen bg-gray-950">
			<Card className="w-full max-w-xl my-16">
				<CardHeader>
					<h2 className="text-xl font-bold">Chat Room</h2>
					<p className="text-sm text-muted-foreground">
						Signed in as <span className="font-medium">{user?.email}</span>
					</p>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
						{messages.map((message) => (
							<div key={message.id} className="whitespace-pre-wrap">
								{message.role === "user" ? "User: " : "AI: "}
								{message.parts.map((part, i) => {
									switch (part.type) {
										case "text":
											return <div key={`${message.id}-${i}`}>{part.text}</div>;
										case "tool-invocation":
											return (
												<pre key={`${message.id}-${i}`}>
													{JSON.stringify(part.toolInvocation, null, 2)}
												</pre>
											);
									}
								})}
							</div>
						))}

						<form onSubmit={handleSubmit}>
							<input
								className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl text-white"
								value={input}
								placeholder="Say something..."
								onChange={handleInputChange}
							/>
						</form>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
