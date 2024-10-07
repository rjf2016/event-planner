import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full w-full max-w-5xl mx-auto flex flex-col space-y-4 items-center">
      <nav className="flex flex-row justify-between items-center px-4 py-2 w-full text-center">
        <Link href="/" className="text-xl">
          🎉
        </Link>
        <div className="flex flex-row space-x-6 items-center">
          <UserButton />
        </div>
      </nav>
      <main className="flex flex-col p-4 w-full">{children}</main>
    </div>
  );
}
