import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

interface PaymentFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  className?: string;
}

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be positive." }),
  payeeAccount: z.string().min(5, { message: "Payee account is required." }),
  cardId: z.string({ required_error: "Please select a card." }),
});

const savedCards = [
  { id: 'card1', type: 'Business Card', last4: '1234' },
  { id: 'card2', type: 'Personal Card', last4: '5678' },
];

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        amount: 390.81,
        payeeAccount: "",
    },
  });

  return (
    <div className={cn("p-4 bg-background h-full flex flex-col", className)}>
        <div className="text-center mb-6">
            <p className="text-muted-foreground">Total Amount Due</p>
            <p className="text-4xl font-bold text-foreground">$390.81</p>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-grow flex flex-col">
            <Card className="flex-grow">
                <CardContent className="pt-6 space-y-6">
                    <FormField
                        control={form.control}
                        name="payeeAccount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payee Account</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., John Doe Savings" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="cardId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Card Information</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a card to pay with" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {savedCards.map(card => (
                                        <SelectItem key={card.id} value={card.id}>
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                                                <span>{card.type} **** {card.last4}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="p-3 bg-secondary rounded-md text-center">
                        <p className="text-sm text-primary font-semibold">UPGRADE PLAN for lower fees</p>
                    </div>
                </CardContent>
            </Card>

            <div className="pt-4 mt-auto">
                <Button type="submit" size="lg" className="w-full">
                    Proceed
                </Button>
            </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentForm;
