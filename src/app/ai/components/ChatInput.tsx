"use client";

import type React from "react";
import { useCallback, useRef } from "react";
import { Send } from "lucide-react";

interface chatInputProps {
	onSend: (input: string) => void;
}

function ChatInput(props: chatInputProps) {
	const { onSend } = props;

	const inputRef = useRef<HTMLInputElement>(null);

	const handleSend = useCallback(() => {
		const currentInput = inputRef.current?.value || "";
		if (currentInput.trim()) {
			onSend(currentInput);
		}
	}, [onSend]);

	const handleKeyPress = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				handleSend();
				event.preventDefault();
				inputRef.current?.blur();
				if (inputRef.current) {
					inputRef.current.value = "";
				}
			}
		},
		[handleSend],
	);

	return (
		<div className={"flex items-center mt-1.5 border rounded-xl p-1.5"}>
			<input
				type="text"
				ref={inputRef}
				onKeyUp={handleKeyPress}
				placeholder="Type your message..."
				className={"flex-1 p-1 border-none outline-none"}
			/>
			<button
				onClick={handleSend}
				type="button"
				className={"p-1 flex items-center"}
			>
				<Send className="w-8 h-8 fill-gray-50" />
			</button>
		</div>
	);
}

export default ChatInput;
