import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
  const { userId } = auth();
  if (userId) redirect('/events');

  return (
    <div className="min-h-full p-4 flex flex-col justify-center items-center">
      <header className="w-full text-center mb-2">
        <h1 className="text-xl font-semibold">Event Planner</h1>
        <p className="text-lg">Plan your events with ease</p>
      </header>

      <Button asChild>
        <Link href="/sign-up">Sign Up</Link>
      </Button>

      <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
