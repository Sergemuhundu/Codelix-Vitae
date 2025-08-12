'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: string;
  className?: string;
  onStepClick?: (stepId: string) => void;
}

export function StepProgress({ steps, currentStep, className, onStepClick }: StepProgressProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const currentStepData = steps[currentStepIndex];

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200",
            "bg-primary/10 border-primary text-primary shadow-sm"
          )}>
            <span className="text-sm font-medium">{currentStepIndex + 1}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            of {steps.length}
          </div>
        </div>
        
        {/* Current step info */}
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-foreground">{currentStepData?.title}</h3>
          <p className="text-sm text-muted-foreground">{currentStepData?.description}</p>
        </div>
      </div>
    </div>
  );
} 