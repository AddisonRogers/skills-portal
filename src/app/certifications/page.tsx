import { getAllCertifications } from "./serverFunctions";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

function skillNameToSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

export default async function CertificationsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

   const roadmapsWithCertifications = await getAllCertifications(session?.user?.email || null);
    
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Certifications Page</h1>
            
            {roadmapsWithCertifications.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                        No roadmaps available.
                    </p>
                </div>
            ) : (
                <div className="grid gap-8">
					{Array.from(roadmapsWithCertifications.entries()).map(
						([roadmapId, certifications]) => (
                            <Card className="overflow-hidden">
                                <CardHeader className="bg-muted/50">
                                    <CardTitle>
                                        {certifications[0]?.roadmapName || `Roadmap ${roadmapId}`}
                                    </CardTitle>
                                    {certifications[0]?.roadmapDescription && (
                                        <CardDescription>
                                            {certifications[0].roadmapDescription}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent className="pt-6">
                                    {certifications.length === 0 ? (
										<p className="text-muted-foreground text-sm">
											No skills available for this roadmap.
										</p>
									) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
											{certifications.map((certification) => (
												<Link
													key={certification.id}
													href={`/skills/${certification.machineName || skillNameToSlug(certification.name)}`}
													className="block"
												>
													<Card className="h-full hover:shadow-md transition-shadow relative">
														{certification.level && (
															<Badge
																variant="secondary"
																className="absolute top-2 right-2 z-10"
															>
																Level {certification.level}
															</Badge>
														)}
														<CardHeader className="pb-2">
															<CardTitle className="text-lg pr-16">
																{certification.name}
															</CardTitle>
															{certification.madeBy && (
																<Badge variant="outline" className="mt-1">
																	{certification.madeBy}
																</Badge>
															)}
														</CardHeader>
														<CardContent>
															{certification.description ? (
																<p className="text-sm text-muted-foreground line-clamp-3">
																	{certification.description}
																</p>
															) : (
																<p className="text-sm text-muted-foreground italic">
																	No description available
																</p>
															)}
														</CardContent>
													</Card>
												</Link>
											))}
										</div>
									)}
                                </CardContent>
                        </Card>
                        )
                    )}
                </div>
            )}
        </div>
    );
}