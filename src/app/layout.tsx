import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { cn } from '@/lib/utils';
import { Playfair_Display, Aboreto } from 'next/font/google';

const sansFont = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const displayFont = Aboreto({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Eloisa & Jean - Wedding Invitation',
  description: 'Join us to celebrate the wedding of Eloisa & Jean.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${sansFont.variable} ${displayFont.variable}`}>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
