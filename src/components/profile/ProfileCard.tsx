import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import QuickAttributeCard from "../QuickAttributeCard";

export default function ProfileCard() {
	return (
		<div className="pl-6 w-full max-w-md">
			<Card>
				<CardHeader className="flex justify-between items-start">
					<div className="flex items-center gap-x-4">
						<Avatar className="size-12">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<CardTitle className="text-xl font-semibold">Jon Doe</CardTitle>
							<CardDescription>Cloud Engineer</CardDescription>
						</div>
					</div>
					<CardAction className="bg-primary text-white rounded-full px-3 py-1 text-sm font-semibold">
						Edit
					</CardAction>
				</CardHeader>
				<CardContent>
					<QuickAttributeCard />
				</CardContent>
			</Card>
		</div>
	);
}
