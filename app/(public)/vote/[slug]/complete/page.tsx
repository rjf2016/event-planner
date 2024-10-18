import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import { CheckCircleIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';

function GuestActions() {
  return (
    <div className="flex flex-col items-center space-y-4 w-64">
      <p className="text-center text-sm text-muted-foreground">
        {
          "Want to create your own polls? Create an account, it's completely free!"
        }
      </p>
      <Button variant={'primary'} asChild className={'w-44'}>
        <Link href="/sign-up">Create an account</Link>
      </Button>
      <Button variant={'outline'} asChild className={'w-44'}>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}

function AuthenticatedActions() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Button variant={'outline'} asChild className={'w-[160px]'}>
        <Link href="/dashboard">
          <HomeIcon className="w-3.5 h-3.5 mr-2" />
          Home
        </Link>
      </Button>
    </div>
  );
}

export default function VoteCompletePage() {
  const { userId } = auth();

  return (
    <div className="flex flex-col min-h-[75vh] justify-center items-center">
      <div className="animate-slide-down flex flex-col items-center space-y-12 transition-transform">
        <div className="flex flex-col items-center space-y-4">
          <CheckCircleIcon size={64} className="text-emerald-500" />
          <h1 className="text-pretty text-center text-xl">
            Thank you for voting!
          </h1>
        </div>

        {userId ? <AuthenticatedActions /> : <GuestActions />}
      </div>
    </div>
  );
}
