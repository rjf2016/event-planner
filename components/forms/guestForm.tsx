'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { guestFormSchema } from './schemas';

type GuestFormProps = {
  setName: (name: string) => void;
};

export default function GuestForm({ setName }: GuestFormProps) {
  const form = useForm<z.infer<typeof guestFormSchema>>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(data: z.infer<typeof guestFormSchema>) {
    setName(data.name);
  }

  return (
    <div className="pt-8 w-full flex flex-col items-center">
      <Card className="max-w-lg w-full pt-6">
        <CardHeader>
          <CardTitle>Enter your name to vote</CardTitle>
          <CardDescription>
            Your name will be visible to the poll creator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full grid gap-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="name" placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={'primary'}
                type="submit"
                className="w-44 mx-auto"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
