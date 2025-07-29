'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, Eye, Crown, Sparkles } from 'lucide-react';
import { ResumeTemplate } from '@/lib/templates';
import { useSubscription } from '@/hooks/use-subscription';
import { useRouter } from 'next/navigation';

interface PremiumTemplateCardProps {
  template: ResumeTemplate;
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
  onPreview: (template: string) => void;
  resumeData: any;
}

export function PremiumTemplateCard({
  template,
  selectedTemplate,
  onTemplateSelect,
  onPreview,
  resumeData
}: PremiumTemplateCardProps) {
  const { isPremium, isLoading } = useSubscription();
  const router = useRouter();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  const handleTemplateSelect = () => {
    if (template.isPremium && !isPremium) {
      setShowUpgradeDialog(true);
      return;
    }
    // Navigate directly to dedicated resume builder page with selected template
    router.push(`/resume-builder?template=${template.id}`);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (template.isPremium && !isPremium) {
      setShowUpgradeDialog(true);
      return;
    }
    router.push(`/dashboard/template-preview/${template.id}`);
  };

  const handleUpgrade = () => {
    router.push('/dashboard/billing');
  };

  const isSelected = selectedTemplate === template.id;
  const isLocked = template.isPremium && !isPremium;

  return (
    <>
      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
          isSelected 
            ? 'ring-2 ring-primary border-primary' 
            : 'hover:border-primary/50'
        }`}
        onClick={handleTemplateSelect}
      >
        {/* Premium Badge */}
        {template.isPremium && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}

        <CardContent className="p-3 md:p-4">
          <div className="space-y-2 md:space-y-3">
            {/* Template Preview */}
            <div className="relative">
              <div className="w-full h-48 md:h-64 rounded-lg border-2 overflow-hidden bg-white shadow-sm">
                <img 
                  src={template.preview} 
                  alt={`${template.name} template preview`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error(`Failed to load image: ${template.preview}`);
                    // Fallback to a colored background if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.className = `w-full h-48 md:h-64 rounded-lg border-2 ${
                      template.category === 'modern'
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
                        : template.category === 'minimal'
                        ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
                        : template.category === 'professional'
                        ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                        : template.category === 'executive'
                        ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
                        : template.category === 'tech'
                        ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200'
                        : template.category === 'creative'
                        ? 'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200'
                        : template.category === 'academic'
                        ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
                        : template.category === 'sidebar'
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
                        : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
                    }`;
                  }}
                  onLoad={() => {
                    console.log(`Successfully loaded image: ${template.preview}`);
                  }}
                />
              </div>
              
              {/* Selected Checkmark */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{template.name}</h4>
                <div className="flex items-center gap-1">
                  {template.hasPhoto && (
                    <Badge variant="outline" className="text-xs">
                      📷 Photo
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
              </div>
              
              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {template.features.slice(0, 2).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {template.features.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.features.length - 2} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={handlePreview}
                disabled={isLoading}
              >
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </Button>
              <Button
                size="sm"
                className={`flex-1 ${isLocked ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTemplateSelect();
                }}
                disabled={isLoading}
              >
                {isLocked ? (
                  <>
                    <Crown className="h-3 w-3 mr-1" />
                    Upgrade
                  </>
                ) : isSelected ? (
                  'Selected'
                ) : (
                  'Select'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Unlock Premium Templates
            </DialogTitle>
            <DialogDescription>
              Upgrade to Pro to access all premium templates and features.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <h4 className="font-semibold text-amber-900">Premium Features</h4>
              </div>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>• All premium templates</li>
                <li>• Unlimited resume downloads</li>
                <li>• Advanced ATS optimization</li>
                <li>• AI cover letter generation</li>
                <li>• Priority support</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                onClick={handleUpgrade}
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowUpgradeDialog(false)}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 