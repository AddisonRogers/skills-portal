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
import { fetchBlob } from "@/lib/blobClient";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import SkillProgressionSwitchWrapper from "@/components/SkillProgressionSwitch/SkillProgressionSwitchWrapper";
import LearningResources from "@/app/skills/[skill]/LearningResources.tsx";

export default async function IndividualSkillPage({
	params,
}: {
	params: Promise<{ skill: string }>;
}) {
	const { skill: skillName } = await params;
	const skills = await getSkill(skillName);
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

	// TODO allow for editing

	return (
		<div className="max-w-2xl mx-auto py-8 space-y-8">
			{/* Breadcrumbs */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/skills" style={{ color: "#1167be" }}>
							Skills
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

			<div className="flex flex-row justify-between items-center mb-4">
				<Link
					href="/skills"
					className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
				>
					<ChevronLeft className="mr-1 h-4 w-4" />
					Back to all skills
				</Link>

				<SkillProgressionSwitchWrapper skillName={skill.name} />
			</div>

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
						<LearningResources skillDataJson={skillDataJson} />
					</CardContent>
				</Card>
			)}
		</div>
	);
}
