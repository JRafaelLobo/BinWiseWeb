import apiClient from './client';
import type { ClassifyResponse, WasteCategory } from '../types';

export async function classifyWaste(image: File): Promise<ClassifyResponse> {
  const formData = new FormData();
  formData.append('image', image);
  const res = await apiClient.post<ClassifyResponse>('/waste/classify', formData);
  return res.data;
}

export async function getCategories(): Promise<WasteCategory[]> {
  const res = await apiClient.get<WasteCategory[]>('/waste/categories');
  return res.data;
}
