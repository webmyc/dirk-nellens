'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { subscribeToSubstack } from '@/app/actions/subscribe';
import { FadeUp } from './ui/FadeUp';

export default function NewsletterHeroSubscribe() {
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
        <FadeUp delay={0.4} className="w-full max-w-2xl mx-auto mt-4">
            {status === 'success' ? (
                <p className="text-[#D27349] font-sans font-medium text-[18px] md:text-[20px] text-center py-6">
                    {message}
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    <form
                        onSubmit={handleSubmit}
                        className="relative flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center bg-white sm:rounded-full rounded-2xl shadow-lg p-2 sm:p-2 border border-[#2B2218]/10"
                    >
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your best email"
                            required
                            disabled={status === 'loading'}
                            className="flex-1 bg-transparent px-6 py-4 outline-none font-sans text-[16px] md:text-[18px] text-[#2B2218] placeholder:text-[#2B2218]/40 disabled:opacity-70"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="flex items-center justify-center gap-2 bg-[#D27349] text-white px-8 py-4 rounded-full font-sans font-semibold text-[14px] md:text-[15px] tracking-[0.1em] uppercase hover:bg-[#2B2218] transition-colors duration-300 disabled:opacity-70 whitespace-nowrap"
                        >
                            {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
                        </button>
                    </form>
                    {status === 'error' && (
                        <p className="text-red-500 font-sans text-sm text-center">{message}</p>
                    )}
                    <p className="font-sans text-[13px] text-[#2B2218]/60 text-center mt-2">
                        Free weekly reflections. Unsubscribe anytime.
                    </p>
                </div>
            )}
        </FadeUp>
    );
}
