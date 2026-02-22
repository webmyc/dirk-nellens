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
  title: {
    default: 'Dirk Nellens — Human Design Analyst',
    template: '%s | Dirk Nellens',
  },
  description: 'Understand your unique energetic architecture with an anthropologist and Certified Human Design Analyst of 20+ years.',
  metadataBase: new URL('https://dirk.respira.cafe'),
  openGraph: {
    title: 'Dirk Nellens — Human Design Analyst',
    description: 'Understand your unique energetic architecture with an anthropologist and Certified Human Design Analyst.',
    url: 'https://dirk.respira.cafe',
    siteName: 'Dirk Nellens',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/dirk-2.jpg',
        width: 1200,
        height: 630,
        alt: 'Dirk Nellens — Human Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dirk Nellens — Human Design Analyst',
    description: 'Understand your unique energetic architecture with an anthropologist and Certified Human Design Analyst of 20+ years.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans bg-[#F0EBE3] text-[#2B2218] antialiased selection:bg-[#C96A45] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
