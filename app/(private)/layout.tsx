import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full w-full flex-col items-center">
      <nav className="flex flex-row justify-between items-center px-4 py-2 w-full text-center">
        <Link href="/" className="text-lg">
          🎉
        </Link>
        <UserButton />
      </nav>
      <main className="flex flex-col p-4">{children}</main>
    </div>
  );
}
