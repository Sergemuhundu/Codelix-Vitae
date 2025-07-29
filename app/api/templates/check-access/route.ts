import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const isPremium = subscription?.plan === 'pro' && subscription?.status === 'active';

    return NextResponse.json({
      isPremium,
      plan: subscription?.plan || 'free',
      status: subscription?.status || 'inactive'
    });

  } catch (error) {
    console.error('Error checking template access:', error);
    return NextResponse.json({ 
      error: 'Failed to check template access',
      isPremium: false,
      plan: 'free',
      status: 'error'
    }, { status: 500 });
  }
} 