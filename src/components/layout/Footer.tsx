import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutGrid, ArrowRightLeft, CirclePlus, User, Settings } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const navItems = [
  { id: 'home', label: 'Home', icon: LayoutGrid },
  { id: 'transfers', label: 'Transfers', icon: ArrowRightLeft },
  { id: 'action', label: 'Add', icon: CirclePlus, isCentral: true as const },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'profile', label: 'Profile', icon: User },
] as const;

type NavItemId = typeof navItems[number]['id'];

const Footer: React.FC<FooterProps> = ({ className }) => {
  const [activeItem, setActiveItem] = React.useState<NavItemId>('home');

  return (
    <footer className={cn("sticky bottom-0 z-50 w-full h-16 border-t bg-background", className)}>
      <nav className="flex h-full items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          if (item.isCentral) {
            return (
              <div key={item.id} className="relative w-16 h-full flex justify-center">
                <Button
                  variant="default"
                  size="icon"
                  className="absolute -top-4 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
                  onClick={() => setActiveItem(item.id)}
                  aria-label={item.label}
                >
                  <Icon className="h-7 w-7" />
                </Button>
              </div>
            );
          }

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "flex flex-col items-center justify-center h-full w-full rounded-none text-xs gap-1",
                isActive ? "text-primary" : "text-muted-foreground",
                "hover:bg-accent hover:text-accent-foreground"
              )}
              onClick={() => setActiveItem(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;
