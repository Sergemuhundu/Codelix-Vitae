'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Home, 
  RefreshCw, 
  FileText, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">CodelixVitae</h1>
          </div>
          <p className="text-muted-foreground">
            AI-Powered Resume Builder
          </p>
        </div>

        {/* Main Content */}
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Oops! Something went wrong</CardTitle>
            <CardDescription className="text-lg">
              We encountered an error while loading this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Details */}
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error.message || 'An unexpected error occurred. Please try again.'}
              </AlertDescription>
            </Alert>

            {/* Error ID for debugging */}
            {error.digest && (
              <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                Error ID: {error.digest}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={reset} className="h-auto p-4 flex flex-col items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                <span>Try Again</span>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link href="/">
                  <Home className="h-5 w-5" />
                  <span>Go to Home</span>
                </Link>
              </Button>
            </div>

            {/* Help Section */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/contact">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/help">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Help Center
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            If this problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
} 