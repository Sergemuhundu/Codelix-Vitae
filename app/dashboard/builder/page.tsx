'use client';

import { useSearchParams } from 'next/navigation';
import { ResumeBuilder } from '@/components/builder/resume-builder';

export default function ResumeBuilderPage() {
  const searchParams = useSearchParams();
  const selectedTemplate = searchParams.get('template') || '';

  return (
    <div className="w-full max-w-7xl mx-auto py-4 md:py-6 px-4 md:px-6">
      <ResumeBuilder initialTemplate={selectedTemplate} />
    </div>
  );
}