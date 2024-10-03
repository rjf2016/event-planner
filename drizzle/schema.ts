import {
  pgTable,
  serial,
  varchar,
  integer,
  date,
  boolean,
  text,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

// Timestamp fields
const createdAt = timestamp('created_at').notNull().defaultNow();
const updatedAt = timestamp('updated_at')
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

// Polls table
export const PollTable = pgTable(
  'polls',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    creatorId: varchar('creator_id', { length: 255 }).notNull(), // Clerk user ID
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    isClosed: boolean('is_closed').default(false).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      pollSlugIndex: index('poll_slug_idx').on(table.slug),
    };
  }
);

// Event Dates table
export const EventDateTable = pgTable(
  'event_dates',
  {
    id: serial('id').primaryKey(),
    pollId: integer('poll_id')
      .references(() => PollTable.id)
      .notNull(),
    date: date('date').notNull(),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      eventDatePollIdIndex: index('event_date_poll_id_idx').on(table.pollId),
    };
  }
);

// Questions table
export const QuestionTable = pgTable(
  'questions',
  {
    id: serial('id').primaryKey(),
    pollId: integer('poll_id')
      .references(() => PollTable.id)
      .notNull(),
    questionText: varchar('question_text', { length: 500 }).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      questionPollIdIndex: index('question_poll_id_idx').on(table.pollId),
    };
  }
);

// Question Options table
export const QuestionOptionTable = pgTable(
  'question_options',
  {
    id: serial('id').primaryKey(),
    questionId: integer('question_id')
      .references(() => QuestionTable.id)
      .notNull(),
    optionText: varchar('option_text', { length: 255 }).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      questionOptionQuestionIdIndex: index(
        'question_option_question_id_idx'
      ).on(table.questionId),
    };
  }
);

// Votes table
export const VoteTable = pgTable(
  'votes',
  {
    id: serial('id').primaryKey(),
    pollId: integer('poll_id')
      .references(() => PollTable.id)
      .notNull(),
    guestName: varchar('guest_name', { length: 100 }).notNull(),
    dateId: integer('date_id').references(() => EventDateTable.id),
    optionId: integer('option_id').references(() => QuestionOptionTable.id),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      votePollIdIndex: index('vote_poll_id_idx').on(table.pollId), // Index on pollId
      voteGuestNameIndex: index('vote_guest_name_idx').on(table.guestName), // Optional index on guestName for searching
    };
  }
);

// Invitations table
export const invitationTable = pgTable(
  'invitations',
  {
    id: serial('id').primaryKey(),
    pollId: integer('poll_id')
      .references(() => PollTable.id)
      .notNull(),
    selectedDateId: integer('selected_date_id')
      .references(() => EventDateTable.id)
      .notNull(),
    selectedLocation: varchar('selected_location', { length: 500 }).notNull(),
    finalInviteUrl: varchar('final_invite_url', { length: 255 }).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      invitationPollIdIndex: index('invitation_poll_id_idx').on(table.pollId),
    };
  }
);
