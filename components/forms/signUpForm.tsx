'use client';

import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

import SignUpFormComponent from '@/components/forms/newUserForm';
import VerificationFormComponent from '@/components/forms/verifyForm';
import { newUserFormSchema, verificationSchema } from './schemas';

export default function SignUpForm() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof newUserFormSchema>) {
    if (!isLoaded) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        setActive({
          session: result.createdSessionId,
        });
      } else {
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });
        setVerifying(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error during sign-up:', err);
      const errorMessage =
        err.errors?.[0]?.message ||
        'Sign-up failed. Please check your credentials and try again.';
      toast({
        variant: 'destructive',
        title: 'Sign-up failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onVerify(data: z.infer<typeof verificationSchema>) {
    if (!isLoaded) return;

    setIsLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: data.pin,
      });

      if (result.status === 'complete') {
        setActive({
          session: result.createdSessionId,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Verification failed',
          description: 'Please check the code and try again.',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error during verification:', err);
      const errorMessage =
        err.errors?.[0]?.message ||
        'Verification failed. Please check the code and try again.';
      toast({
        variant: 'destructive',
        title: 'Verification failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return verifying ? (
    <VerificationFormComponent onVerify={onVerify} isLoading={isLoading} />
  ) : (
    <SignUpFormComponent onSubmit={onSubmit} isLoading={isLoading} />
  );
}
