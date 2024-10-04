'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarIcon, Loader2Icon } from 'lucide-react';
import { format } from 'date-fns';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { pollFormSchema } from './schemas';
import { cn } from '@/lib/utils';
import { createPoll } from '@/app/server/actions/polls';
import { toast } from '@/hooks/use-toast';

export default function PollForm() {
  const pollForm = useForm<z.infer<typeof pollFormSchema>>({
    resolver: zodResolver(pollFormSchema),
    defaultValues: {
      title: '',
      description: '',
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
  });

  async function onSubmit(data: z.infer<typeof pollFormSchema>) {
    const formResults = await createPoll(data);

    if (formResults?.error) {
      toast({
        variant: 'destructive',
        title: 'Error creating poll',
        description: formResults.error,
      });
    }
  }

  return (
    <Form {...pollForm}>
      <form onSubmit={pollForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={pollForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={pollForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short description"
                  className="resize-none h-28"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={pollForm.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Range</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full flex flex-row justify-start items-center text-left font-normal py-2 px-3 text-sm h-10',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, 'LLL dd, y')} -{' '}
                            {format(field.value.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        <p className="text-muted-foreground">
                          Pick a date range
                        </p>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex flex-col sm:flex-row">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      className="w-full"
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select a date range for your event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button
            type="submit"
            size={'lg'}
            variant={'primary'}
            className="mt-4"
            disabled={pollForm.formState.isSubmitting}
          >
            {pollForm.formState.isSubmitting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              'Create Poll'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
