'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { subscribeToSubstack } from '@/app/actions/subscribe';
import { Loader2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const result = await subscribeToSubstack(formData);

    if (result.success) {
      setStatus('success');
      setMessage(result.message);
    } else {
      setStatus('error');
      setMessage(result.message);
    }
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

          {status === 'success' ? (
            <p className="text-[#D96C40] font-sans font-medium text-lg">{message}</p>
          ) : (
            <div className="flex flex-col gap-2">
              <form className="relative max-w-md" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your best email"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-white px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-[#D96C40]/40 shadow-sm font-sans text-sm disabled:opacity-70"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-[#2C2C2C]/20 px-6 py-2 rounded-full text-sm font-medium hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] transition-all duration-300 disabled:opacity-70 disabled:hover:bg-white disabled:hover:text-[#2C2C2C] flex items-center gap-2"
                >
                  {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
                </button>
              </form>
              {status === 'error' && (
                <p className="text-red-500 font-sans text-sm ml-4">{message}</p>
              )}
            </div>
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
