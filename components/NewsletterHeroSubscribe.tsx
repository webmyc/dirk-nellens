'use client';

import { FadeUp } from './ui/FadeUp';

export default function NewsletterHeroSubscribe() {
    return (
        <FadeUp delay={0.4} className="w-full max-w-xl mx-auto mt-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#2B2218]/10 bg-white">
                <iframe
                    src="https://reflectorsreflections.substack.com/embed"
                    width="100%"
                    height="320"
                    style={{ border: 'none', background: 'white', display: 'block' }}
                    title="Subscribe to Reflector's Reflections"
                    loading="lazy"
                />
            </div>
            <p className="font-sans text-[13px] text-[#2B2218]/60 text-center mt-4">
                Free weekly reflections. Unsubscribe anytime.
            </p>
        </FadeUp>
    );
}
