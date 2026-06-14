import apiClient from './client';
import type { EducationModule, EducationModuleDetail } from '../types';

export async function getModules(): Promise<EducationModule[]> {
  const res = await apiClient.get<EducationModule[]>('/education/modules');
  return res.data;
}

export async function getModuleById(id: number): Promise<EducationModuleDetail> {
  const res = await apiClient.get<EducationModuleDetail>(`/education/modules/${id}`);
  return res.data;
}
