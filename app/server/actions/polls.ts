'use server';

import 'use-server';
import { EventDateTable, PollTable } from '@/drizzle/schema';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { redirect } from 'next/navigation';

import { db } from '@/drizzle/db';
import { pollFormSchema } from '@/components/forms/schemas';

// Helper function to generate an array of dates between two dates
function generateDateRange(from: Date, to: Date): string[] {
  const dateArray: string[] = [];
  const currentDate = new Date(from);

  // Remove time part by setting to 00:00:00 UTC
  currentDate.setUTCHours(0, 0, 0, 0);

  while (currentDate <= to) {
    dateArray.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setUTCHours(0, 0, 0, 0);
  }

  return dateArray;
}

export async function createPoll(
  unsafeData: z.infer<typeof pollFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { userId } = auth();
  const { success, data } = pollFormSchema.safeParse(unsafeData);

  if (!success || !userId) {
    return { error: true };
  }

  // Insert the poll into the database
  const poll = await db
    .insert(PollTable)
    .values({
      name: data.title,
      description: data.description,
      creatorId: userId,
    })
    .returning();

  const dates = generateDateRange(
    new Date(data.dateRange.from),
    new Date(data.dateRange.to)
  );

  const dateRecords = dates.map((date) => ({
    pollId: poll[0].id,
    date,
  }));

  // Insert the event dates into the EventDateTable
  await db.insert(EventDateTable).values(dateRecords);

  redirect('/dashboard');
}
