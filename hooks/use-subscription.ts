'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/supabase';
import type { Subscription } from '@/lib/supabase';

export interface UseSubscriptionReturn {
  subscription: Subscription | null;
  isLoading: boolean;
  isPremium: boolean;
  isActive: boolean;
  plan: 'free' | 'pro';
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSubscription(): UseSubscriptionReturn {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getUserSubscription(user.id);
      setSubscription(data);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
      setSubscription(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  const isPremium = subscription?.plan === 'pro' && subscription?.status === 'active';
  const isActive = subscription?.status === 'active';
  const plan = subscription?.plan || 'free';

  return {
    subscription,
    isLoading,
    isPremium,
    isActive,
    plan,
    error,
    refetch: fetchSubscription,
  };
} 