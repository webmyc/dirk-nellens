'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

export default function BookPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#D96C40] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <p className="font-sans text-xs uppercase tracking-widest text-white/60">Book</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              What if your deepest struggles don't come from who you are, but from living against how your energy is designed?
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[420px] md:h-[580px]"
          >
            <Image
              src="/images/book-transparent.png"
              alt="Understanding Our Energetic Architecture"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Book intro */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5 font-sans text-[#2C2C2C]/75 leading-relaxed text-[0.97rem]"
          >
            <p>
              In <em>'Understanding Our Energetic Architecture'</em>, Dirk explores Human Design as more than a system—but as a living map of the body's intelligence, shaping how we live, make decisions, relate, parent, love, and protect ourselves. Your energetic architecture has been waiting your entire life to be recognized and lived by!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid md:grid-cols-2 gap-10"
          >
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-xl text-[#2C2C2C]">This book offers readers:</h3>
              <ul className="space-y-3 font-sans text-[#2C2C2C]/70 text-[0.95rem] leading-relaxed">
                {[
                  'A clear understanding of our energetic architecture and how it shapes every aspect of life.',
                  'Practical tools for psychological healing and personal growth.',
                  'Insights into how childhood conditioning influences energetic expression.',
                  'A framework for honoring children's authentic nature from birth.',
                  'A deeper appreciation of human diversity through the lens of our shared energetic architecture.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#D96C40] mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-xl text-[#2C2C2C]">At its heart, this book is an invitation:</h3>
              <ul className="space-y-3 font-sans text-[#2C2C2C]/70 text-[0.95rem] leading-relaxed">
                {[
                  'To return to the body,',
                  'To trust your inner authority,',
                  'To recognize yourself as a unique expression of Love in Movement.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#D96C40] mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D96C40] text-white px-8 py-4 rounded-full font-sans font-medium text-sm hover:bg-[#c25a30] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-300"
            >
              Shop the book
            </a>
            <button className="border border-[#2C2C2C]/30 text-[#2C2C2C] px-8 py-4 rounded-full font-sans font-medium text-sm hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] transition-all duration-300">
              Read an excerpt
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-20 bg-[#F4EFE6]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-2xl md:text-3xl leading-relaxed text-[#2C2C2C] italic"
          >
            "If you feel called to understand yourself—and others—with more clarity, compassion and depth, this book may be a meaningful companion on your path."
          </motion.blockquote>
        </div>
      </section>

      {/* Full description */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5 font-sans text-[#2C2C2C]/70 leading-relaxed text-[0.97rem]"
          >
            <p>
              Understanding Our Energetic Architecture represents the culmination of two decades of exploration into Human Design as a living, embodied system.
            </p>
            <p>
              In this book, Dirk's aim is to offer readers a practical and transformative understanding of our shared energetic blueprint—one that empowers greater awareness, authenticity, and compassion.
            </p>
            <p>
              It is a truly original contribution to the field of Human Design, one that honors Human Design's founder Ra's teachings while opening new pathways for therapy, childhood development, conscious living and relating.
            </p>
            <p>
              This book guides readers through Human Design's Bodygraph in a clear, experiential way. Real life examples—including well-known figures and clients—bring these energetic patterns to life, transforming abstract ideas into practical insights anyone can apply.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5 font-sans text-[#2C2C2C]/70 leading-relaxed text-[0.97rem]"
          >
            <p>
              <strong className="text-[#2C2C2C] font-medium">For parents,</strong> it offers invaluable guidance for supporting their children's authentic development by understanding their innate energetic wiring.
            </p>
            <p>
              <strong className="text-[#2C2C2C] font-medium">For therapists,</strong> it offers a way to perceive clients beyond their conditioned patterns—revealing their energetic essence and the deeper roots of their defence mechanisms.
            </p>
            <p>
              <strong className="text-[#2C2C2C] font-medium">For spiritual seekers,</strong> it serves as an inner GPS pointing toward awareness, helping them recognize the intelligence of their aliveness and transcend limiting mental constructs.
            </p>
            <p>
              <strong className="text-[#2C2C2C] font-medium">For anthropologists and cultural explorers,</strong> it introduces Human Design as a fresh, non-ethnocentric lens for appreciating the richness of human diversity.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 mt-10 space-y-5 font-sans text-[#2C2C2C]/70 leading-relaxed text-[0.97rem]">
          <p>
            In a world increasingly shaped by artificial intelligence and technological complexity, understanding our energetic architecture and how we each express it uniquely has never been more vital.
          </p>
          <p>
            This book does not just explain Human Design—it shows how Human Design knowledge can transform our relationship with ourselves, our children, our clients in therapy, and our communities.
          </p>
          <p>
            Along the way, I integrate insights from Social Anthropology, the Enneagram, Wilhelm Reich's work on muscular armouring and character formation, and therapeutic approaches to child development—all viewed through the living lens of Human Design, reflecting my own path of exploration within this field.
          </p>
          <p>
            In a world that pressures us to conform, my book offers something radical: the science of our authentic Self—a drop in a vast ocean of Love. Our energetic architecture has been waiting our entire life to be recognized and lived by!
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 mt-10">
          <a
            href="https://amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#D96C40] text-white px-8 py-4 rounded-full font-sans font-medium text-sm hover:bg-[#c25a30] transition-colors"
          >
            Shop the book
          </a>
        </div>
      </section>

      {/* Book images */}
      <section className="py-16 bg-[#F9F6F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {['/images/book-cover.jpg', '/images/book-1.jpg', '/images/book-3.jpg'].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Image src={src} alt="Book" fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 45vw, 30vw" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Author bio teaser */}
      <section className="py-16 bg-[#EBE4D8] border-t border-[#2C2C2C]/10">
        <div className="max-w-3xl mx-auto px-6 md:px-12 space-y-5 font-sans text-[#2C2C2C]/65 leading-relaxed text-[0.95rem] text-center">
          <p>
            A certified Human Design Analyst with more than 20 years of experience, Dirk has conducted over 4,000 readings and trainings internationally.
          </p>
          <p>
            He discovered Human Design in 2002 and is one of the very few Reflector Types—comprising just 1% of the population—to have had the rare privilege of studying directly under the Human Design founder Ra Uru Hu in Ibiza for many years.
          </p>
          <p>
            The integration of Human Design with therapeutic and meditative pathways forms the foundation of Dirk's work.
          </p>
          <div className="flex gap-4 justify-center flex-wrap pt-4">
            <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="font-serif text-lg hover:text-[#D96C40] transition-colors">Articles on Substack</a>
            <span className="text-[#2C2C2C]/25">·</span>
            <button className="font-serif text-lg hover:text-[#D96C40] transition-colors">Podcasts</button>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
