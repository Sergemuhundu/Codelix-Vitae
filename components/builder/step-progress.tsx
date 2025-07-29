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

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div 
              className={cn(
                "flex flex-col items-center cursor-pointer transition-all duration-200",
                onStepClick && index <= currentStepIndex && "hover:scale-105"
              )}
              onClick={() => onStepClick && index <= currentStepIndex && onStepClick(step.id)}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                index < currentStepIndex 
                  ? "bg-primary border-primary text-primary-foreground shadow-sm" 
                  : index === currentStepIndex 
                  ? "bg-primary/10 border-primary text-primary shadow-sm" 
                  : "bg-muted border-muted-foreground/20 text-muted-foreground"
              )}>
                {index < currentStepIndex ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center max-w-24">
                <p className="text-xs font-medium leading-tight">{step.title}</p>
                <p className="text-xs text-muted-foreground leading-tight mt-1">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-16 h-0.5 mx-4 transition-all duration-200",
                index < currentStepIndex ? "bg-primary" : "bg-muted"
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 