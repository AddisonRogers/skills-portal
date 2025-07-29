import { getSkill } from "@/db/repositories/skills";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
	BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { fetchBlob } from "@/lib/blobClient";
import {ExternalLink} from "lucide-react";

export default async function IndividualSkillPage({
	params,
}: {
	params: { skill: string };
}) {
	const skills = await getSkill(params.skill);
	const skill = skills?.[0];

	if (!skill || !skill.blobUrl)
		return (
			<Card className="max-w-2xl mx-auto mt-12">
				<CardContent>
					<>No data</>
				</CardContent>
			</Card>
		);

	const skillData = await fetchBlob(skill.blobUrl);
	const skillDataJson = JSON.parse(skillData);
	console.log(skillDataJson.urls);

	return (
		<div className="max-w-2xl mx-auto py-8 space-y-8">
			{/* Breadcrumbs */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="#" style={{ color: "#1167be" }}>
							Roadmap Name
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink
							href="#"
							style={{ color: "#1167be" }}
							aria-current="page"
						>
							{skill.name}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="mb-2">{skill.name}</h1>
			{skill.description ? (
				<p>{skill.description}</p>
			) : (
				<p className="text-muted-foreground text-sm">No description.</p>
			)}
			{skillDataJson?.urls && skillDataJson.urls.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Learning Resources</CardTitle>
						<CardDescription>
							Click on the links below to learn more about this skill
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{skillDataJson.urls.map((url, index) => (
								<div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
									<ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
									<Button asChild variant="link" className="h-auto p-0 text-left justify-start">
										<a
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className="break-all text-blue-600 hover:text-blue-800"
										>
											{url}
										</a>
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
