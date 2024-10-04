import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-full p-4 flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
