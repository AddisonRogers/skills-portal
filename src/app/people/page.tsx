import { getAllPeopleWithDetails } from "./serverFunctions";
import PeopleClient from "./PeopleClient";

export default async function PeoplePage() {
	const people = await getAllPeopleWithDetails();

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-6">People</h1>
			<PeopleClient initialPeople={people} />
		</div>
	);
}
