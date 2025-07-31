import {
	getPopularSkillsStats,
	getProficiencyDistributionStats,
	getSkillsOverTimeStats,
} from "@/app/admin/stats/serverFunctions";
import MostPopularSkillsChart from "@/app/admin/stats/MostPopularSkillsChart";
import ProficiencyDistributionChart from "@/app/admin/stats/ProficiencyDistributionChart";
import SkillsOverTimeChart from "@/app/admin/stats/SkillsOverTimeChart";

export default async function StatsPage() {
	// Get skills by popularity (most acquired)
	const popularSkillsData = await getPopularSkillsStats();
	const proficiencyData = await getProficiencyDistributionStats();
	const getAllStatsData = await getSkillsOverTimeStats();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Statistics & Analytics</h2>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				<MostPopularSkillsChart {...popularSkillsData} />

				<ProficiencyDistributionChart {...proficiencyData} />
			</div>

			<SkillsOverTimeChart {...getAllStatsData} />
		</div>
	);
}
