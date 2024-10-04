import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  const { userId } = auth();
  if (userId) redirect('/dashboard');

  return (
    <div className="min-h-full p-4 flex flex-col justify-center items-center space-y-2">
      <header className="w-full text-center mb-2">
        <h1 className="text-xl font-semibold">Event Planner</h1>
        <p className="text-lg">Plan your events with ease</p>
      </header>

      <Button asChild variant={'primary'} size={'lg'}>
        <Link href="/sign-in">Get Started</Link>
      </Button>
    </div>
  );
}
