import { db } from '@/drizzle/db';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function PollsTable() {
  const { userId, redirectToSignIn } = auth();

  if (userId == null) return redirectToSignIn();

  const polls = await db.query.PollTable.findMany({
    where: ({ creatorId }, { eq }) => eq(creatorId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  if (!polls || polls.length === 0)
    return (
      <div className="text-center py-4">
        <p>You have no active polls</p>
        <p className="text-muted-foreground text-sm">
          Create a new poll to get started!
        </p>
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Title</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {polls.map((poll) => (
          <TableRow key={poll.slug} className="h-12">
            <TableCell className="font-medium py-0">
              <Link
                href={`/polls/${poll.slug}`}
                className="inline-flex leading-8 w-full h-full"
              >
                {poll.name}
              </Link>
            </TableCell>
            <TableCell className="text-right text-secondary">Active</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
