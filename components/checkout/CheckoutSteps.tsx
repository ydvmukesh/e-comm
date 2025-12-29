'use client';

import { Check, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CheckoutStepsProps {
  currentStep: number;
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { id: 1, label: 'Shipping' },
    { id: 2, label: 'Payment' },
    { id: 3, label: 'Review' },
  ];

  return (
    <div className="relative flex justify-between max-w-2xl">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0" />
      
      {/* Progress Line */}
      <div 
        className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step) => (
        <div key={step.id} className="relative z-10 flex flex-col items-center">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-md",
            currentStep > step.id ? "bg-blue-500 border-blue-500 text-white" :
            currentStep === step.id ? "bg-white border-blue-500 text-blue-500 scale-110" :
            "bg-white border-gray-100 text-gray-300"
          )}>
            {currentStep > step.id ? <Check className="w-5 h-5" /> : <span className="font-black text-sm">{step.id}</span>}
          </div>
          <span className={cn(
            "absolute -bottom-7 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-colors",
            currentStep >= step.id ? "text-blue-600" : "text-gray-300"
          )}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
