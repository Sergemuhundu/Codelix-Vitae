'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Check, 
  Star, 
  Calendar,
  Download,
  AlertCircle,
  Crown
} from 'lucide-react';

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      features: [
        '2 resume downloads per month',
        'Basic templates',
        'Standard support',
        'Basic ATS optimization'
      ],
      limits: {
        resumes: 3,
        coverLetters: 2,
        atsScans: 5
      }
    },
    {
      id: 'pro',
      name: 'Pro',
      price: { monthly: 5, yearly: 50 },
      popular: true,
      features: [
        'Unlimited resume downloads',
        'All premium templates',
        'Priority support',
        'Advanced ATS optimization',
        'AI cover letter generation',
        'Job-specific resume tailoring',
        'PDF export with custom branding'
      ],
      limits: {
        resumes: 'unlimited',
        coverLetters: 'unlimited',
        atsScans: 'unlimited'
      }
    }
  ];

  const usage = {
    resumes: 8,
    coverLetters: 12,
    atsScans: 25,
    limits: {
      resumes: 'unlimited',
      coverLetters: 'unlimited',
      atsScans: 'unlimited'
    }
  };

  const invoices = [
    {
      id: 'inv_001',
      date: '2024-01-01',
      amount: 5.00,
      status: 'paid',
      plan: 'Pro Monthly'
    },
    {
      id: 'inv_002',
      date: '2023-12-01',
      amount: 5.00,
      status: 'paid',
      plan: 'Pro Monthly'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription and billing information.
        </p>
      </div>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Crown className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      ${billingCycle === 'monthly' ? '5.00/month' : '50.00/year'}
                    </p>
                  </div>
                </div>
                <Badge>Active</Badge>
              </div>
              
              <div className="mt-4 flex gap-4">
                <Button variant="outline">
                  Change Plan
                </Button>
                <Button variant="destructive">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing Cycle Toggle */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Cycle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    billingCycle === 'monthly' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background text-foreground'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    billingCycle === 'yearly' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background text-foreground'
                  }`}
                >
                  Yearly
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">
                    Save 17%
                  </Badge>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.popular ? 'border-primary shadow-lg' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{plan.name}</span>
                    {currentPlan === plan.id && (
                      <Badge variant="outline">Current</Badge>
                    )}
                  </CardTitle>
                  <div className="text-3xl font-bold">
                    ${plan.price[billingCycle as keyof typeof plan.price]}
                    <span className="text-lg font-normal text-muted-foreground">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className="w-full"
                    variant={currentPlan === plan.id ? 'outline' : 'default'}
                    disabled={currentPlan === plan.id}
                  >
                    {currentPlan === plan.id ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Month Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Resume Downloads</span>
                    <span className="text-sm text-muted-foreground">
                      {usage.resumes} / {usage.limits.resumes}
                    </span>
                  </div>
                  <Progress 
                    value={usage.limits.resumes === 'unlimited' ? 0 : (usage.resumes / Number(usage.limits.resumes)) * 100} 
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cover Letters</span>
                    <span className="text-sm text-muted-foreground">
                      {usage.coverLetters} / {usage.limits.coverLetters}
                    </span>
                  </div>
                  <Progress 
                    value={usage.limits.coverLetters === 'unlimited' ? 0 : (usage.coverLetters / Number(usage.limits.coverLetters)) * 100} 
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">ATS Scans</span>
                    <span className="text-sm text-muted-foreground">
                      {usage.atsScans} / {usage.limits.atsScans}
                    </span>
                  </div>
                  <Progress 
                    value={usage.limits.atsScans === 'unlimited' ? 0 : (usage.atsScans / Number(usage.limits.atsScans)) * 100} 
                  />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    Pro Plan Benefits
                  </span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  You have unlimited access to all features with your Pro subscription.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Billing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{invoice.plan}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(invoice.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                        <Badge
                          variant={invoice.status === 'paid' ? 'default' : 'secondary'}
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}