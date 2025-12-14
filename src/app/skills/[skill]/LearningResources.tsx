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
		<div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
			<ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
			<Button
				asChild
				variant="link"
				className="h-auto p-0 text-left justify-start"
			>
				<a
					href={props.href}
					target="_blank"
					rel="noopener noreferrer"
					className="break-all text-blue-600 hover:text-blue-800"
				>
					{props.href}
				</a>
			</Button>
		</div>
	);
}
