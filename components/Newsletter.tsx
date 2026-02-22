'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#EBE4D8] border-t border-[#2C2C2C]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-8"
        >
          <h2 className="font-serif text-2xl md:text-3xl leading-relaxed text-[#2C2C2C]">
            Deepen your life journey with Dirk's Reflector Reflections, including Human Design insights and Neutrino reports.
          </h2>

          {submitted ? (
            <p className="text-[#D96C40] font-sans">Thank you for subscribing!</p>
          ) : (
            <form className="relative max-w-md" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-white px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-[#D96C40]/40 shadow-sm font-sans text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-[#2C2C2C]/20 px-5 py-2 rounded-full text-sm font-medium hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] transition-all duration-300"
              >
                Sign up
              </button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative aspect-square max-w-[380px] w-full mx-auto md:mx-0 rounded-[2rem] overflow-hidden shadow-lg"
        >
          <Image
            src="/images/collage-sacral-composition.png"
            alt="Human Design collage"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 380px"
          />
        </motion.div>
      </div>
    </section>
  );
}
