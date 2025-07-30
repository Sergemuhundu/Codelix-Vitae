'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Grid, Download, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';

interface FormNavigationProps {
  currentTemplateId: string;
  onGeneratePDF: () => void;
  isLoading: boolean;
}

export function FormNavigation({ currentTemplateId, onGeneratePDF, isLoading }: FormNavigationProps) {
  const router = useRouter();
  const currentTemplateData = AVAILABLE_TEMPLATES.find(t => t.id === currentTemplateId);

  const handleBackToTemplates = () => {
    router.push('/dashboard/builder');
  };

  return (
    <div className="flex items-center justify-between bg-white border-b px-4 py-3">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleBackToTemplates}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Templates
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="font-medium">{currentTemplateData?.name}</span>
          {currentTemplateData?.isPremium && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              Premium
            </Badge>
          )}
          <Badge variant="secondary">{currentTemplateData?.category}</Badge>
        </div>
      </div>
      
      <Button 
        onClick={onGeneratePDF} 
        disabled={isLoading}
        className="min-w-[140px]"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Download className="h-4 w-4 mr-2" />
        )}
        Generate Resume
      </Button>
    </div>
  );
} 