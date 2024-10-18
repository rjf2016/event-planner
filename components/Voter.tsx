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
import { useRouter } from 'next/navigation';

type VoterProps = {
  poll: Poll;
  userId: string | null;
};

export default function Voter({ poll, userId }: VoterProps) {
  const [name, setName] = useState('test');
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
        router.replace(`/vote/${poll.slug}/complete`);
      } else {
        console.log('Failed to submit vote - ', response);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">{'Possible dates'}</CardTitle>
        <CardDescription>
          {'Select the days you would be available'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 items-center justify-center ">
          {poll.eventDates.map((date) => {
            return (
              <Card
                key={date.id}
                onClick={() => toggleDateSelection(date.id)}
                className={cn(
                  'w-[68px] md:w-20 lg:w-24 aspect-square flex flex-col cursor-pointer select-none shadow-none rounded-sm transition-colors',
                  selectedDates.includes(date.id) &&
                    'bg-emerald-100 border-emerald-300 text-emerald-950'
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
          className="w-40 mx-auto mt-2"
          disabled={!selectedDates.length || isSubmitting}
        >
          {isSubmitting && (
            <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
          )}
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
