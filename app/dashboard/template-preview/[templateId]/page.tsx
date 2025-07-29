'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Crown,
  Eye
} from 'lucide-react';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';
import { useSubscription } from '@/hooks/use-subscription';

export default function TemplatePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { isPremium } = useSubscription();
  const [currentTemplate, setCurrentTemplate] = useState<string>('');

  useEffect(() => {
    if (params.templateId) {
      setCurrentTemplate(params.templateId as string);
    }
  }, [params.templateId]);

  const currentTemplateData = AVAILABLE_TEMPLATES.find(t => t.id === currentTemplate);
  const currentIndex = AVAILABLE_TEMPLATES.findIndex(t => t.id === currentTemplate);
  
  const nextTemplate = AVAILABLE_TEMPLATES[(currentIndex + 1) % AVAILABLE_TEMPLATES.length];
  const prevTemplate = AVAILABLE_TEMPLATES[currentIndex === 0 ? AVAILABLE_TEMPLATES.length - 1 : currentIndex - 1];

  const handleTemplateChange = (templateId: string) => {
    router.push(`/dashboard/template-preview/${templateId}`);
  };

  const handleSelectTemplate = () => {
    router.push(`/resume-builder?template=${currentTemplate}`);
  };

  const handleBackToBuilder = () => {
    router.push('/dashboard/builder');
  };

  if (!currentTemplateData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <Button onClick={handleBackToBuilder}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Builder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleBackToBuilder}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Builder
              </Button>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {currentTemplateData.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  {currentTemplateData.isPremium && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <Badge variant="secondary">{currentTemplateData.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Template {currentIndex + 1} of {AVAILABLE_TEMPLATES.length}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleTemplateChange(prevTemplate.id)}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                {prevTemplate.name}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleTemplateChange(nextTemplate.id)}
                className="flex items-center gap-1"
              >
                {nextTemplate.name}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src={currentTemplateData.preview} 
            alt={`${currentTemplateData.name} template preview`}
            className="w-full h-auto object-contain"
            onError={(e) => {
              console.error(`Failed to load template preview: ${currentTemplateData.preview}`);
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `
                <div class="w-full h-96 flex items-center justify-center text-red-500 text-lg">
                  ❌ Template preview not found<br/>
                  <span class="text-sm">${currentTemplateData.preview}</span>
                </div>
              `;
            }}
          />
        </div>

        {/* Template Info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Template Details</span>
                <div className="flex items-center gap-2">
                  {currentTemplateData.isPremium && !isPremium && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium Required
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentTemplateData.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Actions</h3>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSelectTemplate}
                      disabled={currentTemplateData.isPremium && !isPremium}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      {currentTemplateData.isPremium && !isPremium ? 'Upgrade to Use' : 'Use This Template'}
                    </Button>
                  </div>
                  {currentTemplateData.isPremium && !isPremium && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Upgrade to Pro to access this premium template
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 