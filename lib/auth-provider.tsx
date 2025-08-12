'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Check if environment variables are configured
  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
                      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url_here';

  useEffect(() => {
    // Only redirect if user is not authenticated and we're not on the home page
    if (!loading && !user && isConfigured) {
      const pathname = window.location.pathname;
      // Allow home page and auth pages to be accessed without authentication
      if (pathname !== '/' && !pathname.startsWith('/auth/') && !pathname.startsWith('/templates')) {
        router.push('/auth/login');
      }
    }
  }, [user, loading, router, isConfigured]);

  // Show configuration warning if environment variables are not set
  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="mt-2">
              <div className="space-y-3">
                <p className="font-medium">Environment Configuration Required</p>
                <p className="text-sm">
                  Please configure your environment variables in <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">.env.local</code>:
                </p>
                <ul className="text-xs space-y-1 ml-4">
                  <li>• NEXT_PUBLIC_SUPABASE_URL</li>
                  <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                  <li>• NEXT_PUBLIC_OPENAI_API_KEY (optional)</li>
                  <li>• Stripe keys (optional)</li>
                </ul>
                <p className="text-xs text-muted-foreground">
                  Check the README.md for detailed setup instructions.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex h-screen">
        <div className="w-64 bg-card border-r border-border p-6">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="border-b border-border p-6">
            <Skeleton className="h-8 w-80" />
          </div>
          <div className="p-6 space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't block rendering for unauthenticated users on public pages
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isPublicPage = pathname === '/' || pathname.startsWith('/auth/') || pathname.startsWith('/templates');
  
  if (!user && !isPublicPage) {
    return null;
  }

  return <>{children}</>;
}