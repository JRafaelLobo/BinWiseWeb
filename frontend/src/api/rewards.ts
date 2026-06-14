import apiClient from './client';
import type { UserReward } from '../types';

export async function getUserRewards(): Promise<UserReward[]> {
  const res = await apiClient.get<UserReward[]>('/rewards/user');
  return res.data;
}
