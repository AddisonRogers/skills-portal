'use client';

import { useState, useEffect } from 'react';
import { 
  getCurrentLearningRoadmap, 
  getSuggestedRoadmaps, 
  getAllRoadmaps, 
  getAllCapabilities,
} from './serverFunctions';
import { 
  Search, 
  Filter, 
  Star, 
  Briefcase, 
  Users, 
  User 
} from 'lucide-react';
import {Roadmap} from "@/types/Roadmap";
import RoadmapCard from "@/components/roadmapCard";

export default async function LearnPage() {
  const currentRoadmap = await getCurrentLearningRoadmap();
  const suggestedRoadmaps = await getSuggestedRoadmaps();
  const allRoadmapsData = await getAllRoadmaps();
  const capabilities = await getAllCapabilities();

  const [allRoadmaps, setAllRoadmaps] = useState<Roadmap[]>(allRoadmapsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    suggestedByManager: false,
    isFavorite: false,
    capability: ''
  });


  // Apply filters and search
  useEffect(() => {
    const applyFiltersAndSearch = async () => {
      const filteredRoadmaps = await getAllRoadmaps({
        suggestedByManager: filters.suggestedByManager,
        isFavorite: filters.isFavorite,
        capability: filters.capability,
        searchTerm
      });
      setAllRoadmaps(filteredRoadmaps);
    };

    applyFiltersAndSearch();
  }, [filters, searchTerm]);

  // Generate random avatar URLs for demo purposes
  const generateAvatarUrl = (index: number) => {
    return `https://i.pravatar.cc/40?img=${index}`;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-fsp-core-teal mb-8">Learn</h1>
      
      {/* Continue Learning Section */}
      {currentRoadmap && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">{currentRoadmap.title}</h3>
                <div className="mb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {currentRoadmap.capability}
                  </span>
                </div>
                <p className="text-gray-600">{currentRoadmap.description}</p>
              </div>
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-2">
                  {[...Array(Math.min(3, currentRoadmap.usersLearning || 0))].map((_, i) => (
                    <img 
                      key={i} 
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white" 
                      src={generateAvatarUrl(i + 1)} 
                      alt={`User ${i + 1}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {currentRoadmap.usersLearning} {currentRoadmap.usersLearning === 1 ? 'person' : 'people'} learning
                </span>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-fsp-core-teal text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                Continue
              </button>
            </div>
          </div>
        </section>
      )}
      
      {/* Suggested Roadmaps Section */}
      {suggestedRoadmaps.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Suggested Roadmaps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedRoadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        </section>
      )}
      
      {/* All Roadmaps Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Roadmaps</h2>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="relative flex-grow mb-4 md:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
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
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No roadmaps found matching your criteria.</p>
          </div>
        )}
      </section>
    </main>
  );
}