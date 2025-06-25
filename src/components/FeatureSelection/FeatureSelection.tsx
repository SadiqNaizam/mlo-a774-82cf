import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

interface FeatureSelectionProps {
  onNext: (selectedFeatures: string[]) => void;
  className?: string;
}

const featuresData: string[] = [
  'Payments', 'Savings', 'Invest', 'Transfers', 'Security', 'FX',
  'Loans', 'Insurance', 'Reports', 'Budgeting', 'Personal'
];

const FeatureSelection: React.FC<FeatureSelectionProps> = ({ onNext, className }) => {
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());

  const handleToggle = useCallback((feature: string) => {
    setSelectedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(feature)) {
        newSet.delete(feature);
      } else {
        newSet.add(feature);
      }
      return newSet;
    });
  }, []);

  const handleNextClick = () => {
    onNext(Array.from(selectedFeatures));
  };

  return (
    <div className={cn("flex flex-col h-full p-4 bg-background", className)}>
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold text-center mb-2 text-foreground">
          Choose your banking features
        </h2>
        <p className="text-center text-muted-foreground mb-8">
            Select the features you need.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {featuresData.map((feature) => (
            <Toggle
              key={feature}
              aria-label={`Toggle ${feature}`}
              pressed={selectedFeatures.has(feature)}
              onPressedChange={() => handleToggle(feature)}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border-border hover:bg-accent"
            >
              {feature}
            </Toggle>
          ))}
            <Button variant="secondary" className="font-bold text-primary">
              UPGRADE PLAN
            </Button>
        </div>
      </div>
      <div className="py-4">
        <Button
          size="lg"
          className="w-full"
          onClick={handleNextClick}
          disabled={selectedFeatures.size === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FeatureSelection;
