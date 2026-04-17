'use client';

import { FadeUp } from './ui/FadeUp';
import SubstackSubscribeForm from './SubstackSubscribeForm';

export default function NewsletterHeroSubscribe() {
    return (
        <FadeUp delay={0.4} className="w-full max-w-2xl mx-auto mt-4">
            <SubstackSubscribeForm variant="hero" />
        </FadeUp>
    );
}
