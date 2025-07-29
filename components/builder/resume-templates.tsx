'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

const templates = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    category: 'Professional',
    description: 'Clean and modern design perfect for corporate roles',
    preview: '/templates/modern-professional.jpg',
    popular: true,
    atsOptimized: true,
  },
  {
    id: 'creative-minimal',
    name: 'Creative Minimal',
    category: 'Creative',
    description: 'Minimalist design with creative touches for design roles',
    preview: '/templates/creative-minimal.jpg',
    popular: false,
    atsOptimized: true,
  },
  {
    id: 'tech-focused',
    name: 'Tech Focused',
    category: 'Technology',
    description: 'Technical layout optimized for software engineering roles',
    preview: '/templates/tech-focused.jpg',
    popular: true,
    atsOptimized: true,
  },
  {
    id: 'executive-premium',
    name: 'Executive Premium',
    category: 'Executive',
    description: 'Premium design for senior leadership positions',
    preview: '/templates/executive-premium.jpg',
    popular: false,
    atsOptimized: true,
  },
  {
    id: 'academic-research',
    name: 'Academic Research',
    category: 'Academic',
    description: 'Traditional format for academic and research positions',
    preview: '/templates/academic-research.jpg',
    popular: false,
    atsOptimized: true,
  },
  {
    id: 'startup-dynamic',
    name: 'Startup Dynamic',
    category: 'Startup',
    description: 'Dynamic design for startup and fast-paced environments',
    preview: '/templates/startup-dynamic.jpg',
    popular: true,
    atsOptimized: true,
  },
];

interface ResumeTemplatesProps {
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
  onNext: () => void;
}

export function ResumeTemplates({ selectedTemplate, onSelectTemplate, onNext }: ResumeTemplatesProps) {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Choose Your Template</h2>
        <p className="text-muted-foreground">
          Select a professionally designed template that matches your industry and style preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardHeader className="p-0">
              <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-2 bg-slate-400 rounded mb-2 mx-auto" />
                    <div className="w-12 h-1 bg-slate-300 rounded mb-3 mx-auto" />
                    
                    <div className="space-y-2 mb-4">
                      <div className="w-20 h-1 bg-slate-400 rounded mx-auto" />
                      <div className="w-16 h-1 bg-slate-300 rounded mx-auto" />
                      <div className="w-18 h-1 bg-slate-300 rounded mx-auto" />
                    </div>

                    <div className="space-y-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex justify-center">
                          <div className="w-24 h-1 bg-slate-300 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                
                {template.popular && (
                  <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.category}</p>
                </div>
                {template.atsOptimized && (
                  <Badge variant="secondary" className="text-xs">
                    ATS Optimized
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedTemplate}
          className="px-8"
        >
          Continue with Selected Template
        </Button>
      </div>
    </div>
  );
}