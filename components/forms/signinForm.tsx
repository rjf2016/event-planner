'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSignIn } from '@clerk/nextjs';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { signInFormSchema } from './schemas';
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react';

export default function SignInForm() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof signInFormSchema>) {
    if (!isLoaded) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        setActive({
          session: result.createdSessionId,
        });
      }
    } catch (err: unknown) {
      console.error('Error during sign-in:', err);
      toast({
        variant: 'destructive',
        title: 'Sign-in failed',
        description: 'Please check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full grid gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="hello@world.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                        {...field}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={'primary'}
              type="submit"
              className="mt-4 w-1/2 mx-auto"
            >
              {isLoading && (
                <Loader2Icon className="animate-spin mr-1 w-4 h-4" />
              )}
              Submit
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm">
          {"Don't have an account? "}
          <Button
            variant={'link'}
            className="normal-case font-semibold tracking-normal"
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}
