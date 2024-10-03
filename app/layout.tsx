import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Event Planner',
  description: 'Plan your events with ease',
  icons:
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎉</text></svg>',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={`font-sans antialiased ${nunito.variable}`}>
          {/* <div className="flex flex-col h-full px-2 py-2">
            <div className="w-full text-center">
              <h1 className="text-2xl font-medium">🎉</h1>
            </div>
            <main className="flex flex-col flex-1 w-full items-center justify-center max-w-3xl mx-auto"> */}
          {children}
          {/* </main> */}
          <Toaster />
          {/* </div> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
