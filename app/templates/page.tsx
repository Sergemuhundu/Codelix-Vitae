'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Eye, Crown, Sparkles, ArrowRight, FileText } from 'lucide-react';
import { AVAILABLE_TEMPLATES, getFreeTemplates, getPremiumTemplates } from '@/lib/templates';
import { PremiumTemplateCard } from '@/components/builder/premium-template-card';
import { ResumeData } from '@/types/resume';
import { getResumePreviewData } from '@/lib/pdf-utils';

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();
  
  // Sample resume data for preview
  const resumeData = getResumePreviewData();

  const freeTemplates = getFreeTemplates();
  const premiumTemplates = getPremiumTemplates();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleStartBuilding = () => {
    if (selectedTemplate) {
      router.push(`/resume-builder?template=${selectedTemplate}`);
    } else {
      // If no template selected, go to resume builder with default template
      router.push('/resume-builder');
    }
  };

  const handlePreview = (templateId: string) => {
    router.push(`/template-preview/${templateId}`);
  };

  const renderTemplateCard = (template: any) => {
    if (template.isPremium) {
      return (
        <PremiumTemplateCard
          key={template.id}
          template={template}
          selectedTemplate={selectedTemplate || ''}
          onTemplateSelect={handleTemplateSelect}
          onPreview={handlePreview}
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
                />
              </div>
              
              {/* Selection indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}

              {/* Preview button */}
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview(template.id);
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Template Info */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm md:text-base">{template.name}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{template.category}</p>
                </div>
                {!template.isPremium && (
                  <Badge variant="secondary" className="text-xs">
                    Free
                  </Badge>
                )}
              </div>
              
              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {template.features.slice(0, 2).map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CVAdapter</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
            <Button 
              onClick={handleStartBuilding}
              disabled={!selectedTemplate}
              className="min-w-[140px]"
            >
              {selectedTemplate ? (
                <>
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Select Template'
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select from our collection of professional templates. Free templates are available to everyone, 
            while premium templates require a subscription.
          </p>
        </div>

        {/* Template Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="free">Free ({freeTemplates.length})</TabsTrigger>
            <TabsTrigger value="premium">Premium ({premiumTemplates.length})</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {AVAILABLE_TEMPLATES.map(renderTemplateCard)}
            </div>
          </TabsContent>

          <TabsContent value="free" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {freeTemplates.map(renderTemplateCard)}
            </div>
          </TabsContent>

          <TabsContent value="premium" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {premiumTemplates.map(renderTemplateCard)}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['modern', 'minimal', 'professional', 'tech', 'executive', 'creative'].map((category) => (
                <Card key={category} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="capitalize">{category}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {AVAILABLE_TEMPLATES.filter(t => t.category === category).length} templates
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('all')}
                      className="w-full"
                    >
                      View {category} templates
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        {selectedTemplate && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <Card className="shadow-lg border-primary">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">Template Selected</p>
                    <p className="text-sm text-muted-foreground">
                      {AVAILABLE_TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                    </p>
                  </div>
                  <Button onClick={handleStartBuilding}>
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 