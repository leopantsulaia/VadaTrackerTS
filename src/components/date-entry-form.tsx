"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, PlusCircle, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DateEntryFormProps {
  onAddDate: (date: Date) => void;
}

export function DateEntryForm({ onAddDate }: DateEntryFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleAddCustomDate = () => {
    if (selectedDate) {
      onAddDate(selectedDate);
      toast({
        title: "Meal Logged!",
        description: `Vadaburger on ${format(selectedDate, "PPP")} recorded.`,
      });
      setSelectedDate(new Date()); // Reset to today for next custom entry
    } else {
      toast({
        title: "No Date Selected",
        description: "Please select a date to log your meal.",
        variant: "destructive",
      });
    }
  };

  const handleAddTodayDate = () => {
    const today = new Date();
    onAddDate(today);
    toast({
      title: "Meal Logged!",
      description: `Vadaburger for today, ${format(today, "PPP")}, recorded.`,
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-primary">Log a Vadaburger Meal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">When did Vada feed you?</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[280px] justify-start text-left font-normal shadow-sm hover:shadow-md transition-shadow",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleAddCustomDate} className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
              <PlusCircle className="mr-2 h-5 w-5" />
              Log This Date
            </Button>
          </div>
        </div>
        
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-muted-foreground">OR</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <Button onClick={handleAddTodayDate} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg transition-shadow">
          <Utensils className="mr-2 h-5 w-5" />
          Vada Fed Us Today!
        </Button>
      </CardContent>
    </Card>
  );
}
