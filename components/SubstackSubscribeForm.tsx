'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

const PUBLICATION = 'reflectorsreflections';

type Variant = 'hero' | 'compact';

interface Props {
    variant?: Variant;
    tag?: string;
}

export default function SubstackSubscribeForm({ variant = 'hero', tag }: Props) {
    const rawId = useId();
    const iframeName = `substack-iframe-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const firstUrlRef = useRef<HTMLInputElement>(null);
    const firstReferrerRef = useRef<HTMLInputElement>(null);

    const action = `https://${PUBLICATION}.substack.com/api/v1/free${
        tag ? `?tag=${encodeURIComponent(tag)}` : ''
    }`;

    useEffect(() => {
        if (firstUrlRef.current) firstUrlRef.current.value = window.location.href;
        if (firstReferrerRef.current) firstReferrerRef.current.value = document.referrer;
    }, []);

    useEffect(() => {
        if (status !== 'loading') return;
        const t = setTimeout(() => {
            setStatus('success');
            setMessage('Thank you for subscribing! Please check your email to confirm.');
            setEmail('');
        }, 2000);
        return () => clearTimeout(t);
    }, [status]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const trimmed = email.trim();
        if (!trimmed || !trimmed.includes('@')) {
            e.preventDefault();
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }
        setStatus('loading');
        setMessage('');
    };

    const hiddenFields = (
        <>
            <input type="hidden" name="first_url" ref={firstUrlRef} />
            <input type="hidden" name="first_referrer" ref={firstReferrerRef} />
            <iframe
                name={iframeName}
                aria-hidden="true"
                tabIndex={-1}
                className="hidden"
                title="Substack subscribe response"
            />
        </>
    );

    if (variant === 'hero') {
        if (status === 'success') {
            return (
                <p className="text-[#D27349] font-sans font-medium text-[18px] md:text-[20px] text-center py-6">
                    {message}
                </p>
            );
        }
        return (
            <div className="flex flex-col gap-3">
                <form
                    action={action}
                    method="POST"
                    target={iframeName}
                    onSubmit={handleSubmit}
                    className="relative flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center bg-white sm:rounded-full rounded-2xl shadow-lg p-2 sm:p-2 border border-[#2B2218]/10"
                >
                    {hiddenFields}
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
        );
    }

    if (status === 'success') {
        return <p className="text-[#D96C40] font-sans font-medium text-lg">{message}</p>;
    }

    return (
        <div className="flex flex-col gap-2">
            <form
                action={action}
                method="POST"
                target={iframeName}
                onSubmit={handleSubmit}
                className="relative max-w-md"
            >
                {hiddenFields}
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
    );
}
