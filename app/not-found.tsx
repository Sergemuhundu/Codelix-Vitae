'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  FileText, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function NotFound() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4 py-12">
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
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription className="text-lg">
              Sorry, we couldn't find the page you're looking for.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Details */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                The page you requested doesn't exist or has been moved. 
                Check the URL for typos or use the navigation below.
              </AlertDescription>
            </Alert>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button asChild className="h-auto p-4 flex flex-col items-center gap-2">
                <Link href="/">
                  <Home className="h-5 w-5" />
                  <span>Go to Home</span>
                </Link>
              </Button>
              
              {user ? (
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Link href="/dashboard">
                    <FileText className="h-5 w-5" />
                    <span>Go to Dashboard</span>
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Link href="/auth/login">
                    <FileText className="h-5 w-5" />
                    <span>Sign In</span>
                  </Link>
                </Button>
              )}
            </div>

            {/* Popular Pages */}
            <div className="text-left">
              <h3 className="font-medium mb-3">Popular Pages:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <Link 
                  href="/" 
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                {user && (
                  <>
                    <Link 
                      href="/dashboard/builder" 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Resume Builder
                    </Link>
                    <Link 
                      href="/dashboard/profile" 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link 
                      href="/dashboard/billing" 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Billing
                    </Link>
                  </>
                )}
                {!user && (
                  <>
                    <Link 
                      href="/auth/login" 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Sign In
                    </Link>
                    <Link 
                      href="/auth/signup" 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
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
                    <Search className="h-4 w-4 mr-2" />
                    Help Center
                  </Link>
                </Button>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.history.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Error 404 • Page Not Found
          </p>
          <p className="mt-1">
            If you believe this is an error, please{' '}
            <Link href="/contact" className="underline hover:text-foreground">
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 