'use server';

import { db } from '@/drizzle/db';

export async function getPollBySlug(slug: string) {
  return await db.query.PollTable.findFirst({
    where: ({ slug: pollSlug }, { eq }) => eq(pollSlug, slug),
    with: {
      eventDates: true,
    },
  });
}

export async function getPollBySlugWithQuestions(slug: string) {
  return await db.query.PollTable.findFirst({
    where: ({ slug: pollSlug }, { eq }) => eq(pollSlug, slug),
    with: {
      eventDates: true,
      questions: true,
    },
  });
}
