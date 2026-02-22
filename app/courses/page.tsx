'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

export default function CoursesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#D96C40] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl flex flex-col gap-6"
          >
            <p className="font-sans text-xs uppercase tracking-widest text-white/60">Courses</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Courses taught by Dirk
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro & Quote */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <p className="font-sans text-[#2C2C2C]/70 leading-relaxed">
              Dirk's courses offer a methodology to embody Human Design in a living, participatory, and co-creative way.
            </p>
            <blockquote className="font-serif text-lg md:text-xl leading-relaxed text-[#2C2C2C] border-l-2 border-[#D96C40] pl-5">
              "I have noticed that after their Chart Analysis many of my clients ask me, 'Now What? How do I start to live my Human Design?' It is this feedback that has inspired the creation of my courses, which are dedicated to bridging Human Design with experiential and therapeutic pathways for self-discovery and transformation.
              <br /><br />
              Indeed, I have learned the most about myself not through theory and information, but through therapy, creative expression, meditation, dance, deep conversations, listening, music, touch, breath—anything that moves the body and strengthens the inner witness. It's in these spaces that Human Design truly comes alive for me. And it's in this spirit that I feel called to continue contributing."
              <footer className="mt-4 font-sans text-sm font-medium text-[#D96C40] not-italic">– Dirk Nellens</footer>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative aspect-square max-w-[420px] w-full mx-auto md:mx-0 rounded-[2rem] overflow-hidden shadow-lg"
          >
            <Image
              src="/images/collage-head-composition.png"
              alt="Human Design collage"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 420px"
            />
          </motion.div>
        </div>
      </section>

      {/* Course listings - coming soon */}
      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center flex flex-col items-center gap-6 py-16 bg-white/50 rounded-[2rem] border border-[#2C2C2C]/8"
          >
            <div className="relative w-16 h-16">
              <Image src="/logo/logo-symbol-black.png" alt="" fill className="object-contain opacity-20" />
            </div>
            <h2 className="font-serif text-3xl text-[#2C2C2C]">Courses Coming Soon</h2>
            <p className="font-sans text-[#2C2C2C]/60 max-w-md leading-relaxed">
              Dirk's courses are currently being developed. Sign up for the newsletter below to be the first to know when they launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Author bio teaser */}
      <section className="py-16 bg-white border-t border-[#2C2C2C]/10">
        <div className="max-w-3xl mx-auto px-6 md:px-12 space-y-4 font-sans text-[#2C2C2C]/65 leading-relaxed text-[0.95rem]">
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
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
