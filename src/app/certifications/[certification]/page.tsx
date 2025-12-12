import { getCertification } from "@/db/repositories/certifications";
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
import { ExternalLink, ChevronLeft } from "lucide-react";
import Link from "next/link";
import SkillProgressionSwitch from "@/components/SkillProgressionSwitch/SkillProgressionSwitch";
import SkillProgressionSwitchWrapper from "@/components/SkillProgressionSwitch/SkillProgressionSwitchWrapper";

export default async function IndividualCertificationPage({
	params,
}: {
	params: Promise<{ certification: string }>;
}) {
	const { certification: certificationName } = await params;
	const certifications = await getCertification(certificationName);
	const certification = certifications?.[0];

	if (!certification || !certification.blobUrl)
		return (
			<Card className="max-w-2xl mx-auto mt-12">
				<CardContent>
					<>No data</>
				</CardContent>
			</Card>
		);

	const certificationData = await fetchBlob(certification.blobUrl);
	const certificationDataJson = JSON.parse(certificationData);

	// TODO allow for editing

	return (
		<div className="max-w-2xl mx-auto py-8 space-y-8">
			{/* Breadcrumbs */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/certifications" style={{ color: "#1167be" }}>
							Certifications
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink
							href="#"
							style={{ color: "#1167be" }}
							aria-current="page"
						>
							{certification.name}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex flex-row justify-between items-center mb-4">
				<Link
					href="/certifications"
					className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
				>
					<ChevronLeft className="mr-1 h-4 w-4" />
					Back to all certifications
				</Link>

				<SkillProgressionSwitchWrapper skillName={certification.name} />
			</div>

			<h1 className="mb-2">{certification.name}</h1>
			{certification.description ? (
				<p>{certification.description}</p>
			) : (
				<p className="text-muted-foreground text-sm">No description.</p>
			)}
			{certificationDataJson?.urls && certificationDataJson.urls.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Learning Resources</CardTitle>
						<CardDescription>
							Click on the links below to learn more about this certification.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{certificationDataJson.urls.map((url, index) => (
								<div
									key={index}
									className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
								>
									<ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
									<Button
										asChild
										variant="link"
										className="h-auto p-0 text-left justify-start"
									>
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
