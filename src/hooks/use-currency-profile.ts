import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';
import { mockCurrencyProfiles } from '../data/mock-currency-profiles';
import type { CurrencyProfile } from '../types/currency-profile';

export function useCurrencyProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CurrencyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Simulate API delay
    const timer = setTimeout(() => {
      const mockProfile = mockCurrencyProfiles.find(p => p.userId === user.id);
      
      if (!mockProfile) {
        navigate('/create-currency-profile');
        return;
      }

      setProfile(mockProfile);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return { profile, setProfile, loading };
}