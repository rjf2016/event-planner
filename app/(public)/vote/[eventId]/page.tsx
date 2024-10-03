'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const VotePage = ({ params }: { params: { eventId: string } }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [votes, setVotes] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEventDetails = async () => {
      const res = await fetch(`/events/${params.eventId}`);
      const data = await res.json();
      setEventDetails(data);
    };
    fetchEventDetails();
  }, [params.eventId]);

  const handleVote = async () => {
    await fetch(`/vote/${params.eventId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ votes }),
    });
    router.push('/thank-you');
  };

  if (!eventDetails) return <p>Loading...</p>;

  return (
    <div className="h-full w-full flex flex-col">
      <h1 className="text-2xl font-semibold">{eventDetails.eventName}</h1>
      <p>{eventDetails.eventDescription}</p>
      <div className="space-y-4 mt-4">
        {eventDetails.selectedDates.map((date: string) => (
          <div key={date}>
            <Checkbox
              id={date}
              checked={votes.includes(date)}
              onCheckedChange={() => {
                setVotes((prev) =>
                  prev.includes(date)
                    ? prev.filter((v) => v !== date)
                    : [...prev, date]
                );
              }}
            />
            <label
              htmlFor={date}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {date}
            </label>
          </div>
        ))}
      </div>
      <Button className="mt-6 w-full" onClick={handleVote}>
        Submit Vote
      </Button>
    </div>
  );
};

export default VotePage;
