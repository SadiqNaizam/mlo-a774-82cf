import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, actions, className }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="grid h-full grid-cols-3 items-center px-4">
        {/* Left Section */}
        <div className="flex items-center justify-start">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} aria-label="Go back">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Center Section (Title) */}
        <h1 className="text-center text-lg font-semibold text-foreground truncate">
          {title}
        </h1>

        {/* Right Section */}
        <div className="flex items-center justify-end">
          {actions}
        </div>
      </div>
    </header>
  );
};

export default Header;
