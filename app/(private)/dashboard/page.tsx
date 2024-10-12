import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlusCircleIcon } from 'lucide-react';
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

export default async function DashboardPage() {
  const { userId, redirectToSignIn } = auth();

  if (userId == null) return redirectToSignIn();

  const polls = await db.query.PollTable.findMany({
    where: ({ creatorId }, { eq }) => eq(creatorId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

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
            <p className="text-center">No active polls</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-4 md:px-6">
          <CardTitle className="text-lg flex flex-row justify-between items-center">
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="h-full rounded-lg bg-sky-50">
              <div className="flex flex-col space-y-1 p-4">
                <h6 className="text-foreground">{"Dog's Birthday Party"}</h6>
                <p className="text-muted-foreground text-sm">
                  October 18, 2024
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
