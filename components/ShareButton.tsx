'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCheckIcon, Copy, Share2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ShareButtonProps = {
  shareUrl: string;
  size?: 'sm' | 'lg';
};

export default function ShareButton({ shareUrl, size }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={size}>
          <Share2Icon
            className={cn('mr-2 h-4 w-4', size === 'sm' && 'h-3.5 w-3.5')}
          />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={shareUrl} readOnly />
          </div>
          <Button
            variant={'outline'}
            className="h-full rounded-lg"
            onClick={handleCopy}
          >
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <CheckCheckIcon className="h-4 w-4 text-green-600 animate-slide-up" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start mt-2 sm:mt-0">
          <DialogClose asChild>
            <Button type="button" variant="primary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
