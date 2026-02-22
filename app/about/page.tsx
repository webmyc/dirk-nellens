'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero quote – dark texture bg */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/bg-black.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#1a1208]/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center text-white"
        >
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight italic">
            "Evolution is clearly inviting us to go inwards."
          </blockquote>
          <p className="mt-6 font-sans text-white/60 tracking-widest uppercase text-sm">— Dirk Nellens</p>
        </motion.div>
      </section>

      {/* About Dirk */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sticky top-32"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
              <Image
                src="/images/dirk-2.jpg"
                alt="Dirk Nellens"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-8 pt-4"
          >
            <p className="font-sans text-xs uppercase tracking-widest text-[#D96C40] font-medium">About Dirk</p>
            <div className="space-y-5 text-[#2C2C2C]/75 leading-relaxed font-sans text-[0.97rem]">
              <p>
                A certified Human Design Analyst with more than 20 years of experience, Dirk has conducted over 4,000 readings and trainings internationally.
              </p>
              <p>
                He discovered Human Design in 2002 and is one of the very few Reflector Types—comprising just 1% of the population—to have had the rare privilege of studying directly under the Human Design founder Ra Uru Hu in Ibiza for many years.
              </p>
              <p>
                Dirk's therapeutic background includes formal training in body-centered approaches such as inner child work, co-dependency recovery, breathwork, family constellations, and the Enneagram, as well as active meditative practices developed by Osho, which he profoundly explored during his years at the Osho Meditation Resort in Pune, India.
              </p>
              <p>
                The integration of Human Design with therapeutic and meditative pathways forms the foundation of Dirk's work.
              </p>
              <p>
                Dirk's mission is dedicated to bridging Human Design with experiential and therapeutic pathways for self-discovery and transformation.
              </p>
              <p>
                Dirk Nellens combines academic rigor, direct training with Human Design's founder, and extensive therapeutic expertise in his work. Holding a MSc in Social Anthropology from the London School of Economics and with an initial background in Law, Dirk brings both analytical precision and a deep appreciation for human diversity to the field.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Speaking */}
      <section id="speaking" className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <p className="font-sans text-xs uppercase tracking-widest text-[#D96C40] font-medium">Speaking</p>
            <p className="font-sans text-[#2C2C2C]/75 leading-relaxed text-[0.97rem]">
              Dirk has presented at conferences such as the Universal Forum of Cultures in Barcelona, been featured on podcasts and on Gaia, and led workshops across the world, making complex Human Design accessible while preserving its depth.
            </p>
            <p className="font-sans text-[#2C2C2C]/75 leading-relaxed text-[0.97rem]">
              Get in touch for further information and Speaking invitations.
            </p>
            <Link
              href="#contact"
              className="inline-block border border-[#2C2C2C]/30 text-[#2C2C2C] px-8 py-4 rounded-full font-sans font-medium text-sm hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] transition-all duration-300 w-fit"
            >
              Get in touch
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden"
            >
              <Image
                src="/images/talk-1.png"
                alt="Dirk Nellens speaking"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 22vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden mt-8"
            >
              <Image
                src="/images/talk-2.png"
                alt="Dirk Nellens at an event"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 22vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="font-sans text-xs uppercase tracking-widest text-[#D96C40] font-medium">Contact</p>
            <p className="font-sans text-[#2C2C2C]/70 leading-relaxed">
              For all inquiries, including Dirk's availability for a Corporate Event or Live Speaking, please email
            </p>
            <a
              href="mailto:dirknellens@nellens.com"
              className="font-serif text-2xl text-[#2C2C2C] hover:text-[#D96C40] transition-colors underline underline-offset-4 decoration-[#D96C40]/40 hover:decoration-[#D96C40]"
            >
              dirknellens@nellens.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* More by Dirk */}
      <section className="py-16 bg-[#F4EFE6] border-t border-[#2C2C2C]/10">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-5">
          <p className="font-sans text-xs uppercase tracking-widest text-[#2C2C2C]/40 font-medium">More by Dirk on Human Design</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="font-serif text-xl hover:text-[#D96C40] transition-colors">Articles on Substack</a>
            <span className="text-[#2C2C2C]/20">·</span>
            <button className="font-serif text-xl hover:text-[#D96C40] transition-colors">Podcasts</button>
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="py-20 bg-[#EBE4D8]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-2xl md:text-3xl leading-relaxed text-[#2C2C2C] italic"
          >
            "It is a joy and an honour to be a part of your journey towards alignment with your unique energetic architecture."
          </motion.blockquote>
          <p className="mt-5 font-sans text-[#D96C40] tracking-widest uppercase text-sm">— Dirk Nellens</p>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
