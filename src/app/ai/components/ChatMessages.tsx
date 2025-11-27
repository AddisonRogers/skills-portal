import type { LLMMessage } from "../types/LLMMessage.ts";
import Message from "./ChatMessage.tsx";

interface chatMessagesProps {
	messages: LLMMessage[];
}

export default function ChatMessages({ messages }: chatMessagesProps) {
	return (
		<div className="h-full overflow-y-scroll p-4">
			{messages.length === 0 ? (
				<p className="text-center">No messages yet</p>
			) : (
				<div className="space-y-4">
					{messages.map((msg, index) => (
						<Message
							key={index}
							role={msg.sender === "User" ? "user" : "assistant"}
							content={msg.text}
						/>
					))}
				</div>
			)}
		</div>
	);
}
