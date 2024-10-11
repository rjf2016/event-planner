export type Poll = {
  id: number;
  name: string;
  description: string;
  creatorId: string;
  slug: string;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
  eventDates: {
    id: number;
    date: string;
    createdAt: Date;
    updatedAt: Date;
    pollId: number;
  }[];
};
