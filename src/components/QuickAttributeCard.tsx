import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { QuickAttribute } from "@/types/QuickAttribute";

const quickAttributes: QuickAttribute[] = [
	{
		id: 0,
		name: "Skills",
		value: 4,
		description: "With evidence",
	},
	{
		id: 1,
		name: "Learning paths",
		value: 5,
		description: "2 in progress",
	},
	{
		id: 2,
		name: "Projects",
		value: 3,
		description: "2 this year",
	},
];

export default async function QuickAttributeCard() {
	return (
		<div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 my-4">
			{quickAttributes.map((qAttribute) => {
				return (
					<Card
						key={qAttribute.id}
						className="h-full p-1 flex flex-col justify-between gap-3"
					>
						<CardHeader className="p-2 pb-0">
							<CardTitle className="text-base font-semibold min-h-12">
								{qAttribute.name}
							</CardTitle>
						</CardHeader>
						<CardContent className="p-2 py-0">
							<p className="text-xl font-bold">{qAttribute.value}</p>
						</CardContent>
						<CardFooter className="p-2 pt-0">
							<p className="text-sm">{qAttribute.description}</p>
						</CardFooter>
					</Card>
				);
			})}
		</div>
	);
}
