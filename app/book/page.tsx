import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

import { HeroBook } from '@/components/book/HeroBook';
import { BookIntroCards } from '@/components/book/BookIntroCards';
import { QuoteBook } from '@/components/book/QuoteBook';
import { BookDescription } from '@/components/book/BookDescription';
import { AuthorBioBook } from '@/components/book/AuthorBioBook';
import { NewsletterHome } from '@/components/home/NewsletterHome';
import { BookPromoCampaign } from '@/components/BookPromoCampaign';

export const metadata = {
  title: 'Understanding Our Energetic Architecture', // template will append " | Dirk Nellens"
  description: 'A transformative understanding of our shared energetic blueprint.',
  openGraph: {
    title: 'Understanding Our Energetic Architecture | Dirk Nellens',
    description: 'A transformative understanding of our shared energetic blueprint.',
    images: [{ url: '/images/book-cover.jpg' }],
  }
};

export default function BookPage() {
  return (
    <main className="min-h-screen flex flex-col pt-0">
      <Navigation />

      <HeroBook />
      <BookIntroCards />
      <QuoteBook />
      <BookDescription />
      <AuthorBioBook />
      <BookPromoCampaign />
      <NewsletterHome />

      <Footer />
    </main>
  );
}
