'use client';

import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type BackButtonProps = Omit<ButtonProps, 'asChild'>;

export default function BackButton({
  children,
  onClick,
  ...props
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    } else {
      router.back();
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={props?.variant || 'outline'}
      {...props}
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      {children}
    </Button>
  );
}
