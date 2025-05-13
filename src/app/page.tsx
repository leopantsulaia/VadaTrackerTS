"use client";

import { useState, useEffect } from 'react';
import { LiveClock } from '@/components/live-clock';
import { DateEntryForm } from '@/components/date-entry-form';
import { DateFeed } from '@/components/date-feed';
import Image from 'next/image';

export default function Home() {
  const [feedDates, setFeedDates] = useState<Date[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load dates from localStorage if available
    const storedDates = localStorage.getItem('vadaFeedDates');
    if (storedDates) {
      setFeedDates(JSON.parse(storedDates).map((dateString: string) => new Date(dateString)));
    }
  }, []);

  const addFeedDate = (date: Date) => {
    setFeedDates(prevDates => {
      const newDates = [...prevDates, date].sort((a, b) => b.getTime() - a.getTime());
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem('vadaFeedDates', JSON.stringify(newDates));
      }
      return newDates;
    });
  };
  
  if (!isClient) {
    // Render a placeholder or loading state on the server/during hydration
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4">
        <div className="animate-pulse text-primary text-xl font-semibold">Loading VadaTracker...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex flex-col items-center p-4 pt-8 md:p-8">
      <div className="w-full max-w-3xl space-y-8">
        <header className="w-full text-center space-y-4">
          <div className="inline-block p-1 bg-card rounded-lg shadow-md">
             <LiveClock />
          </div>
          <div className="flex justify-center items-center space-x-3">
            <Image src="https://picsum.photos/80/80" alt="Vadaburger Logo" width={60} height={60} className="rounded-full shadow-lg" data-ai-hint="burger logo" />
            <h1 className="text-5xl font-extrabold tracking-tight text-primary">
              VadaTracker
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Your personal log for every delicious Vadaburger moment!
          </p>
        </header>

        <main className="w-full">
          <DateEntryForm onAddDate={addFeedDate} />
        </main>

        <section className="w-full">
          <DateFeed dates={feedDates} />
        </section>

        <footer className="text-center text-sm text-muted-foreground py-8">
          <p>&copy; {new Date().getFullYear()} VadaTracker. Powered by good food and good code.</p>
        </footer>
      </div>
    </div>
  );
}
