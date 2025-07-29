'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, FileText, Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/use-subscription';
import { getFreeTemplates, getPremiumTemplates } from '@/lib/templates';

export function TemplateStats() {
  const { isPremium } = useSubscription();
  const freeTemplates = getFreeTemplates();
  const premiumTemplates = getPremiumTemplates();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{freeTemplates.length + premiumTemplates.length}</div>
          <p className="text-xs text-muted-foreground">
            Professional resume templates
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Free Templates</CardTitle>
          <FileText className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{freeTemplates.length}</div>
          <p className="text-xs text-muted-foreground">
            Available to all users
          </p>
        </CardContent>
      </Card>

      <Card className={isPremium ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-1">
            Premium Templates
            <Crown className="h-4 w-4" />
          </CardTitle>
          <Sparkles className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{premiumTemplates.length}</div>
          <p className="text-xs text-muted-foreground">
            {isPremium ? 'Unlocked with Pro plan' : 'Upgrade to Pro to access'}
          </p>
          {!isPremium && (
            <Badge className="mt-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Crown className="h-3 w-3 mr-1" />
              Pro Required
            </Badge>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 