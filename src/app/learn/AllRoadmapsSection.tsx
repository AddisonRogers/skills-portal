import {Search} from "lucide-react";
import RoadmapCard from "@/components/roadmapCard";

export default function AllRoadmapsSection() {

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">All Roadmaps</h2>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-grow mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400"/>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-fsp-core-teal focus:border-fsp-core-teal sm:text-sm"
              placeholder="Search roadmaps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <input
                id="manager-filter"
                type="checkbox"
                className="h-4 w-4 text-fsp-core-teal focus:ring-fsp-core-teal border-gray-300 rounded"
                checked={filters.suggestedByManager}
                onChange={(e) => setFilters({...filters, suggestedByManager: e.target.checked})}
              />
              <label htmlFor="manager-filter" className="ml-2 block text-sm text-gray-900">
                Manager Suggested
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="favorite-filter"
                type="checkbox"
                className="h-4 w-4 text-fsp-core-teal focus:ring-fsp-core-teal border-gray-300 rounded"
                checked={filters.isFavorite}
                onChange={(e) => setFilters({...filters, isFavorite: e.target.checked})}
              />
              <label htmlFor="favorite-filter" className="ml-2 block text-sm text-gray-900">
                Favorited
              </label>
            </div>

            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-fsp-core-teal focus:border-fsp-core-teal sm:text-sm rounded-md"
              value={filters.capability}
              onChange={(e) => setFilters({...filters, capability: e.target.value})}
            >
              <option value="">All Capabilities</option>
              {capabilities.map((capability) => (
                <option key={capability} value={capability}>
                  {capability}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Roadmaps Grid */}
      {allRoadmaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap}/>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No roadmaps found matching your criteria.</p>
        </div>
      )}
    </section>
  )
}