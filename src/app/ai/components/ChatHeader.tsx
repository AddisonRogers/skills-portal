import type React from "react";

interface ChatHeaderProps {
	title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
	return (
		<div className={"p-2.5 border-b border-gray-200"}>
			<h1>{title}</h1>
		</div>
	);
};

export default ChatHeader;
