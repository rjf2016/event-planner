'use client';

import { useState } from 'react';
import { UserRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import CalendarDay from '@/components/CalendarDay';
import { cn } from '@/lib/utils';
import { VotesModal } from '@/components/VotesModal';

type DateResultProps = {
  date: { date: string };
  votes: string[];
};

export default function DateResult({ date, votes }: DateResultProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const hasVotes = votes?.length > 0;

  const handleCardClick = () => {
    if (hasVotes) {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <Card
        key={date.date}
        className={cn(
          'w-full aspect-square flex flex-col p-2 relative',
          !hasVotes && 'bg-muted opacity-50 shadow-none cursor-default',
          hasVotes && 'cursor-pointer shadow-sm'
        )}
        onClick={handleCardClick}
      >
        <CalendarDay date={date.date} />
        <div className="absolute bottom-0.5 left-2 h-4 md:h-5">
          {hasVotes && (
            <div className="flex flex-row justify-center items-center space-x-0.5 text-green-600">
              <UserRound fill="#dcfce7" className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <p className="text-sm md:text-base">{votes?.length}</p>
            </div>
          )}
        </div>
      </Card>
      <VotesModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        votes={votes}
        date={date.date}
      />
    </>
  );
}
