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

  useEffect(() => {
    const generatePreview = async () => {
      setIsLoading(true);
      try {
        // Import the generateHTML function from the client-safe module
        const { generateHTML } = await import('@/lib/html-generator');
        const html = generateHTML(data, template);
        setPreviewHtml(html);
      } catch (error) {
        console.error('Error generating preview:', error);
        setPreviewHtml('<div class="p-4 text-red-500">Error generating preview</div>');
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

  return (
    <div className="space-y-4">
      {/* Template Info */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{currentTemplateData?.name}</span>
        <span className="text-muted-foreground">Live Preview</span>
      </div>

      {/* Preview Container */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
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