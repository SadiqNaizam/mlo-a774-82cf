import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  title: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  title,
  onBack,
  actions,
  className,
}) => {
  return (
    <div className={cn("flex flex-col h-screen bg-background", className)}>
      <Header
        title={title}
        onBack={onBack}
        actions={actions}
      />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
