import React from 'react';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { SessionProvider } from '@/components/providers/SessionProvider';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'X-hunt | Experience Marketplace',
  description: 'Discover immersive real-world challenges and digital rewards',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
