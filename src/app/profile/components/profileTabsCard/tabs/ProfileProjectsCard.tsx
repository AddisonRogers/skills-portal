 "use client";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	CardAction,
} from "@/components/ui/card";
import { UserProjects } from "@/types/Projects";
import { cn } from "@/lib/utils";

const projects: UserProjects[] = [
	{
		id: 0,
		projectName: "Customer Portal Redesign",
        projectDescription: "Redesigned the customer self-service portal UI and migrated legacy components to a modern stack.",
		Status: { id: 0, value: 1, label: "UpComing" },
		lastUpdated: new Date("2025-10-01"),
	},
	{
		id: 1,
		projectName: "API Integration For Billing System",
        projectDescription: "Integrated external billing provider API’s and implemented retry logic and observability.",
		Status: { id: 0, value: 3, label: "Completed" },
		lastUpdated: new Date("2025-11-15"),
	},
    {
        id: 2,
        projectName: "AI Chatbot Implementation",
        projectDescription: "Developed and deployed an AI-powered chatbot to enhance customer support and engagement on the platform.",
        Status: { id: 0, value: 2, label: "Active" },
        lastUpdated: new Date("2026-07-05"),
    },
];

const statusColours: Record<string, string> = {
	UpComing: "bg-red-100 text-red-700",
	Active: "bg-blue-100 text-blue-700",
	Completed: "bg-green-100 text-green-700",
};

const OrderProjectsByDate = (a: UserProjects, b: UserProjects) => {
    return b.lastUpdated.getTime() - a.lastUpdated.getTime();
}

const formatMonthYear = (d: Date | string) => {
    if (!d) return "";
    const date = typeof d === "string" ? new Date(d) : d;
    try {
        return date.toLocaleString(undefined, { month: "short", year: "numeric" });
    } catch (e) {
        return "";
    }
};

const groups = projects
    .slice()
    .sort(OrderProjectsByDate)
    .reduce<Record<string, UserProjects[]>>((acc, p) => {
        const d = p.lastUpdated;
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(p);
        return acc;
    }, {});

const sortedKeys = Object.keys(groups).sort((a, b) => {
    return new Date(b + "-01").getTime() - new Date(a + "-01").getTime();
});

 export default function ProfileProjectsCard() {
    return (
        <div>
            {sortedKeys.map((key) => (
                <div key={key}>
                    <div className="mt-6 mb-2 px-4 text-sm font-semibold text-muted-foreground">
                        {formatMonthYear(new Date(key + "-01"))}
                    </div>
                    {groups[key].map((project) => (
                        <Card key={project.id} className="mx-2 my-2 p-4 relative">
                            <CardHeader className="gap-0">
                                <div className="flex items-center">
                                    <div className="flex-1 min-w-0 pr-20">
                                        <CardTitle className="mb-0">
                                            <a className="mr-3 block truncate">{project.projectName}</a>
                                        </CardTitle>
                                        <CardDescription className="mt-1 opacity-80">
                                            {project.projectDescription}
                                        </CardDescription>
                                        <CardDescription className="mt-1">
                                            {formatMonthYear(project.lastUpdated)}
                                        </CardDescription>
                                    </div>
                                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                                        <CardDescription>
                                            <a
                                                className={cn(
                                                    "rounded-2xl px-2 py-0.5 font-semibold whitespace-nowrap",
                                                    statusColours[project.Status.label],
                                                )}>{project.Status.label}</a>
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            ))}
        </div>
    );
}