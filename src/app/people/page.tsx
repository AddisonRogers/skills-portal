import getAllSkills from "@/lib/services/skills/getAllSkills";
import PeopleClient from "./PeopleClient";
import getAllPeople from "@/lib/services/users/getAllPeople";

export default async function PeoplePage() {
	const people = await getAllPeople();
	const skills = await getAllSkills();

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-6">People</h1>
			<PeopleClient initialPeople={people} initialSkills={skills} />
		</div>
	);
}
