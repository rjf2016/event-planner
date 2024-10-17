import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';
import PollsTable from '@/components/PollsTable';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  // const { userId, redirectToSignIn } = auth();
  // if (userId == null) return redirectToSignIn();

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <Card>
        <CardHeader className="px-4 md:px-6">
          <CardTitle className="text-lg flex flex-row justify-between items-end">
            Polls
            <Button variant={'primary'} size={'sm'} asChild>
              <Link href="/polls/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 md:px-4">
          <Suspense
            fallback={
              <div className="w-full space-y-2 px-4">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
            }
          >
            <PollsTable />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-4 md:px-6">
          <CardTitle className="text-lg flex flex-row justify-between items-center">
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <p className="text-muted-foreground text-center text-sm">
            No upcoming events
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
