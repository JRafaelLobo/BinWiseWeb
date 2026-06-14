import apiClient from './client';
import type { LevelResponse, PointsResponse } from '../types';

export async function getPoints(): Promise<PointsResponse> {
  const res = await apiClient.get<PointsResponse>('/gamification/points');
  return res.data;
}

export async function getLevel(): Promise<LevelResponse> {
  const res = await apiClient.get<LevelResponse>('/gamification/level');
  return res.data;
}
