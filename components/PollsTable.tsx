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

  return (
    <>
      {polls.length > 0 ? (
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
                <TableCell className="font-medium">
                  <Link
                    href={`/polls/${poll.slug}`}
                    className="block w-full h-full"
                  >
                    {poll.name}
                  </Link>
                </TableCell>
                <TableCell className="text-right text-secondary">
                  Active
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-2 space-y-1">
          <p>You have no active polls</p>
          <p className="text-muted-foreground">
            Create a new poll to get started!
          </p>
        </div>
      )}
    </>
  );
}
