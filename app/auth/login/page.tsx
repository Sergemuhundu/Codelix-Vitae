'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { GoogleSignInButton } from '@/components/auth/google-signin-button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signInWithGoogle, user } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (user) {
      // Check if there's a pending action that requires authentication
      const pendingAction = sessionStorage.getItem('pending_action');
      const redirectAfterLogin = sessionStorage.getItem('redirect_after_login');
      
      if (pendingAction && redirectAfterLogin) {
        // Clear the pending action and redirect back to where they were
        sessionStorage.removeItem('pending_action');
        sessionStorage.removeItem('redirect_after_login');
        router.push(redirectAfterLogin);
      } else {
        // Default redirect to home page
        router.push('/');
      }
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // Don't redirect here - let the useEffect handle it when user state changes
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');

    const { error } = await signInWithGoogle();

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
    // Don't redirect here - let the useEffect handle it when user state changes
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="w-full max-w-md">
                 <div className="text-center mb-8">
           <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
               <FileText className="h-5 w-5 text-primary-foreground" />
             </div>
             <h1 className="text-2xl font-bold">CVAdapter</h1>
           </Link>
           <p className="text-muted-foreground">
             AI-Powered Resume Builder
           </p>
         </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-right">
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleSignInButton
              onClick={handleGoogleSignIn}
              loading={googleLoading}
            />

                         <div className="mt-6 text-center text-sm">
               <span className="text-muted-foreground">Don't have an account? </span>
               <Link href="/auth/signup" className="font-medium text-primary hover:underline">
                 Sign up
               </Link>
             </div>
             
             <div className="mt-4 text-center">
               <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                 ← Back to Home
               </Link>
             </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}