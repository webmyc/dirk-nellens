'use client';

import React from 'react';
import { FadeUp } from '../ui/FadeUp';

const benefitCards = [
    "A clear understanding of our energetic architecture and how it shapes every aspect of life.",
    "Practical tools for psychological healing and personal growth.",
    "Insights into how childhood conditioning influences energetic expression.",
    "A framework for honoring children's authentic nature from birth.",
    "A deeper appreciation of human diversity through the lens of our shared energetic architecture."
];

const invitationCards = [
    "To return to the body,",
    "To trust your inner authority,",
    "To recognize yourself as a unique expression of Love in Movement."
];

export function BookIntroCards() {
    return (
        <section className="py-24 md:py-32 bg-[#F7F4EF]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                <div className="mb-20">
                    <FadeUp delay={0.1}>
                        <h2 className="font-serif text-[36px] md:text-[48px] text-[#2B2218] mb-12 border-b border-[#2B2218]/10 pb-6">
                            This book offers readers...
                        </h2>
                    </FadeUp>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefitCards.map((text, i) => (
                            <FadeUp delay={0.15 + i * 0.1} key={i}>
                                <div className="bg-white p-10 h-full rounded-[20px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 border border-[#2B2218]/5 group">
                                    <div className="w-10 h-10 rounded-full bg-[#F0EBE3] flex items-center justify-center text-[#D27349] font-serif italic text-xl mb-6 group-hover:bg-[#D27349] group-hover:text-white transition-colors duration-400">
                                        {i + 1}
                                    </div>
                                    <p className="font-sans text-[17px] leading-[1.6] text-[#2B2218] opacity-[0.85]">
                                        {text}
                                    </p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>

                <div className="mt-32">
                    <FadeUp delay={0.1}>
                        <h2 className="font-serif text-[36px] md:text-[48px] text-[#2B2218] mb-12 border-b border-[#2B2218]/10 pb-6">
                            At its heart, this book is an invitation...
                        </h2>
                    </FadeUp>

                    <div className="grid md:grid-cols-3 gap-6">
                        {invitationCards.map((text, i) => (
                            <FadeUp delay={0.15 + i * 0.1} key={i}>
                                <div className="bg-[#D27349] p-10 h-full rounded-[20px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 text-white flex items-center">
                                    <p className="font-serif text-[24px] leading-[1.4] italic w-full text-center">
                                        "{text}"
                                    </p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
