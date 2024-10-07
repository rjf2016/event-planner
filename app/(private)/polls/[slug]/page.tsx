import { db } from '@/drizzle/db';
import { auth } from '@clerk/nextjs/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon, Edit } from 'lucide-react';
import CalendarDay from '@/components/CalendarDay';
import ShareButton from '@/components/ShareButton';
import { headers } from 'next/headers';
import { cn } from '@/lib/utils';

export default async function PollViewPage({
  params,
}: {
  params: { slug: string };
}) {
  const { userId, redirectToSignIn } = auth();
  if (userId == null) return redirectToSignIn();

  const headersList = headers();
  const hostname = headersList.get('x-forwarded-host');
  const protocol = headersList.get('x-forwarded-proto');
  const shareUrl = `${protocol}://${hostname}/vote/${params.slug}`;

  const poll = await db.query.PollTable.findFirst({
    where: ({ slug, creatorId }, { eq, and }) =>
      and(eq(slug, params.slug), eq(creatorId, userId)),
    with: {
      eventDates: true,
      votes: true,
    },
  });

  if (!poll) {
    return <div>Poll not found</div>;
  }

  const getVoteCountForDate = (dateId: number) => {
    return poll.votes.filter((vote) => vote.dateId === dateId).length;
  };

  return (
    <Card>
      <CardHeader className="px-4 md:px-6 lg:px-8 flex flex-row justify-between">
        <div>
          <CardTitle className="text-2xl">{poll.name}</CardTitle>
          <CardDescription>{poll.description}</CardDescription>
        </div>
        <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-2 space-y-2 lg:space-y-0">
          <ShareButton shareUrl={shareUrl} size="sm" />
          <Button variant={'outline'} size={'sm'}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant={'primary'} size={'sm'}>
            <CheckCircleIcon className="mr-2 h-4 w-4" />
            Complete
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 md:px-6 lg:px-6">
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold">Event Dates</h2>
          <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {poll.eventDates.map((date) => {
              const voteCount = getVoteCountForDate(date.id);
              return (
                <Card
                  key={date.date}
                  className={cn(
                    'min-w-32 h-32 overflow-hidden flex flex-col',
                    voteCount <= 0 && 'bg-muted/50 shadow-none'
                  )}
                >
                  <CalendarDay date={date.date} />
                  <p className="text-sm text-muted-foreground text-center mb-2">
                    {getVoteCountForDate(date.id)} votes
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
