import apiClient from './client';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../types';

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/auth/login', data);
  return res.data;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>('/auth/register', data);
  return res.data;
}

export async function getProfile(): Promise<User> {
  const res = await apiClient.get<User>('/auth/profile');
  return res.data;
}
