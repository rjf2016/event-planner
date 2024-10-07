'use client';

import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import GuestForm from '@/components/forms/guestForm';
import { cn } from '@/lib/utils';
import CalendarDay from './CalendarDay';

type VoterProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  poll: any;
  userId: string | null;
};

export default function Voter({ poll, userId }: VoterProps) {
  const [name, setName] = useState('');
  const [selectedDates, setSelectedDates] = useState<number[]>([]);

  if (!userId && !name) {
    return <GuestForm setName={setName} />;
  }

  return (
    <Card className="w-full">
      <CardHeader className="px-4 md:px-6 lg:px-6">
        <CardTitle className="text-lg">{'Possible dates'}</CardTitle>
        <CardDescription>
          {'Select the days you would be available'}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 md:px-6 lg:px-6">
        <div className="grid gap-1 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {poll.eventDates.map((date: any) => {
            return (
              <Card
                key={date.date}
                onClick={() => {
                  setSelectedDates((dates) => {
                    if (dates.includes(date.date)) {
                      return dates.filter((d) => d !== date.date);
                    }
                    return [...dates, date.date];
                  });
                }}
                className={cn(
                  'w-full aspect-square flex flex-col hover:bg-muted/50 cursor-pointer',
                  selectedDates.includes(date.date) &&
                    'bg-green-400/50 hover:bg-green-400/50'
                )}
              >
                <CalendarDay date={date.date} />
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
