import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const serif = localFont({
  src: [
    { path: '../public/fonts/DMSerifDisplay-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/DMSerifDisplay-Italic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
});

const sans = localFont({
  src: [
    { path: '../public/fonts/Figtree-Light.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/Figtree-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Figtree-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Figtree-LightItalic.ttf', weight: '300', style: 'italic' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dirk Nellens — Human Design',
  description: 'Understand your unique energetic architecture with an anthropologist and Certified Human Design Analyst of 20+ years.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans bg-[#F9F6F0] text-[#2C2C2C] antialiased selection:bg-[#D96C40] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
