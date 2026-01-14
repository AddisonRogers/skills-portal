import InfoTabs from "./components/profileTabsCard/InfoTabs";
import ProfileCard from "./components/profileTabsCard/ProfileTabsCard";
import ProfileTabsCard from "./components/profileTabsCard/ProfileTabsCard";

export default async function ProfileClient() {
	return (
		<div className="w-full h-full mx-auto">
			<div className="flex gap-6">
				<div className="w-full max-w-md">
					<InfoTabs />
				</div>
				{/* <div className="w-full max-w-md">
					<ProfileCard />
				</div> */}
				<div className="w-full mx-10">
					<ProfileTabsCard />
				</div>
			</div>
		</div>
	);
}
