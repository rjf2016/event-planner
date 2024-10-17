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
import ShareButton from '@/components/ShareButton';
import { headers } from 'next/headers';
import DateResult from '@/components/DateResult';
import BackButton from '@/components/BackButton';

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
    return (
      <div className="min-h-[70vh] text-center flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold">Poll not found</h1>
        <p className="text-muted-foreground">
          The poll you are looking for does not exist.
        </p>
        <BackButton variant={'super'} className="mt-4">
          Back
        </BackButton>
      </div>
    );
  }

  const getVotesForDate = (dateId: number) => {
    return poll.votes
      .filter((vote) => vote.dateId === dateId)
      .map((vote) => vote.guestName);
  };

  const dateVotes = poll.eventDates.map((date) => ({
    date,
    votes: getVotesForDate(date.id),
  }));

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex flex-row justify-between items-center">
          <div className="space-x-1 flex items-center">
            <Button variant={'outline'} size={'sm'}>
              <Edit className="mr-1.5 h-3.5 w-3.5" />
              Edit
            </Button>
            <ShareButton shareUrl={shareUrl} size="sm" />
          </div>
          <Button variant={'primary'} size={'sm'}>
            <CheckCircleIcon className="mr-1.5 h-3.5 w-3.5" />
            Complete
          </Button>
        </div>
        <div>
          <CardTitle className="text-lg">{poll.name}</CardTitle>
          <CardDescription>{poll.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold">Event Dates</h2>
          <div className="grid gap-1 md:gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
            {dateVotes.map(({ date, votes }) => (
              <DateResult key={date.id} date={date} votes={votes} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
