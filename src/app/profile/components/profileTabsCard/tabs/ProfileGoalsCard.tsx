"use client";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardAction,
} from "@/components/ui/card";
import { UserGoals } from "@/types/Goals";
import ProgressWheel from "../InfoAddOns/ProgressWheel";

const goals: UserGoals[] = [
    {
        id: 0,
        goalName: "Complete AZ-900",
        goalDescription: "I want to complete the AZ-900 certification so that I have a greater understan of cloud concepts.",
        status: { id: 0, label: "Active" },
        due: new Date(),
    },
    {
        id: 1,
        goalName: "Develop Frontend Skills",
        goalDescription: "Working on improving my understanding and application of React and Blazor. gf sdsfre rew as gtreg fdsfsd ds ",
        status: { id: 0, label: "Completed" },
        due: new Date(),
    },
    {
        id: 2,
        goalName: "Learn Docker",
        goalDescription: "I want to learn Docker to containerize applications for consistent environments across development and production.",
        status: { id: 0, label: "Active" },
        due: new Date(),
    }
];

const statusColours: Record<string, string> = {
	Active: "bg-blue-100 text-blue-700",
	Completed: "bg-green-100 text-green-700",
};

export default function ProfileGoalsCard() {
    return (
        <div>
            {goals.map((goal) => (
                <Card key={goal.id} className="mx-2 my-2 p-4 relative">
                    <CardHeader className="gap-0">
                        <div className="grid grid-cols-[1fr_auto] items-center w-full gap-x-3 gap-y-4">
                            <div className="min-w-0 pr-4">
                                <CardTitle className="flex items-center mb-0">
                                    <a className="mr-3">{goal.goalName}</a>
                                </CardTitle>
                                <CardDescription className="mt-1 opacity-80">
                                    {goal.goalDescription}
                                </CardDescription>
                                <CardDescription className="mt-1">
                                    <div>{goal.due.toDateString()}</div>
                                </CardDescription>
                            </div>
                            <ProgressWheel progress={23} />
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}