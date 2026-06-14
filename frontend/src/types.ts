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
