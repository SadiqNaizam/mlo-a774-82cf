import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MessageSquare, XCircle, History, Hourglass } from 'lucide-react';

interface TransactionStatusProps {
  className?: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col h-full p-4 bg-background", className)}>
      <div className="flex-grow space-y-6 flex flex-col">
        <Card className="overflow-hidden">
            <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1280&auto=format&fit=crop"
                  alt="Office desk with keyboard and phone"
                  className="w-full h-full object-cover"
                />
            </AspectRatio>
        </Card>
        
        <div className="text-center space-y-2 flex-grow flex flex-col justify-center">
            <div className="flex justify-center items-center gap-2">
                <Hourglass className="h-6 w-6 text-primary animate-spin" />
                <h2 className="text-2xl font-bold text-foreground">Your payment is processing!</h2>
            </div>
          <p className="text-muted-foreground">Paid from: Alex Johnson, Savings Account</p>
        </div>
        
        <div className="space-y-2 mt-auto">
            <p className="text-sm font-medium text-muted-foreground px-1">Options</p>
            <div className="grid grid-cols-3 gap-3">
              <Card className="hover:bg-accent transition-colors">
                <CardContent className="p-0">
                  <Button variant="ghost" className="w-full h-full flex flex-col items-center justify-center gap-1 py-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <span className="text-xs text-center text-muted-foreground">Contact support</span>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:bg-accent transition-colors">
                <CardContent className="p-0">
                  <Button variant="ghost" className="w-full h-full flex flex-col items-center justify-center gap-1 py-3">
                    <XCircle className="h-6 w-6 text-primary" />
                    <span className="text-xs text-center text-muted-foreground">Cancel</span>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:bg-accent transition-colors">
                <CardContent className="p-0">
                  <Button variant="ghost" className="w-full h-full flex flex-col items-center justify-center gap-1 py-3">
                    <History className="h-6 w-6 text-primary" />
                    <span className="text-xs text-center text-muted-foreground">View history</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatus;
