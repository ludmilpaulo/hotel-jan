"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'GUEST' | 'STAFF' | 'MANAGER' | 'ADMIN';
  is_active: boolean;
  date_joined: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  isManager: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
  role: 'GUEST' | 'STAFF' | 'MANAGER' | 'ADMIN';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'https://taki.pythonanywhere.com/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common['Authorization'] = `Token ${savedToken}`;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/auth/check/`);
      if (response.data.authenticated) {
        setUser(response.data.user);
      } else {
        localStorage.removeItem('authToken');
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
      setToken(null);
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/auth/login/`, {
        username,
        password,
      });

      const { token: authToken, user: userData } = response.data;
      
      localStorage.setItem('authToken', authToken);
      setToken(authToken);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.non_field_errors?.[0] || 
                           error.response?.data?.detail || 
                           'Credenciais inválidas. Tente novamente.';
        return { success: false, error: errorMessage };
      }
      return { success: false, error: 'Erro de conexão. Tente novamente.' };
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Attempting registration with:', userData);
      const response = await axios.post(`${API_BASE_URL}/auth/auth/register/`, userData);
      console.log('Registration response:', response.data);

      const { token: authToken, user: newUser } = response.data;
      
      localStorage.setItem('authToken', authToken);
      setToken(authToken);
      setUser(newUser);
      axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
      
      console.log('Registration successful');
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        
        // Extract specific error messages
        const errorData = error.response?.data;
        let errorMessage = 'Erro ao criar conta. Verifique os dados e tente novamente.';
        
        if (errorData?.username?.[0]) {
          errorMessage = `Nome de usuário: ${errorData.username[0]}`;
        } else if (errorData?.email?.[0]) {
          errorMessage = `Email: ${errorData.email[0]}`;
        } else if (errorData?.password?.[0]) {
          errorMessage = `Senha: ${errorData.password[0]}`;
        } else if (errorData?.non_field_errors?.[0]) {
          errorMessage = errorData.non_field_errors[0];
        } else if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
        
        return { success: false, error: errorMessage };
      }
      return { success: false, error: 'Erro de conexão. Tente novamente.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    
    // Call logout endpoint
    axios.post(`${API_BASE_URL}/auth/auth/logout/`).catch(console.error);
  };

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'ADMIN';
  const isStaff = ['STAFF', 'MANAGER', 'ADMIN'].includes(user?.role || '');
  const isManager = ['MANAGER', 'ADMIN'].includes(user?.role || '');

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated,
    isAdmin,
    isStaff,
    isManager,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
