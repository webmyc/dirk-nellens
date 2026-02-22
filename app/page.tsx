'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

const heroSlides = [
  {
    id: 'sessions',
    text: "Dirk's unique Human Design Sessions integrate therapeutic and meditative processes",
    cta: 'Book a session',
    ctaHref: '/sessions',
    image: '/images/collage-heart.png',
    imageAlt: 'Human Design collage',
    imageClass: 'object-contain drop-shadow-2xl',
  },
  {
    id: 'book',
    text: "'Understanding our Energetic Architecture' is now available on Amazon",
    cta: 'Shop the book',
    ctaHref: '/book',
    image: '/images/book-transparent.png',
    imageAlt: 'Understanding Our Energetic Architecture',
    imageClass: 'object-contain drop-shadow-2xl',
  },
  {
    id: 'substack',
    text: 'Articles by Dirk on Human Design available on Substack',
    cta: 'Read the articles',
    ctaHref: 'https://substack.com',
    image: '/images/substack.png',
    imageAlt: 'Substack',
    imageClass: 'object-contain p-16 drop-shadow-xl',
  },
];

const sessionCards = [
  {
    title: 'Personal Chart Analysis',
    desc: "This session offers a clear, compassionate mirror of who you are beneath conditioning—how your energy moves, how you make decisions, and how life flows most naturally for you.\n\nWhether you're seeking clarity in relationships, career, or your creative path, a Human Design Personal Chart Analysis helps you live your life, your pattern—not someone else's.",
    href: '/sessions#chart-analysis',
  },
  {
    title: 'Connection Chart Analysis',
    desc: 'Human Design offers a profound lens for understanding how two people connect. A Connection Chart Analysis maps the energetic interplay between both charts, revealing who brings which qualities to the relationship, where sparks ignite, and where friction invites growth.\n\nThis analysis brings clarity to patterns of attraction, communication, and influence—whether between partners, friends, family members, or collaborators.',
    href: '/sessions#connection',
  },
  {
    title: "Human Design & Personal Guidance",
    desc: 'By using Human Design as a subtle but powerful lens, any life situation can become a doorway to recognising and embodying your true authenticity.',
    href: '/sessions#guidance',
  },
  {
    title: "'Opening to Change' Session",
    desc: "Feeling stuck or uncertain about your next step?\nIf life feels confusing or you sense the need for change but aren't sure where to start, this session offers a supportive starting point.\n\nBy beginning from where you are, learning to listen deeply to your heart, and approaching challenges with greater awareness, initiating a transformative process of clarity and openness becomes possible.",
    href: '/sessions#opening-to-change',
  },
];

const testimonials = [
  {
    quote: "Dirk introduced me to my Bodygraph and told me things about myself that I didn't know and yet that somehow felt true. He made me feel inspired to be curious about myself and curious to see if life can be different if I change my approach towards myself and towards how I live with what I learnt from my Bodygraph. Which is huge!",
    author: 'Sophie',
    collage: '/images/collage-heart-composition.png',
  },
  {
    quote: "Dirk introduced me to my Bodygraph and told me things about myself that I didn't know and yet that somehow felt true. He made me feel inspired to be curious about myself and curious to see if life can be different if I change my approach towards myself and towards how I live with what I learnt from my Bodygraph. Which is huge!",
    author: 'Sophie',
    collage: '/images/collage-g-center-composition.png',
  },
  {
    quote: "Dirk introduced me to my Bodygraph and told me things about myself that I didn't know and yet that somehow felt true. He made me feel inspired to be curious about myself and curious to see if life can be different if I change my approach towards myself and towards how I live with what I learnt from my Bodygraph. Which is huge!",
    author: 'Sophie',
    collage: '/images/collage-ajna-composition.png',
  },
];

export default function Home() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const heroTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextHero = useCallback(() => setHeroSlide(s => (s + 1) % heroSlides.length), []);
  const prevHero = useCallback(() => setHeroSlide(s => (s - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    heroTimerRef.current = setInterval(nextHero, 5000);
    return () => { if (heroTimerRef.current) clearInterval(heroTimerRef.current); };
  }, [nextHero]);

  const handleHeroNav = (fn: () => void) => {
    if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    fn();
    heroTimerRef.current = setInterval(nextHero, 5000);
  };

  const nextTestimonial = () => setTestimonialSlide(s => (s + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialSlide(s => (s - 1 + testimonials.length) % testimonials.length);

  const slide = heroSlides[heroSlide];
  const testimonial = testimonials[testimonialSlide];

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero / Carousel */}
      <section className="relative min-h-screen flex items-center bg-[#D96C40] text-white overflow-hidden">
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid md:grid-cols-2 gap-10 items-center py-32 md:py-40">
          {/* Text side */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-text'}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="flex flex-col gap-8"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.08] font-normal">
                {slide.text}
              </h1>

              <div>
                <Link
                  href={slide.ctaHref}
                  className="inline-block bg-white text-[#2C2C2C] px-8 py-4 rounded-full font-sans font-medium text-sm hover:bg-[#F9F6F0] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                >
                  {slide.cta}
                </Link>
              </div>

              {/* Carousel controls */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => handleHeroNav(prevHero)}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/15 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleHeroNav(() => setHeroSlide(i))}
                      className={`rounded-full transition-all duration-300 ${i === heroSlide ? 'w-5 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/35 hover:bg-white/60'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleHeroNav(nextHero)}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/15 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Image side */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-image'}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative h-[340px] md:h-[520px] flex items-center justify-center"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                className={slide.imageClass}
                priority
                sizes="(max-width: 768px) 90vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Quote block */}
      <section className="py-20 bg-[#F9F6F0] border-b border-[#2C2C2C]/8">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-[#2C2C2C] italic"
          >
            "Human Design is not about what you know—it's about how you live, and about letting the process of awareness transform you from within."
          </motion.blockquote>
        </div>
      </section>

      {/* About teaser */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-[2rem] overflow-hidden"
          >
            <Image
              src="/images/dirk-1.jpg"
              alt="Dirk Nellens"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#2C2C2C]">
              A certified Human Design Analyst with more than 20 years of experience, Dirk has conducted over 4,000 readings and trainings internationally.
            </h2>

            <div className="space-y-5 text-[#2C2C2C]/75 leading-relaxed font-sans text-[0.97rem]">
              <p>
                He discovered Human Design in 2002 and is one of the very few Reflector Types—comprising just 1% of the population—to have had the rare privilege of studying directly under the Human Design founder Ra Uru Hu in Ibiza for many years.
              </p>
              <p>
                Dirk's therapeutic background includes formal training in body-centered approaches such as inner child work, co-dependency recovery, breathwork, family constellations, and the Enneagram, as well as active meditative practices developed by Osho, which he profoundly explored during his years at the Osho Meditation Resort in Pune, India.
              </p>
              <p>
                The integration of Human Design with therapeutic and meditative pathways forms the foundation of Dirk's work.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-block bg-[#D96C40] text-white px-8 py-4 rounded-full font-sans font-medium text-sm hover:bg-[#c25a30] transition-colors w-fit mt-2"
            >
              Learn more
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Courses teaser */}
      <section className="py-20 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C2C2C]">Courses taught by Dirk</h2>
            <p className="text-[#2C2C2C]/70 font-sans leading-relaxed">
              Dirk's courses offer a methodology to embody Human Design in a living, participatory, and co-creative way.
            </p>
            <blockquote className="font-serif text-lg md:text-xl leading-relaxed text-[#2C2C2C] border-l-2 border-[#D96C40] pl-5">
              "I have noticed that after their Chart Analysis many of my clients ask me, 'Now what? How do I start to live my Human Design?' It is this feedback that has inspired the creation of my courses, which are dedicated to bridging Human Design with experiential and therapeutic pathways for self-discovery and transformation.
              <br /><br />
              Indeed, I have learned the most about myself not through theory and information, but through therapy, creative expression, meditation, dance, deep conversations, listening, music, touch, breath—anything that moves the body and strengthens the inner witness. It's in these spaces that Human Design truly comes alive for me. And it's in this spirit that I feel called to continue contributing."
              <footer className="mt-3 font-sans text-sm font-medium text-[#D96C40] not-italic">– Dirk Nellens</footer>
            </blockquote>
            <Link
              href="/courses"
              className="inline-block border border-[#2C2C2C]/30 text-[#2C2C2C] px-8 py-4 rounded-full font-sans font-medium text-sm hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] transition-all duration-300 w-fit"
            >
              Find out more
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative aspect-square max-w-[400px] w-full mx-auto md:mx-0 rounded-[2rem] overflow-hidden"
          >
            <Image
              src="/images/collage-g-center-composition.png"
              alt="Human Design collage"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 400px"
            />
          </motion.div>
        </div>
      </section>

      {/* Sessions */}
      <section id="sessions" className="py-24 md:py-32 bg-[#F9F6F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C2C2C]">Human Design & Therapy Sessions</h2>
            <Link href="/sessions" className="text-sm font-sans text-[#D96C40] underline underline-offset-4 hover:text-[#c25a30] transition-colors">
              View all sessions
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-10 -mx-6 px-6 md:mx-0 md:px-0 gap-5 snap-x snap-mandatory hide-scrollbar">
            {sessionCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="min-w-[290px] md:min-w-[340px] flex-1 bg-white p-8 rounded-[2rem] snap-start flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-[#2C2C2C]/5"
              >
                <div>
                  <h3 className="font-serif text-xl mb-4 text-[#2C2C2C]">{card.title}</h3>
                  <p className="text-[#2C2C2C]/65 font-sans leading-relaxed text-sm whitespace-pre-line mb-8">{card.desc}</p>
                </div>
                <Link
                  href={card.href}
                  className="w-full py-3 rounded-full border border-[#D96C40] text-[#D96C40] font-sans font-medium text-sm text-center hover:bg-[#D96C40] hover:text-white transition-all duration-300 block"
                >
                  Find out more
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Carousel arrows */}
          <div className="flex justify-end gap-3 mt-6">
            <button className="w-11 h-11 rounded-full border border-[#2C2C2C]/25 flex items-center justify-center hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] transition-all duration-200 text-[#2C2C2C]">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-11 h-11 rounded-full border border-[#2C2C2C]/25 flex items-center justify-center hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] transition-all duration-200 text-[#2C2C2C]">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialSlide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
            >
              <div className="relative w-full md:w-2/5 aspect-square max-w-[300px] mx-auto md:mx-0 rounded-[2rem] overflow-hidden flex-shrink-0">
                <Image
                  src={testimonial.collage}
                  alt="Human Design collage"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>

              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-[#2C2C2C]">
                  "{testimonial.quote}"
                </blockquote>
                <p className="font-serif italic text-[#D96C40] text-lg">— {testimonial.author}</p>

                <div className="flex items-center gap-3 mt-2 border border-[#2C2C2C]/15 rounded-full px-4 py-2">
                  <button onClick={prevTestimonial} className="p-1 hover:text-[#D96C40] transition-colors" aria-label="Previous testimonial">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialSlide(i)}
                        className={`rounded-full transition-all duration-300 ${i === testimonialSlide ? 'w-4 h-2 bg-[#D96C40]' : 'w-2 h-2 bg-[#2C2C2C]/20 hover:bg-[#2C2C2C]/40'}`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button onClick={nextTestimonial} className="p-1 hover:text-[#D96C40] transition-colors" aria-label="Next testimonial">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Book teaser */}
      <section id="book" className="py-24 md:py-32 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <p className="font-sans text-xs uppercase tracking-widest text-[#D96C40] font-medium">Discover Dirk's Book</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#2C2C2C]">
              Understanding Our Energetic Architecture
            </h2>
            <div className="space-y-4 text-[#2C2C2C]/70 font-sans leading-relaxed text-[0.97rem]">
              <p>
                Understanding Our Energetic Architecture represents the culmination of two decades of exploration into Human Design as a living, embodied system.
              </p>
              <p>
                Dirk's aim is to offer readers a practical and transformative understanding of our shared energetic blueprint—one that empowers greater awareness, authenticity, and compassion.
              </p>
              <p>
                It is a truly original contribution to the field of Human Design, one that honors Human Design's founder Ra's teachings while opening new pathways for therapy, childhood development, conscious living and relating.
              </p>
            </div>
            <Link
              href="/book"
              className="inline-block bg-[#D96C40] text-white px-8 py-4 rounded-full font-sans font-medium text-sm hover:bg-[#c25a30] transition-colors w-fit mt-2"
            >
              Buy the book
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative h-[400px] md:h-[540px] flex items-center justify-center"
          >
            <Image
              src="/images/book-transparent.png"
              alt="Understanding Our Energetic Architecture by Dirk Nellens"
              fill
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Discover more */}
      <section className="py-24 bg-[#EBE4D8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl mb-16 text-[#2C2C2C]"
          >
            More by Dirk on Human Design
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-square max-w-[420px] w-full mx-auto md:mx-0 rounded-[2rem] overflow-hidden shadow-lg"
            >
              <Image
                src="/images/collage-ajna-composition.png"
                alt="Human Design collage"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 90vw, 420px"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-4 max-w-sm mx-auto md:mx-0 w-full"
            >
              <a
                href="https://substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white px-8 py-6 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <span className="font-serif text-xl text-[#2C2C2C]">Articles on Substack</span>
                <div className="relative w-5 h-5 flex-shrink-0">
                  <Image src="/images/substack-orange.png" alt="Substack" fill className="object-contain" />
                </div>
              </a>
              <button className="flex items-center justify-center bg-white px-8 py-6 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 font-serif text-xl text-[#2C2C2C]">
                Podcasts
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
