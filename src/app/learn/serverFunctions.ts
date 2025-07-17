import roadmapsData from '@/dummyData/roadmaps.json';
import skillsData from '@/dummyData/skills.json';
import positionsData from '@/dummyData/positions.json';
import linksData from '@/dummyData/links.json';
import { Roadmap } from '@/types/Roadmap';

// Extended roadmap type with additional properties needed for the Learn page


// Mock data for roadmaps with extended properties
const extendedRoadmaps: Roadmap[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Learn the skills needed to become a frontend developer',
    capability: 'Web Development',
    suggestedBy: 'manager',
    isFavorite: true,
    usersLearning: 42
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    description: 'Master backend development technologies and practices',
    capability: 'Software Engineering',
    suggestedBy: 'role',
    isFavorite: false,
    usersLearning: 38
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    description: 'Become proficient in both frontend and backend development',
    capability: 'Web Development',
    suggestedBy: null,
    isFavorite: false,
    usersLearning: 65
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Learn DevOps practices and tools for efficient software delivery',
    capability: 'Cloud Engineering',
    suggestedBy: null,
    isFavorite: true,
    usersLearning: 27
  },
  {
    id: 'database-administrator',
    title: 'Database Administrator',
    description: 'Master database management and optimization techniques',
    capability: 'Data Engineering',
    suggestedBy: 'role',
    isFavorite: false,
    usersLearning: 19
  }
];

// Get the current user's learning roadmap
export async function getCurrentLearningRoadmap(): Promise<Roadmap | null> {
  // In a real application, this would fetch from an API based on the authenticated user
  // For now, we'll return a mock roadmap
  return extendedRoadmaps.find(roadmap => roadmap.id === 'frontend-developer') || null;
}

// Get suggested roadmaps for the user
export async function getSuggestedRoadmaps(): Promise<Roadmap[]> {
  // In a real application, this would fetch from an API based on the authenticated user
  // For now, we'll return roadmaps that have a suggestedBy value or are favorites
  return extendedRoadmaps.filter(roadmap => roadmap.suggestedBy || roadmap.isFavorite);
}

// Get all roadmaps with optional filtering
export async function getAllRoadmaps(filters?: {
  suggestedByManager?: boolean;
  isFavorite?: boolean;
  capability?: string;
  searchTerm?: string;
}): Promise<Roadmap[]> {
  let filteredRoadmaps = [...extendedRoadmaps];
  
  if (filters) {
    if (filters.suggestedByManager) {
      filteredRoadmaps = filteredRoadmaps.filter(roadmap => roadmap.suggestedBy === 'manager');
    }
    
    if (filters.isFavorite) {
      filteredRoadmaps = filteredRoadmaps.filter(roadmap => roadmap.isFavorite);
    }
    
    if (filters.capability) {
      filteredRoadmaps = filteredRoadmaps.filter(roadmap => 
        roadmap.capability.toLowerCase() === filters.capability?.toLowerCase()
      );
    }
    
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredRoadmaps = filteredRoadmaps.filter(roadmap => 
        roadmap.title.toLowerCase().includes(searchTerm) || 
        roadmap.description.toLowerCase().includes(searchTerm)
      );
    }
  }
  
  return filteredRoadmaps;
}

// Get all available capabilities
export async function getAllCapabilities(): Promise<string[]> {
  // Extract unique capabilities from roadmaps
  const capabilities = new Set(extendedRoadmaps.map(roadmap => roadmap.capability));
  return Array.from(capabilities);
}