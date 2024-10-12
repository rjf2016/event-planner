'use client';

import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GuestForm from '@/components/forms/guestForm';
import { cn } from '@/lib/utils';
import CalendarDay from './CalendarDay';
import { Poll } from '@/interfaces';
import { Loader2Icon } from 'lucide-react';

type VoterProps = {
  poll: Poll;
  userId: string | null;
};

export default function Voter({ poll, userId }: VoterProps) {
  const [name, setName] = useState('');
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!userId && !name) {
    return <GuestForm setName={setName} />;
  }

  const toggleDateSelection = (dateId: number) => {
    setSelectedDates((prev) =>
      prev.includes(dateId)
        ? prev.filter((id) => id !== dateId)
        : [...prev, dateId]
    );
  };

  const handleSubmitVote = async () => {
    const voteData = {
      name,
      dateIds: selectedDates,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/vote/${poll.slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData),
      });

      if (response.ok) {
        console.log('Vote submitted successfully');
      } else {
        console.log('Failed to submit vote - ', response);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{'Possible dates'}</CardTitle>
        <CardDescription>
          {'Select the days you would be available'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1 sm:gap-2 md:gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 ">
          {poll.eventDates.map((date) => {
            return (
              <Card
                key={date.date}
                onClick={() => toggleDateSelection(date.id)}
                className={cn(
                  'w-full aspect-square flex flex-col cursor-pointer select-none',
                  selectedDates.includes(date.id)
                    ? 'bg-green-100 border-green-500'
                    : 'hover:bg-muted/50'
                )}
              >
                <CalendarDay date={date.date} />
              </Card>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmitVote}
          variant={'primary'}
          size={'lg'}
          className="w-44 mx-auto"
          disabled={!selectedDates.length}
        >
          {isSubmitting && <Loader2Icon className="animate-spin mr-2" />} Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
