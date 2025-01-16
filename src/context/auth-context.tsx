import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data
const mockUser: User = {
  id: '1',
  email: 'demo@example.com',
  created_at: new Date().toISOString()
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial auth check
    setLoading(false);
  }, []);

  const signIn = (email: string, password: string) => {
    // Mock sign in
    setUser(mockUser);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}