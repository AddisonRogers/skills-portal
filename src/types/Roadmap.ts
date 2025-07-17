export type Roadmap = {
  id: string;
  title: string;
  description: string;
  capability: string;
  suggestedBy?: 'manager' | 'role' | null;
  isFavorite?: boolean;
  usersLearning?: number;
};