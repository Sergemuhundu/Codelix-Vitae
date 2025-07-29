'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Crown, Sparkles, ArrowRight } from 'lucide-react';
import { useSubscription } from '@/hooks/use-subscription';
import { useRouter } from 'next/navigation';

export function PremiumBanner() {
  const { isPremium, isLoading } = useSubscription();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  if (isLoading || isPremium || !isVisible) {
    return null;
  }

  const handleUpgrade = () => {
    router.push('/dashboard/billing');
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900">Unlock Premium Templates</h3>
              <p className="text-sm text-amber-700">
                Get access to 6+ premium templates and unlimited downloads
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Pro
            </Badge>
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              onClick={handleUpgrade}
            >
              Upgrade Now
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="text-amber-600 hover:text-amber-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 