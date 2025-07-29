'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';
import { useRouter } from 'next/navigation';

interface TemplateNavigationProps {
  currentTemplateId: string;
}

export function TemplateNavigation({ currentTemplateId }: TemplateNavigationProps) {
  const router = useRouter();
  const currentIndex = AVAILABLE_TEMPLATES.findIndex(t => t.id === currentTemplateId);
  
  const nextTemplate = AVAILABLE_TEMPLATES[(currentIndex + 1) % AVAILABLE_TEMPLATES.length];
  const prevTemplate = AVAILABLE_TEMPLATES[currentIndex === 0 ? AVAILABLE_TEMPLATES.length - 1 : currentIndex - 1];

  const handleTemplateChange = (templateId: string) => {
    router.push(`/dashboard/template-preview/${templateId}`);
  };

  const handleBackToGrid = () => {
    router.push('/dashboard/builder');
  };

  return (
    <div className="flex items-center justify-between bg-white border-b px-4 py-3">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleBackToGrid}>
          <Grid className="h-4 w-4 mr-2" />
          All Templates
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTemplateChange(prevTemplate.id)}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            {prevTemplate.name}
          </Button>
          
          <Badge variant="secondary" className="px-3">
            {currentIndex + 1} of {AVAILABLE_TEMPLATES.length}
          </Badge>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTemplateChange(nextTemplate.id)}
            className="flex items-center gap-1"
          >
            {nextTemplate.name}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 