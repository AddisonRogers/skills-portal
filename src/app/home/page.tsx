import { getJobTitleForUser } from "@/db/repositories/roles";
import HomePage from "./home-client";

export default async function Page() {
	const email = "jack.bell@skills.local";
	const userRole = await getJobTitleForUser(email);

	return <HomePage userRole={userRole} />;
}
