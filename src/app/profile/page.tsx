import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTabsCard from "@/components/profile/profileTabsCard/ProfileTabsCard";

export default async function Profile() {
	return (
		<div className="w-full h-full mx-auto">
			<div className="mb-6 mt-2 border-b-2">
				<h1 className="text-2xl font-semibold ml-6">Profile</h1>
				<p className="text-sm text-muted-foreground mb-2 ml-6">
					View your skills, learning paths and projects
				</p>
			</div>
			<div className="flex gap-6">
				<div className="w-full max-w-md">
					<ProfileCard />
				</div>
				<div className="w-full mx-10">
					<ProfileTabsCard />
				</div>
			</div>
		</div>
	);
}
