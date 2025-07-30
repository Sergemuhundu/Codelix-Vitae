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
      <div className="flex items-center justify-start gap-1 sm:gap-2">
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
                "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                index < currentStepIndex 
                  ? "bg-primary border-primary text-primary-foreground shadow-sm" 
                  : index === currentStepIndex 
                  ? "bg-primary/10 border-primary text-primary shadow-sm" 
                  : "bg-muted border-muted-foreground/20 text-muted-foreground"
              )}>
                {index < currentStepIndex ? (
                  <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <div className="mt-1 text-center max-w-16 sm:max-w-20">
                <p className="text-xs font-medium leading-tight hidden sm:block">{step.title}</p>
                <p className="text-xs font-medium leading-tight sm:hidden">{step.title.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5 hidden lg:block">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-4 h-0.5 mx-1 sm:w-6 sm:mx-2 transition-all duration-200",
                index < currentStepIndex ? "bg-primary" : "bg-muted"
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 