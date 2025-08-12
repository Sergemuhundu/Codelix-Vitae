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
  Eye,
  FileText
} from 'lucide-react';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';

export default function PublicTemplatePreviewPage() {
  const params = useParams();
  const router = useRouter();
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
    router.push(`/template-preview/${templateId}`);
  };

  const handleSelectTemplate = () => {
    router.push(`/resume-builder?template=${currentTemplate}`);
  };

  const handleBackToTemplates = () => {
    router.push('/templates');
  };

  if (!currentTemplateData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <Button onClick={handleBackToTemplates}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleBackToTemplates}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Templates
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
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => handleTemplateChange(nextTemplate.id)}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Template Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Template Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <img 
                    src={currentTemplateData.preview} 
                    alt={`${currentTemplateData.name} template preview`}
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      console.error(`Failed to load image: ${currentTemplateData.preview}`);
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.className = `w-full h-96 rounded-lg border-2 flex items-center justify-center ${
                        currentTemplateData.category === 'modern'
                          ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
                          : currentTemplateData.category === 'minimal'
                          ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
                          : currentTemplateData.category === 'professional'
                          ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                          : currentTemplateData.category === 'executive'
                          ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
                          : currentTemplateData.category === 'tech'
                          ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200'
                          : currentTemplateData.category === 'creative'
                          ? 'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200'
                          : currentTemplateData.category === 'academic'
                          ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
                          : currentTemplateData.category === 'sidebar'
                          ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
                          : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
                      }`;
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{currentTemplateData.name}</h3>
                  <p className="text-muted-foreground">{currentTemplateData.description || 'Professional resume template designed for optimal ATS compatibility and visual appeal.'}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentTemplateData.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Category</h4>
                  <Badge variant="secondary" className="capitalize">
                    {currentTemplateData.category}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Photo Support</h4>
                  <Badge variant={currentTemplateData.hasPhoto ? "default" : "secondary"}>
                    {currentTemplateData.hasPhoto ? "Supports Photo" : "No Photo"}
                  </Badge>
                </div>

                {currentTemplateData.isPremium && (
                  <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-5 w-5 text-amber-600" />
                        <h4 className="font-semibold text-amber-800">Premium Template</h4>
                      </div>
                      <p className="text-sm text-amber-700 mb-3">
                        This template requires a premium subscription to use. Upgrade to access all premium templates and features.
                      </p>
                      <Button 
                        variant="outline" 
                        className="border-amber-300 text-amber-700 hover:bg-amber-100"
                        onClick={() => router.push('/auth/signup')}
                      >
                        Upgrade to Premium
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!currentTemplateData.isPremium ? (
                <Button 
                  onClick={handleSelectTemplate}
                  className="w-full"
                  size="lg"
                >
                  Use This Template
                </Button>
              ) : (
                <Button 
                  onClick={() => router.push('/auth/signup')}
                  className="w-full"
                  size="lg"
                  variant="outline"
                >
                  Sign Up to Use Premium Template
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleBackToTemplates}
                className="w-full"
              >
                Browse More Templates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 