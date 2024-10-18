import { getPollBySlugWithQuestions } from '@/actions/polls';
import BackButton from '@/components/BackButton';
import Voter from '@/components/Voter';
import { auth } from '@clerk/nextjs/server';

type Props = {
  params: { slug: string };
};

export default async function VotingStartPage({ params }: Props) {
  const { userId } = auth();

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

  return <Voter poll={poll} userId={userId} />;
}
