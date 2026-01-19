"use client";

import { useCallback, useContext, useState } from "react";
import ChatInput from "./components/ChatInput.tsx";
import ChatMessages from "./components/ChatMessages.tsx";
import ChatHeader from "./components/ChatHeader.tsx";
import { generateTextWithAzure as generateText } from "./ai-sdk";
import type { LLMMessage } from "./types/LLMMessage.ts";
import ErrorPrompt from "./components/ErrorPrompt.tsx";
import { Sheet, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Bug } from "lucide-react";
import DebugPanel from "./components/DebugPanel.tsx";
import { ErrorContext } from "./contexts/errorContext.tsx";
import { McpContext } from "./contexts/mcpContext.tsx";

function Chat() {
	const [messages, setMessages] = useState<LLMMessage[]>([]);
	const { errors, addError } = useContext(ErrorContext);
	const { mcpEndpoint } = useContext(McpContext);

	const handleSend = useCallback(
		async (input: string) => {
			if (!input.trim()) return;

			// Add the user's message to the chat
			const userMessage: LLMMessage = { sender: "User", text: input };
			setMessages((prev) => [...prev, userMessage]);

			try {
				console.log("Calling generateText With AI...");
				const aiResponse = await generateText({
					prompt: input,
					handleError: addError,
					mcpEndpoint,
				});
				console.log("AI Response received:", aiResponse);
				const botMessage: LLMMessage = { sender: "AI", text: aiResponse };
				setMessages((prev) => [...prev, botMessage]);
			} catch (error) {
				console.error("Failed to generate AI response:", error);
				addError(
					"An error occurred while generating the AI response. Please try again.",
				);
			}
		},
		[addError, mcpEndpoint],
	);

	return (
		<div className={"flex flex-col h-screen justify-between p-5"}>
			<div className="flex justify-between items-center">
				<div />
				<ChatHeader title="AzureAI" />
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon">
							<Bug className="h-4 w-4" />
						</Button>
					</SheetTrigger>

					<DebugPanel />
				</Sheet>
			</div>
			<div className={"flex-1 overflow-y-auto"}>
				<ChatMessages messages={messages} />
			</div>
			{errors.length > 0 && (
				<div className="flex flex-col-reverse items-center gap-2">
					{errors.map((error, index) => (
						<ErrorPrompt key={index} index={index} message={error} />
					))}
				</div>
			)}
			<div>
				<ChatInput onSend={handleSend} />
			</div>
		</div>
	);
}

export default Chat;
