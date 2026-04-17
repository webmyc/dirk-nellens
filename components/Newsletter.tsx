'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function Newsletter() {
  return (
    <section className="py-20 md:py-32 bg-[#EBE4D8] border-t border-[#2C2C2C]/10">
      <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-8"
        >
          <h2 className="font-serif text-2xl md:text-3xl leading-relaxed text-[#2C2C2C]">
            Deepen your life journey with Dirk&rsquo;s Reflector Reflections, including Human Design insights and Neutrino Weather reports
          </h2>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-[#2C2C2C]/10 bg-white max-w-md">
            <iframe
              src="https://reflectorsreflections.substack.com/embed"
              width="100%"
              height="320"
              style={{ border: 'none', background: 'white', display: 'block' }}
              title="Subscribe to Reflector's Reflections"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative aspect-square max-w-[420px] w-full mx-auto"
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
