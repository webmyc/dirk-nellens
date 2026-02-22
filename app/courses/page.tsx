'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { FadeUp, FadeUpStaggerGroup } from '@/components/ui/FadeUp';

export default function CoursesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F7F4EF]">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-40 md:pt-48 pb-24 md:pb-32 bg-[#2B2218] text-[#F0EBE3] overflow-hidden">
        {/* Subtle dot matrix background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#C96A45 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
          <FadeUp delay={0.1}>
            <p className="font-sans text-[12px] md:text-[14px] font-semibold tracking-[0.2em] uppercase text-[#C96A45] mb-6">
              Education
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.01em]">
              Online Courses
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Intro & Quote */}
      <section className="py-24 md:py-32 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeUpStaggerGroup className="flex flex-col gap-10">
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-[36px] md:text-[44px] leading-[1.15] text-[#2B2218]">
                A methodology to embody Human Design.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-sans text-[18px] text-[#2B2218] opacity-[0.85] leading-[1.7]">
                Dirk's courses offer a living, participatory, and co-creative experience rather than just theoretical information.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <blockquote className="font-serif text-[20px] md:text-[24px] leading-[1.6] text-[#2B2218] relative pl-8 border-l-[3px] border-[#C96A45]/30">
                <span className="text-[#C96A45] text-5xl absolute -top-4 -left-3 opacity-40">"</span>
                I have noticed that after their Chart Analysis many of my clients ask me, 'Now What? How do I start to live my Human Design?' It is this feedback that has inspired the creation of my courses, which are dedicated to bridging Human Design with experiential and therapeutic pathways for self-discovery and transformation.
                <br /><br />
                Indeed, I have learned the most about myself not through theory and information, but through therapy, creative expression, meditation, dance, deep conversations, listening, music, touch, breath—anything that moves the body and strengthens the inner witness. It's in these spaces that Human Design truly comes alive for me.
                <footer className="mt-6 font-sans text-[13px] font-semibold tracking-[0.1em] uppercase text-[#C96A45] not-italic">
                  – Dirk Nellens
                </footer>
              </blockquote>
            </FadeUp>
          </FadeUpStaggerGroup>

          <FadeUp delay={0.2}>
            <div className="relative aspect-[4/5] max-w-[500px] w-full mx-auto md:mx-0 rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/collage-head-composition.png"
                alt="Human Design collage"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[1.5s]"
                sizes="(max-width: 768px) 90vw, 500px"
              />
              <div className="absolute inset-0 bg-[#2B2218]/5 pointer-events-none" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Course listings - coming soon */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Subtle decorative geometry */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EBE4D8] rounded-full blur-[100px] opacity-40 pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          <FadeUp delay={0.1}>
            <div className="text-center flex flex-col items-center gap-8 py-20 px-8 bg-[#F7F4EF]/50 backdrop-blur-sm rounded-[32px] border border-[#2B2218]/5 shadow-sm hover:shadow-xl transition-shadow duration-500">
              <div className="w-20 h-20 bg-[#2B2218] rounded-full flex items-center justify-center p-5 mb-4 shadow-lg">
                <div className="relative w-full h-full">
                  <Image src="/logo/logo-symbol-white.png" alt="" fill className="object-contain" />
                </div>
              </div>

              <h2 className="font-serif text-[42px] md:text-[52px] leading-[1.1] text-[#2B2218]">
                Available Soon
              </h2>

              <p className="font-sans text-[18px] text-[#2B2218] opacity-[0.75] max-w-lg leading-relaxed">
                The curriculum is currently being refined. Sign up for the Reflections newsletter below to be the first to know when enrollment opens.
              </p>

              <div className="w-16 h-[1px] bg-[#C96A45]/30 mt-4" />
            </div>
          </FadeUp>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
