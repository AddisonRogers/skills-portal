import type React from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

interface MessageProps {
	role: "user" | "assistant";
	content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
	const markdownComponents: Components = {
		code: ({ className, children, ...props }) => {
			const match = /language-(\w+)/.exec(className || "");
			const isInline = !match;

			if (isInline) {
				return (
					<code
						className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono"
						{...props}
					>
						{children}
					</code>
				);
			}

			return (
				<div className="my-2">
					<pre className="bg-black/5 dark:bg-white/5 rounded-md p-3 overflow-x-auto">
						<code className={`${className} text-sm font-mono`} {...props}>
							{children}
						</code>
					</pre>
				</div>
			);
		},
		p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
		ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
		ol: ({ children }) => (
			<ol className="list-decimal ml-4 mb-2">{children}</ol>
		),
		li: ({ children }) => <li className="mb-1">{children}</li>,
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-2 italic">
				{children}
			</blockquote>
		),
		h1: ({ children }) => (
			<h1 className="text-xl font-bold mb-2">{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-lg font-bold mb-2">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-base font-bold mb-1">{children}</h3>
		),
	};

	return (
		<div
			className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-2`}
		>
			<div
				className={`px-4 py-2 rounded-md max-w-lg break-words
                            ${role === "user" ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600"}`}
			>
				<ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
			</div>
		</div>
	);
};

export default Message;
