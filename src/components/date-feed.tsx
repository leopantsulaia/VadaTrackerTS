"use client";

import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Coffee } from 'lucide-react';

interface DateFeedProps {
  dates: Date[];
}

export function DateFeed({ dates }: DateFeedProps) {
  if (dates.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-primary">Vadaburger Meal Log</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-10 text-center">
          <Coffee className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">No Vadaburger meals logged yet.</p>
          <p className="text-sm text-muted-foreground">Start tracking your culinary adventures!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-primary">Vadaburger Meal Log</CardTitle>
        <CardDescription className="text-center">Your delicious history with Vadaburger.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 md:p-6">
        <ul className="space-y-3">
          {dates.map((date, index) => (
            <li key={index}>
              <Card className="bg-secondary/30 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center space-x-3">
                  <CalendarCheck className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-secondary-foreground">
                      {format(date, "EEEE, MMMM do, yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(date, "'at' h:mm a")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
