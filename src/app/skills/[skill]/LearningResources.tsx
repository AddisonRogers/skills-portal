import { Button } from "@/components/ui/button.tsx";
import { ExternalLink } from "lucide-react";

export default function LearningResources(props: { skillDataJson: any }) {
	return (
		<div className="space-y-3">
			{props.skillDataJson.urls.map((url, index) => (
				<LearningResourceRow key={index} href={url} />
			))}
		</div>
	);
}

function LearningResourceRow(props: { href: string }) {
	return (
		<a
			href={props.href}
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors group"
		>
			<ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
			<span className="truncate text-blue-600 group-hover:text-blue-800">
				{props.href}
			</span>
		</a>
	);
}
