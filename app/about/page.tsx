'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { FadeUp, FadeUpStaggerGroup } from '@/components/ui/FadeUp';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F7F4EF]">
      <Navigation />

      {/* Hero quote – massive editorial typography */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden pt-32 pb-24 bg-[#2B2218]">

        {/* Breadcrumb row */}
        <div className="absolute top-28 left-0 w-full z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: 'About Dirk', href: '/about' }]} className="text-[#F0EBE3]/60" />
          </div>
        </div>

        {/* Abstract animated geometry background */}
        <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            className="relative w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw]"
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#F0EBE3]">
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
              <rect x="15" y="15" width="70" height="70" transform="rotate(25 50 50)" stroke="currentColor" strokeWidth="0.5" />
              <polygon points="50,5 95,75 5,75" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-[#F0EBE3] flex flex-col items-center">
          <FadeUp delay={0.1}>
            <p className="font-sans text-[12px] md:text-[14px] font-semibold tracking-[0.2em] uppercase text-[#C96A45] mb-8">
              Dirk Nellens
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <blockquote className="font-serif text-[42px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.01em]">
              "Evolution is clearly inviting us <span className="italic text-[#C96A45]">to go inwards.</span>"
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* About Dirk */}
      <section className="py-24 md:py-32 bg-[#F7F4EF] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          <FadeUp delay={0.1} className="md:sticky md:top-32">
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/dirk-2.jpg"
                alt="Dirk Nellens Portrait"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out"
                sizes="(max-width: 768px) 90vw, 45vw"
                priority
              />
              <div className="absolute inset-0 bg-[#2B2218]/5 pointer-events-none" />
            </div>
          </FadeUp>

          <FadeUpStaggerGroup className="flex flex-col gap-8 pt-4">
            <FadeUp delay={0.2}>
              <h2 className="font-serif text-[40px] md:text-[52px] leading-[1.1] text-[#2B2218]">
                Bridging Human Design with therapeutic pathways.
              </h2>
            </FadeUp>

            <div className="space-y-6 text-[#2B2218] opacity-[0.85] leading-[1.8] font-sans text-[16px] md:text-[18px]">
              <FadeUp delay={0.3}>
                <p>
                  A certified Human Design Analyst with more than 20 years of experience, Dirk has conducted over 4,000 readings and trainings internationally.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <p>
                  He discovered Human Design in 2002 and is one of the very few Reflector Types—comprising just 1% of the population—to have had the rare privilege of studying directly under the Human Design founder Ra Uru Hu in Ibiza for many years.
                </p>
              </FadeUp>
              <FadeUp delay={0.5}>
                <p>
                  Dirk's therapeutic background includes formal training in body-centered approaches such as inner child work, co-dependency recovery, breathwork, family constellations, and the Enneagram, as well as active meditative practices developed by Osho, which he profoundly explored during his years at the Osho Meditation Resort in Pune, India.
                </p>
              </FadeUp>
              <FadeUp delay={0.6}>
                <p className="font-medium text-[#C96A45]">
                  The integration of Human Design with therapeutic and meditative pathways forms the foundation of Dirk's work.
                </p>
              </FadeUp>
              <FadeUp delay={0.7}>
                <p>
                  Dirk Nellens combines academic rigor, direct training with Human Design's founder, and extensive therapeutic expertise in his work. Holding a MSc in Social Anthropology from the London School of Economics and with an initial background in Law, Dirk brings both analytical precision and a deep appreciation for human diversity to the field.
                </p>
              </FadeUp>
            </div>
          </FadeUpStaggerGroup>

        </div>
      </section>

      {/* Full-width image section */}
      <section className="relative w-full h-[58vh] min-h-[420px] max-h-[760px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          <Image
            src="/images/dirk-3.jpg"
            alt="Dirk Nellens"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </section>

      {/* Speaking */}
      <section id="speaking" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeUpStaggerGroup className="flex flex-col gap-8 md:order-2">
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-[42px] md:text-[52px] leading-[1.1] text-[#2B2218]">
                Speaking & Events
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-sans text-[18px] text-[#2B2218] opacity-80 leading-[1.7]">
                Dirk has presented at conferences such as the Universal Forum of Cultures in Barcelona, been featured on podcasts and on Gaia, and led workshops across the world, making complex Human Design accessible while preserving its depth.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="font-sans text-[18px] text-[#2B2218] opacity-80 leading-[1.7]">
                Get in touch for further information and Speaking invitations.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium text-[15px] transition-all duration-300 transform bg-[#2B2218] text-white px-8 py-4 hover:bg-black shadow-md hover:shadow-lg hover:-translate-y-1 w-fit mt-4"
              >
                Get in touch
              </Link>
            </FadeUp>
          </FadeUpStaggerGroup>

          <div className="grid grid-cols-2 gap-6 md:order-1">
            <FadeUp delay={0.2} className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl mt-12">
              <Image
                src="/images/talk-1.png"
                alt="Dirk Nellens speaking"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[1.5s]"
                sizes="(max-width: 768px) 45vw, 25vw"
              />
            </FadeUp>
            <FadeUp delay={0.4} className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl mb-12">
              <Image
                src="/images/talk-2.png"
                alt="Dirk Nellens at an event"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[1.5s]"
                sizes="(max-width: 768px) 45vw, 25vw"
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 bg-[#2B2218] text-[#F0EBE3] relative overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C96A45] rounded-full blur-[150px] opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8 relative z-10">
          <FadeUp delay={0.1}>
            <p className="font-sans text-[13px] uppercase tracking-[0.2em] text-[#C96A45] font-semibold">
              Contact
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-serif text-[28px] md:text-[36px] leading-[1.4] opacity-90 max-w-2xl">
              For all inquiries, including Dirk's availability for a Corporate Event or Live Speaking, please email
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <a
              href="mailto:dirknellens@nellens.com"
              className="font-sans font-medium text-[24px] md:text-[32px] md:font-semibold tracking-tight hover:text-[#C96A45] transition-colors relative group underline underline-offset-8 decoration-[#F0EBE3]/20 hover:decoration-[#C96A45]"
            >
              dirknellens@nellens.com
            </a>
          </FadeUp>
        </div>
      </section>

      {/* Closing quote */}
      <section className="py-24 md:py-32 bg-[#EBE4D8] border-b border-[#2B2218]/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <FadeUp delay={0.1}>
            <blockquote className="font-serif text-[32px] md:text-[44px] leading-[1.3] text-[#2B2218] italic relative">
              <span className="text-[#C96A45] text-6xl absolute -top-8 -left-8 md:-left-12 opacity-40">"</span>
              It is a joy and an honour to be a part of your journey towards alignment with your unique energetic architecture.
              <span className="text-[#C96A45] text-6xl absolute -bottom-16 -right-4 md:-right-8 opacity-40">"</span>
            </blockquote>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-12 font-sans text-[14px] font-semibold tracking-[0.2em] uppercase text-[#C96A45]">
              — Dirk Nellens
            </p>
          </FadeUp>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
