import { useState, useEffect } from 'react';
import { User, UserFormData } from '@/types/calculator';

const USER_STORAGE_KEY = 'cgpa-calculator-user';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, createdAt: new Date(parsed.createdAt) };
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const login = (userData: UserFormData) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date(),
    };
    setUser(newUser);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<UserFormData>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return {
    user,
    isLoginModalOpen,
    setIsLoginModalOpen,
    login,
    logout,
    updateUser,
  };
};
