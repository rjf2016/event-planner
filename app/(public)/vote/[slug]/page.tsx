import { clerkClient } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPollBySlug, getPollBySlugWithQuestions } from '@/actions/polls';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  // Fetch poll data by slug
  const poll = await getPollBySlug(slug);

  if (!poll)
    return {
      title: 'Poll not found',
      description: 'The poll you are looking for does not exist',
    };

  return {
    title: poll.name,
    description: poll.description,

    openGraph: {
      title: `${poll.name}`,
      description: 'Vote Now!',
      siteName: 'Event Planner',
      images: {
        url: '/party.jpg',
        width: 1200,
        height: 630,
      },
    },
  };
}

export default async function VotePage({ params }: Props) {
  const poll = await getPollBySlugWithQuestions(params.slug);

  if (!poll) {
    return (
      <div className="min-h-[70vh] text-center flex flex-col space-y-4 items-center justify-center">
        <div>
          <h1 className="text-2xl font-semibold">Poll not found</h1>
          <p className="text-muted-foreground">
            The poll you are looking for does not exist.
          </p>
        </div>
        <BackButton variant={'primary'}>Back</BackButton>
      </div>
    );
  }

  const creator = await clerkClient.users.getUser(poll.creatorId);

  return (
    <div className="flex flex-col space-y-8">
      <header className="bg-emerald-100 text-emerald-950 mx-auto px-4 py-2 rounded-2xl">
        <h1 className="text-pretty text-center">
          <span className="font-semibold">{`${creator.firstName} ${creator.lastName} `}</span>
          has invited you to vote!
        </h1>
      </header>

      <Card className="max-w-sm mx-auto w-full pt-4">
        <CardHeader>
          <CardTitle>{poll.name}</CardTitle>
          <CardDescription className="text-base">
            {poll.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center space-y-4 mt-2">
          <div>
            <Button variant="primary" className="w-44" asChild>
              <Link href={`/vote/${poll.slug}/start`}>Start</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
