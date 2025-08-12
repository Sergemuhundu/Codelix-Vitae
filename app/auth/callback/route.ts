import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL('/auth/login?error=auth_callback_failed', requestUrl.origin));
    }

    // If this is a password reset, redirect to reset password page
    if (data.session?.user && requestUrl.pathname.includes('reset-password')) {
      return NextResponse.redirect(new URL('/auth/reset-password', requestUrl.origin));
    }
  }

  // URL to redirect to after sign in process completes
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';
  return NextResponse.redirect(new URL(next, requestUrl.origin));
} 