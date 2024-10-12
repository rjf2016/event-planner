'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2Icon, EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { newUserFormSchema } from './schemas';

type SignUpFormProps = {
  onSubmit: (data: z.infer<typeof newUserFormSchema>) => void;
  isLoading: boolean;
};

export default function SignUpFormComponent({
  onSubmit,
  isLoading,
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof newUserFormSchema>>({
    resolver: zodResolver(newUserFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your details below to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md grid gap-2"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="First Name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="hello@world.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  {fieldState.error ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      Password must be at least 8 characters long
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <Button
              variant={'primary'}
              type="submit"
              className="mt-4 w-1/2 mx-auto"
              disabled={isLoading}
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : 'Submit'}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm">
          {'Already have an account? '}
          <Button
            variant={'link'}
            className="normal-case font-semibold tracking-normal"
            disabled={isLoading}
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}
