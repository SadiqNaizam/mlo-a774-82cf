import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { CreditCard, ChevronRight } from 'lucide-react';

interface AccountOverviewProps {
  className?: string;
}

interface Transaction {
  id: string;
  name: string;
  initials: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
}

const transactionsData: Transaction[] = [
  { id: '1', name: 'Spotify', initials: 'S', amount: -10.99, date: 'Oct 26', type: 'debit' },
  { id: '2', name: 'Alice Johnson', initials: 'AJ', amount: 250.00, date: 'Oct 25', type: 'credit' },
  { id: '3', name: 'Grocery Store', initials: 'GS', amount: -75.43, date: 'Oct 24', type: 'debit' },
  { id: '4', name: 'Michael Brown', initials: 'MB', amount: -50.00, date: 'Oct 23', type: 'debit' },
];

const chartData = [
    { name: 'Jan', spending: 4000 }, { name: 'Feb', spending: 3000 }, 
    { name: 'Mar', spending: 5000 }, { name: 'Apr', spending: 2780 }, 
    { name: 'May', spending: 1890 }, { name: 'Jun', spending: 6390 }, 
    { name: 'Jul', spending: 3490 }, { name: 'Aug', spending: 2000 }, 
    { name: 'Sep', spending: 4500 }, { name: 'Oct', spending: 3200 }, 
    { name: 'Nov', spending: 7100 }, { name: 'Dec', spending: 4300 },
];

const AccountOverview: React.FC<AccountOverviewProps> = ({ className }) => {
  const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className={cn("space-y-6 p-4 bg-background", className)}>
      <Card>
        <CardHeader>
          <CardDescription>Available balance</CardDescription>
          <CardTitle className="text-4xl">$8,250.75</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                        <Area type="monotone" dataKey="spending" stroke="hsl(var(--primary))" fill="url(#colorSpending)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Payment Cards</h3>
        <Card className="overflow-hidden">
          <CardContent className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent">
            <div className="flex items-center gap-4">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">Business Card **** 1234</p>
                <Badge variant="secondary" className="mt-1 text-primary font-semibold">UPGRADE PLAN</Badge>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
         <Card>
            <CardContent className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent">
              <div className="flex items-center gap-4">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
                <p className="font-semibold">Personal Card **** 5678</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {transactionsData.map((tx) => (
                <li key={tx.id} className="flex items-center justify-between p-4 hover:bg-accent">
                  <div className="flex items-center gap-4">
                    <Avatar><AvatarFallback>{tx.initials}</AvatarFallback></Avatar>
                    <div>
                      <p className="font-semibold">{tx.name}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className={`font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-foreground'}`}>
                    {tx.type === 'credit' ? '+' : ''}{formatCurrency(tx.amount)}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountOverview;
