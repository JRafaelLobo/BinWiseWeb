// Modelos compartidos que reflejan las respuestas del backend.

export interface User {
  id: number;
  name: string;
  email: string;
  totalPoints: number;
  level: number;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface WasteCategory {
  id: number;
  name: string;
  description: string | null;
  color: string | null;
}

export interface UserStats {
  userId: number;
  totalRecycledItems: number;
  totalPoints: number;
  currentLevel: number;
  rewardsEarned: number;
  mostRecycledCategory: string;
  lastRecyclingDate: string | null;
}

export interface ClassifyResponse {
  wasteName: string;
  category: WasteCategory;
  confidence: number;
  recommendation: string;
}

export interface RecyclingRegisterRequest {
  wasteName: string;
  categoryId: number;
  quantity: number;
  notes?: string;
}

export interface RecyclingRecord {
  id: number;
  wasteName: string;
  category: WasteCategory;
  quantity: number;
  pointsEarned: number;
  recycledAt: string;
  notes: string | null;
}

export interface PointsResponse {
  userId: number;
  totalPoints: number;
  pointsThisMonth: number;
}

export interface LevelResponse {
  userId: number;
  currentLevel: number;
  currentLevelName: string;
  totalPoints: number;
  pointsToNextLevel: number;
  progressPercentage: number;
}

export interface UserReward {
  id: number;
  name: string;
  description: string;
  type: string;
  earnedAt: string;
}

export interface EducationModule {
  id: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  completed: boolean;
}

export interface EducationModuleDetail extends EducationModule {
  content: string;
}
