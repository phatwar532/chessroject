import React from 'react';
import type { Metadata } from 'next';
import { Bodoni_Moda, Cormorant_Garamond, Playfair_Display, Raleway, EB_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { ScrollProgress } from '@/components/shared/scroll-progress';

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
        {/* Global Film Grain */}
        <div className="pointer-events-none fixed inset-0 z-[999] h-[100vh] w-[100vw] opacity-[0.04] mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
