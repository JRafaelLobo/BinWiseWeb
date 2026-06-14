import apiClient from './client';
import type { RecyclingRecord, RecyclingRegisterRequest } from '../types';

export async function registerRecycling(
  data: RecyclingRegisterRequest,
): Promise<RecyclingRecord> {
  const res = await apiClient.post<RecyclingRecord>('/recycling/register', data);
  return res.data;
}

export async function getHistory(): Promise<RecyclingRecord[]> {
  const res = await apiClient.get<RecyclingRecord[]>('/recycling/history');
  return res.data;
}
