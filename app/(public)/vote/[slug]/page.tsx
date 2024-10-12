import { db } from '@/drizzle/db';
import { auth } from '@clerk/nextjs/server';
import Voter from '@/components/Voter';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  // Fetch poll data by slug
  const poll = await db.query.PollTable.findFirst({
    where: ({ slug: pollSlug }, { eq }) => eq(pollSlug, slug),
    with: {
      eventDates: true,
    },
  });

  if (!poll)
    return {
      title: 'Poll not found',
      description: 'The poll you are looking for does not exist',
    };

  return {
    title: poll.name,
    description: poll.description,

    openGraph: {
      title: 'Vote Now!',
      description: `${poll.name}`,
      siteName: 'Event Planner',
      type: 'website',
      images: {
        url: '/party.jpg',
        width: 1200,
        height: 630,
      },
    },
  };
}

export default async function VotePage({ params }: Props) {
  const { userId } = auth();

  // Fetch poll data by slug
  const poll = await db.query.PollTable.findFirst({
    where: ({ slug: pollSlug }, { eq }) => eq(pollSlug, params.slug),
    with: {
      eventDates: true,
    },
  });

  if (!poll) {
    return <div>Poll not found</div>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
      <header className="w-full text-center">
        <h1 className="text-lg font-semibold text-pretty">{poll.name}</h1>
        <p className="text-sm text-muted-foreground text-pretty">
          {poll.description}
        </p>
      </header>

      <Voter poll={poll} userId={userId} />
    </div>
  );
}
