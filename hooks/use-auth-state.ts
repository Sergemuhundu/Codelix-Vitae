import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { localStorageUtils, LocalResumeData } from '@/lib/local-storage';
import { ResumeData } from '@/types/resume';

export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        // Check for Supabase session or other auth tokens
        const token = localStorage.getItem('auth_token') || 
                     sessionStorage.getItem('auth_token') ||
                     localStorage.getItem('sb-access-token') ||
                     sessionStorage.getItem('sb-access-token');
        
        // For now, we'll consider users authenticated if they have any token
        // In a real implementation, you'd validate the token with your auth service
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const requireAuth = (action: string, callback?: () => void) => {
    if (!isAuthenticated) {
      // Save current action to redirect back after login
      sessionStorage.setItem('pending_action', action);
      sessionStorage.setItem('redirect_after_login', window.location.pathname + window.location.search);
      
      // Show a more user-friendly message
      const message = `Please log in or create an account to ${action}. Your progress will be saved locally.`;
      
      // Show a user-friendly message
      alert(message);
      
      // Redirect to login page
      router.push('/auth/login');
      return false;
    }
    
    if (callback) {
      callback();
    }
    return true;
  };

  const loadLocalData = (): LocalResumeData | null => {
    if (isAuthenticated) {
      // If authenticated, clear local data and return null
      localStorageUtils.clearResumeData();
      return null;
    }
    
    return localStorageUtils.loadResumeData();
  };

  const saveLocalData = (resumeData: ResumeData, selectedTemplate: string) => {
    if (!isAuthenticated) {
      localStorageUtils.saveResumeData(resumeData, selectedTemplate);
    }
  };

  const autoSaveLocalData = (resumeData: ResumeData, selectedTemplate: string) => {
    if (!isAuthenticated) {
      localStorageUtils.autoSave(resumeData, selectedTemplate);
    }
  };

  const clearLocalData = () => {
    localStorageUtils.clearResumeData();
  };

  const hasLocalData = (): boolean => {
    return !isAuthenticated && localStorageUtils.hasSavedData();
  };

  return {
    isAuthenticated,
    isLoading,
    requireAuth,
    loadLocalData,
    saveLocalData,
    autoSaveLocalData,
    clearLocalData,
    hasLocalData,
  };
} 