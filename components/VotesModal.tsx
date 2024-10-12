'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

type VotesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  votes: string[];
  date: string;
};

export function VotesModal({ isOpen, onClose, votes, date }: VotesModalProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Votes</DialogTitle>
            <DialogDescription>
              List of users who voted for this date
            </DialogDescription>
          </DialogHeader>
          <VotesList votes={votes} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="min-h-80">
        <DrawerHeader className="text-left">
          <DrawerTitle>Votes</DrawerTitle>
          <DrawerDescription>
            List of users who voted for {date}
          </DrawerDescription>
        </DrawerHeader>
        <VotesList votes={votes} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function VotesList({
  className = '',
  votes,
}: {
  className?: string;
  votes: string[];
}) {
  return (
    <div className={cn(className)}>
      <ul>
        {votes.map((vote, index) => (
          <li key={index}>{vote}</li>
        ))}
      </ul>
    </div>
  );
}
