"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

export function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="flex items-center justify-center text-lg font-medium text-foreground/80 p-2 bg-card shadow-sm rounded-lg">
      <Clock className="mr-2 h-5 w-5 text-primary" />
      <span>{format(currentTime, 'dd/MM/yyyy HH:mm:ss')}</span>
    </div>
  );
}
