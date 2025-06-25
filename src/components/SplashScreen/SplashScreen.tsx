import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Landmark } from 'lucide-react';

interface SplashScreenProps {
  onGetStarted: () => void;
  className?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-between h-full p-8 text-center bg-background", className)}>
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <div className="p-6 bg-primary/10 rounded-full">
          <div className="p-5 bg-primary/20 rounded-full">
            <Landmark className="h-16 w-16 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">BankEase</h1>
          <p className="text-lg text-muted-foreground">Your banking, simplified.</p>
        </div>
      </div>
      <div className="w-full mt-8">
        <Button
          size="lg"
          className="w-full"
          onClick={onGetStarted}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
