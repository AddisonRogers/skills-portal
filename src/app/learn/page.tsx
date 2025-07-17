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
import ContinueLearningSection from "@/app/learn/continueLearningSection";
import SuggestedRoadmapsSection from "@/app/learn/SuggestedRoadmapsSection";
import AllRoadmapsSection from "@/app/learn/AllRoadmapsSection";

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


  // // Apply filters and search
  // useEffect(() => {
  //   const applyFiltersAndSearch = async () => {
  //     const filteredRoadmaps = await getAllRoadmaps({
  //       suggestedByManager: filters.suggestedByManager,
  //       isFavorite: filters.isFavorite,
  //       capability: filters.capability,
  //       searchTerm
  //     });
  //     setAllRoadmaps(filteredRoadmaps);
  //   };
  //
  //   applyFiltersAndSearch();
  // }, [filters, searchTerm]);

  // Generate random avatar URLs for demo purposes
  const generateAvatarUrl = (index: number) => {
    return `https://i.pravatar.cc/40?img=${index}`;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-fsp-core-teal mb-8">Learn</h1>
      
      {/* Continue Learning Section */}
      <ContinueLearningSection currentRoadmap={currentRoadmap} />
      
      {/* Suggested Roadmaps Section */}
      {suggestedRoadmaps.length > 0 && (
        <SuggestedRoadmapsSection suggestedRoadmaps={suggestedRoadmaps} />
      )}
      
      <AllRoadmapsSection />
    </main>
  );
}