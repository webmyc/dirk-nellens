import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Modular Homepage Sections
import { HeroHome } from '@/components/home/HeroHome';
import { QuoteHome } from '@/components/home/QuoteHome';
import { AboutBio } from '@/components/home/AboutBio';
import { CoursesHome } from '@/components/home/CoursesHome';
import { SessionsHome } from '@/components/home/SessionsHome';
import { TestimonialsHome } from '@/components/home/TestimonialsHome';
import { BookPreviewHome } from '@/components/home/BookPreviewHome';
import { NewsletterHome } from '@/components/home/NewsletterHome';
import { MediaHome } from '@/components/home/MediaHome';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col pt-0">
      <Navigation />

      <HeroHome />
      <QuoteHome />
      <AboutBio />
      <CoursesHome />
      <SessionsHome />
      <TestimonialsHome />
      <BookPreviewHome />
      <NewsletterHome />
      <MediaHome />

      <Footer />
    </main>
  );
}
