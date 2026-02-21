import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Dirk Nellens — Human Design',
  description: 'Understand your unique energetic architecture with an anthropologist and Certified Human Design Analyst of 20+ years.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans bg-[#F9F6F0] text-[#2C2C2C] antialiased selection:bg-[#D96C40] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
