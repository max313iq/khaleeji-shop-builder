
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setAuthToken, removeAuthToken } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isStoreOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authAPI.getProfile();
        setUser(userData);
      } catch (error) {
        console.log('لا يوجد مستخدم مسجل دخوله');
        removeAuthToken();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      setAuthToken(response.token);
      setUser(response.user);
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, role?: string) => {
    try {
      const response = await authAPI.signup({ name, email, password, role });
      setAuthToken(response.token);
      setUser(response.user);
    } catch (error) {
      console.error('خطأ في إنشاء الحساب:', error);
      throw error;
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isStoreOwner: user?.role === 'store-owner',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
