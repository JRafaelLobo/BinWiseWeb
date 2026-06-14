import apiClient from './client';
import type { UserStats } from '../types';

export async function getUserStats(): Promise<UserStats> {
  const res = await apiClient.get<UserStats>('/stats/user');
  return res.data;
}
