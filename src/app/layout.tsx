import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { cn } from '@/lib/utils';
import { Playfair_Display, Aboreto, Poppins } from 'next/font/google';

const sansFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-sans',
});

const displayFont = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const secondaryDisplayFont = Aboreto({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-secondary-display',
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
    <html lang="pt-BR" suppressHydrationWarning className={`${sansFont.variable} ${displayFont.variable} ${secondaryDisplayFont.variable}`}>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
