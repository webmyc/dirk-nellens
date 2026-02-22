'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

const sessions = [
  {
    id: 'chart-analysis',
    title: 'Human Design Personal Chart Analysis',
    collage: '/images/collage-g-center.png',
    body: `A Personal Chart Analysis offers a clear, compassionate mirror of who you are beneath conditioning—how your energy moves, how you make decisions, and how life flows most naturally for you.`,
    bullets: [
      'Your energetic architecture—how your design is meant to express itself in daily life.',
      'The way you interact with others and navigate relationships with authenticity.',
      'How to align with your inherent body-intelligence, making decisions based on life's intelligence expressing itself through your body.',
      'The conditioning patterns that pull you off course—and how to return to clarity.',
    ],
    after: `A Personal Chart Analysis is both practical and deeply intuitive, blending energetic insight with grounded understanding. It's a chance to see yourself with fresh eyes, to feel the quiet relief of recognising your natural way of being.\n\nWhether you're seeking clarity in relationships, career, or your creative path, a Human Design analysis helps you live your life—not someone else's pattern. Begin the journey back to the truth of your own design.\n\nEvery session is recorded, so you can revisit the insights whenever you wish.`,
    bullet_label: 'Through this session, you'll explore:',
  },
  {
    id: 'connection',
    title: 'Human Design Connection Chart Analysis',
    collage: '/images/collage-heart.png',
    body: `Human Design offers a profound lens for understanding how two people connect.\n\nA Connection Analysis maps the energetic interplay between charts, revealing who brings which qualities to the relationship, where sparks ignite, and where friction invites growth. It brings clarity to patterns of attraction, communication, and influence — whether between partners, friends, family members, or collaborators.\n\nThis session is not about judging or defining the relationship, but about cultivating awareness, compassion, and conscious relating.\n\nIt is recommended that each participant already has a solid understanding of their individual Chart. Every session is recorded, so you can revisit the insights whenever you wish.`,
  },
  {
    id: 'guidance',
    title: 'Human Design & Personal Guidance',
    collage: '/images/collage-ajna.png',
    body: `Human Design is a profound tool for self-awareness, and it serves as an inner GPS, guiding you on the journey of self-discovery and awareness. This journey often benefits from compassionate guidance. In my own experience, deconditioning and self-realisation have been deeply supported by therapy and meditation.\n\nAs a trained therapist, I help you navigate the inner and outer challenges that may prevent you from fully expressing your potential in everyday life. Using Human Design as a subtle but powerful map, any life situation can become a doorway to recognising and embodying your true authenticity.\n\nTransformative work of this depth calls for trust, openness, and commitment—making your commitment to regular sessions and a deep engagement in the therapeutic process a necessity. We will discuss this together in order to decide on a rhythm suitable to your needs.\n\nIt is a joy and honour for me to support others on this path. Every session is recorded, so you can revisit the insights whenever you wish.`,
  },
  {
    id: 'opening-to-change',
    title: "'Opening to Change' Session",
    collage: '/images/collage-root.png',
    body: `Feeling stuck or uncertain about your next step?\nIf life feels confusing or you sense the need for change but aren't sure where to start, this session offers a supportive starting point. By beginning from where you are, learning to listen deeply to your heart, and approaching challenges with greater awareness, you can initiate a transformative process of clarity and openness.\n\nEvery session is recorded, so you can revisit the insights whenever you wish.`,
    bullets: [
      'Deepen your self-understanding',
      'Direct your energy with intention and creativity',
      'Expand your inner resources to meet life with clarity, confidence, and resilience',
    ],
    bullet_label: 'This session helps you:',
  },
  {
    id: 'codependency',
    title: 'Codependency & Inner Child Healing Session',
    collage: '/images/collage-solar-plexus.png',
    body: `Many of our relationship struggles stem from the wounds of our inner child. These early experiences can create patterns that block trust, self-esteem, and creativity.\n\nThis session helps you uncover repeating patterns, release deep-seated fears, and heal emotional wounds, paving the way for healthier relationships and greater inner freedom.\n\nEvery session is recorded, so you can revisit the insights whenever you wish.`,
  },
  {
    id: 'couples',
    title: 'Couples Therapy Session',
    collage: '/images/collage-spleen.png',
    body: `Romantic relationships often awaken our deepest desires, fears, and wounds. When these challenges aren't addressed, they can create repeating patterns that undermine trust, love, and intimacy.\n\nThis session helps you understand each other, take responsibility, improve communication, and consciously navigate your relationship's challenges—supporting growth both as individuals and as a couple.\n\nEvery session is recorded, so you can revisit the insights whenever you wish.`,
  },
];

export default function SessionsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#2C2C2C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/bg-black.jpg" alt="" fill className="object-cover opacity-30" priority />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl flex flex-col gap-6"
          >
            <p className="font-sans text-xs uppercase tracking-widest text-white/50">Sessions</p>
            <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight italic">
              "Our journey is one of peeling away what is not truly us. Human Design and psychotherapy can work in powerful synergy towards this."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Section heading */}
      <section className="py-16 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C]">Human Design & Therapy Sessions</h1>
        </div>
      </section>

      {/* Session cards */}
      {sessions.map((session, i) => (
        <section
          key={session.id}
          id={session.id}
          className={`py-24 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9F6F0]'}`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
            {/* Text: alternates sides */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-6 ${i % 2 !== 0 ? 'md:order-2' : ''}`}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-[#2C2C2C]">{session.title}</h2>

              <div className="space-y-4 font-sans text-[#2C2C2C]/70 leading-relaxed text-[0.97rem]">
                {session.body.split('\n\n').map((para, j) => (
                  para.startsWith('\n') ? null : <p key={j}>{para}</p>
                ))}
              </div>

              {session.bullets && (
                <div>
                  {session.bullet_label && (
                    <p className="font-sans text-[#2C2C2C]/75 mb-3 text-[0.95rem]">{session.bullet_label}</p>
                  )}
                  <ul className="space-y-2.5">
                    {session.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 font-sans text-[#2C2C2C]/70 text-[0.95rem]">
                        <span className="text-[#D96C40] flex-shrink-0 mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {session.after && (
                <div className="space-y-4 font-sans text-[#2C2C2C]/70 leading-relaxed text-[0.97rem]">
                  {session.after.split('\n\n').map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              )}

              <div className="pt-2 space-y-1.5 font-sans text-[#2C2C2C]/45 text-sm">
                <p>Duration: <em>to be confirmed</em></p>
                <p>Price: <em>to be confirmed</em></p>
                <p>Sessions take place via Zoom.</p>
              </div>

              <a
                href="mailto:dirknellens@nellens.com"
                className="inline-block bg-[#D96C40] text-white px-8 py-4 rounded-full font-sans font-medium text-sm hover:bg-[#c25a30] transition-colors w-fit shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-300"
              >
                Book a session
              </a>
            </motion.div>

            {/* Collage image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`relative aspect-square max-w-[420px] w-full mx-auto rounded-[2rem] overflow-hidden shadow-lg ${i % 2 !== 0 ? 'md:order-1' : ''}`}
            >
              <Image
                src={session.collage}
                alt={session.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 90vw, 420px"
              />
            </motion.div>
          </div>
        </section>
      ))}

      <Newsletter />
      <Footer />
    </main>
  );
}
