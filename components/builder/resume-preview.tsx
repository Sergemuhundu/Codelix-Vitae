'use client';

import { useEffect, useState } from 'react';
import { ResumeData } from '@/types/resume';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePreview = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Import the generateHTML function from the proper module
        const { generateHTML } = await import('@/lib/html-generator');
        const html = generateHTML(data, template);
        
        if (!html || html.trim().length === 0) {
          throw new Error('Generated HTML is empty');
        }
        
        setPreviewHtml(html);
      } catch (error) {
        console.error('Error generating preview:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    generatePreview();
  }, [data, template]);

  const currentTemplateData = AVAILABLE_TEMPLATES.find(t => t.id === template);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Generating preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-sm text-red-500 mb-2">Preview Error</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Template Info */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{currentTemplateData?.name}</span>
        <span className="text-muted-foreground">Live Preview</span>
      </div>

      {/* Preview Container */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm max-h-[800px] overflow-y-auto">
        <div 
          className="w-full"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      </div>

      {/* Preview Info */}
      <div className="text-xs text-muted-foreground text-center">
        This is a preview of how your resume will look. The final PDF may have slight formatting differences.
      </div>
    </div>
  );
}