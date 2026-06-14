import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './auth-context';
import { TOKEN_KEY } from '../api/client';
import * as authApi from '../api/auth';
import type { User } from '../types';

const USER_KEY = 'binwise_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, recuperamos la sesión guardada (si existe).
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    if (storedUser && token) {
      setUser(JSON.parse(storedUser) as User);
    }
    setLoading(false);
  }, []);

  function saveSession(token: string, user: User) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setUser(user);
  }

  async function login(email: string, password: string) {
    const res = await authApi.login({ email, password });
    saveSession(res.token, res.user);
  }

  async function register(name: string, email: string, password: string) {
    const res = await authApi.register({ name, email, password });
    saveSession(res.token, res.user);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
