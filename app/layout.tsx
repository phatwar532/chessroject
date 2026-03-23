import React from 'react';
import type { Metadata } from 'next';
import { Bodoni_Moda, Cormorant_Garamond, Playfair_Display, Raleway, EB_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { CustomCursor } from '@/components/shared/cursor';
import { PageLoadAnimation } from '@/components/shared/animations';

const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni', adjustFontFallback: false });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--font-cormorant', adjustFontFallback: false });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', adjustFontFallback: false });
const raleway = Raleway({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-raleway' });
const ebGaramond = EB_Garamond({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-eb-garamond', adjustFontFallback: false });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: 'Chaturangveda Academy',
  description: 'Master the Art of Chess',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${bodoni.variable} ${cormorant.variable} ${playfair.variable} ${raleway.variable} ${ebGaramond.variable} ${dmSans.variable} font-body bg-background text-text min-h-screen flex flex-col`}>
        <CustomCursor />
        <PageLoadAnimation>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </PageLoadAnimation>
      </body>
    </html>
  );
}
