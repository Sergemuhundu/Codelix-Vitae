import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { localStorageUtils, LocalResumeData } from '@/lib/local-storage';
import { ResumeData } from '@/types/resume';
import { useAuth } from '@/lib/auth';

export function useAuthState() {
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Use the actual Supabase user state for authentication
  const isAuthenticated = !!user;

  useEffect(() => {
    // Set loading state based on auth loading
    setIsLoading(authLoading);
  }, [authLoading]);

  const requireAuth = useCallback((action: string, callback?: () => void) => {
    if (!isAuthenticated) {
      // Save current action to redirect back after login
      sessionStorage.setItem('pending_action', action);
      sessionStorage.setItem('redirect_after_login', window.location.pathname + window.location.search);
      
      // Redirect to login page without showing any message
      router.push('/auth/login');
      return false;
    }
    
    if (callback) {
      callback();
    }
    return true;
  }, [isAuthenticated, router]);

  const loadLocalData = useCallback((): LocalResumeData | null => {
    // Always try to load local data first, regardless of authentication status
    // This ensures that local data is preserved when user logs in
    return localStorageUtils.loadResumeData();
  }, []);

  const saveLocalData = useCallback((resumeData: ResumeData, selectedTemplate: string) => {
    if (!isAuthenticated) {
      localStorageUtils.saveResumeData(resumeData, selectedTemplate);
    }
  }, [isAuthenticated]);

  const autoSaveLocalData = useCallback((resumeData: ResumeData, selectedTemplate: string) => {
    // Auto-save for non-authenticated users or authenticated users who have local data
    if (!isAuthenticated || localStorageUtils.hasSavedData()) {
      localStorageUtils.autoSave(resumeData, selectedTemplate);
    }
  }, [isAuthenticated]);

  const clearLocalData = useCallback(() => {
    localStorageUtils.clearResumeData();
  }, []);

  const clearLocalDataAfterSave = useCallback(() => {
    // Clear local data after it has been successfully saved to authenticated user's account
    if (isAuthenticated) {
      localStorageUtils.clearResumeData();
    }
  }, [isAuthenticated]);

  const hasLocalData = useCallback((): boolean => {
    return localStorageUtils.hasSavedData();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    requireAuth,
    loadLocalData,
    saveLocalData,
    autoSaveLocalData,
    clearLocalData,
    clearLocalDataAfterSave,
    hasLocalData,
  };
} 