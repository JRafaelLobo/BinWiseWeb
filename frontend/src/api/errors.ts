import { AxiosError } from 'axios';

// Extrae un mensaje legible de un error de axios.
// NestJS suele responder { message: string | string[] }.
export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string | string[] } | undefined;
    if (data?.message) {
      return Array.isArray(data.message) ? data.message.join(' ') : data.message;
    }
  }
  return fallback;
}
