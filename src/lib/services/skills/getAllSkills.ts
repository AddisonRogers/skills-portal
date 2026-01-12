import { getSkills } from "@/db/repositories/skills";

export default async function getAllSkills() {
	const skills = await getSkills();
}
