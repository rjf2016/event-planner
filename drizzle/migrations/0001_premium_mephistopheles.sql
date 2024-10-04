ALTER TABLE "polls" RENAME COLUMN "creator_id" TO "creatorId";--> statement-breakpoint
ALTER TABLE "polls" ALTER COLUMN "creatorId" SET DATA TYPE text;