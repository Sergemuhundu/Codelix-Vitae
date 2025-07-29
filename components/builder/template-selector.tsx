'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Eye, Crown, Sparkles } from 'lucide-react';
import { AVAILABLE_TEMPLATES, getFreeTemplates, getPremiumTemplates } from '@/lib/templates';
import { PremiumTemplateCard } from './premium-template-card';
import { ResumeData } from '@/types/resume';
import { useSubscription } from '@/hooks/use-subscription';
import { useRouter } from 'next/navigation';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
  onPreview: (template: string) => void;
  resumeData: ResumeData;
}

export function TemplateSelector({ 
  selectedTemplate, 
  onTemplateSelect, 
  onPreview,
  resumeData
}: TemplateSelectorProps) {
  const [activeTab, setActiveTab] = useState('all');
  const { isPremium } = useSubscription();
  const router = useRouter();

  const handlePreview = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/dashboard/template-preview/${templateId}`);
  };

  const handleTemplateSelect = (templateId: string) => {
    // Navigate directly to dedicated resume builder page with selected template
    router.push(`/resume-builder?template=${templateId}`);
  };

  const freeTemplates = getFreeTemplates();
  const premiumTemplates = getPremiumTemplates();

  const renderTemplateCard = (template: any) => {
    if (template.isPremium) {
      return (
        <PremiumTemplateCard
          key={template.id}
          template={template}
          selectedTemplate={selectedTemplate}
          onTemplateSelect={onTemplateSelect}
          onPreview={onPreview}
          resumeData={resumeData}
        />
      );
    }

    return (
      <Card 
        key={template.id}
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
          selectedTemplate === template.id 
            ? 'ring-2 ring-primary border-primary' 
            : 'hover:border-primary/50'
        }`}
        onClick={() => handleTemplateSelect(template.id)}
      >
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
              {selectedTemplate === template.id && (
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
                {template.features.slice(0, 2).map((feature: string, index: number) => (
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
                onClick={(e) => handlePreview(template.id, e)}
              >
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTemplateSelect(template.id);
                }}
              >
                {selectedTemplate === template.id ? 'Selected' : 'Select'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h3 className="text-base md:text-lg font-semibold mb-2">Choose Your Template</h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Select a professional template that matches your industry and style preferences.
        </p>
      </div>

      {/* Template Categories Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="free">Free ({freeTemplates.length})</TabsTrigger>
          <TabsTrigger value="premium" className="flex items-center gap-1">
            <Crown className="h-3 w-3" />
            Premium ({premiumTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {AVAILABLE_TEMPLATES.map(renderTemplateCard)}
          </div>
        </TabsContent>

        <TabsContent value="free" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {freeTemplates.map(renderTemplateCard)}
          </div>
        </TabsContent>

        <TabsContent value="premium" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {premiumTemplates.map(renderTemplateCard)}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {AVAILABLE_TEMPLATES.filter(t => 
              ['modern', 'professional', 'executive-premium', 'tech-focused'].includes(t.id)
            ).map(renderTemplateCard)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Template Categories */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">Modern</Badge>
        <Badge variant="outline">Professional</Badge>
        <Badge variant="outline">Minimal</Badge>
        <Badge variant="outline">Sidebar</Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Crown className="h-3 w-3" />
          Premium
        </Badge>
        <Badge variant="outline">ATS-Friendly</Badge>
      </div>
    </div>
  );
} 