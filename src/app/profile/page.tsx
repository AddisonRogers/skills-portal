import Page from "../page";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-6">Profile</h1>
			<ProfileClient />
		</div>
	);
}
