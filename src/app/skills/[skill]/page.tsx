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

	const info = await fetchBlob(skill.blobUrl);

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
			{skill.blobUrl && (
				<div className="mt-4 flex items-center gap-2">
					<p className="mr-2 font-semibold">URL:</p>
					<Button asChild variant="link" className="px-0">
						<a
							href={skill.blobUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="break-all"
						>
							{info}
						</a>
					</Button>
				</div>
			)}
		</div>
	);
}
