import { NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { VoteTable } from '@/drizzle/schema';
import { z } from 'zod';

const voteSchema = z.object({
  name: z.string().optional(),
  dateIds: z.array(z.number()).nonempty('At least one date must be selected'), // Array of selected event date IDs
});

// POST request handler to submit a vote
export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const pollSlug = params.slug;

  try {
    // Parse the request body
    const json = await req.json();
    const parsedData = voteSchema.safeParse(json);

    // Validate request data using Zod
    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid vote data', details: parsedData.error },
        { status: 400 }
      );
    }

    const { name, dateIds } = parsedData.data;

    // Fetch the poll using the provided slug
    const poll = await db.query.PollTable.findFirst({
      where: ({ slug }, { eq }) => eq(slug, pollSlug),
      with: {
        eventDates: true,
      },
    });

    // Check if the poll exists
    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }

    // Validate that each selected date belongs to this poll
    const validDateIds = poll.eventDates.map((date) => date.id);
    const invalidDates = dateIds.filter((id) => !validDateIds.includes(id));

    if (invalidDates.length > 0) {
      return NextResponse.json(
        { error: 'Invalid event dates selected' },
        { status: 400 }
      );
    }

    // Insert each selected date as a separate vote
    const votes = dateIds.map((dateId) => ({
      pollId: poll.id,
      guestName: name || 'Anonymous',
      dateId,
    }));

    await db.insert(VoteTable).values(votes);

    // Return a success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
