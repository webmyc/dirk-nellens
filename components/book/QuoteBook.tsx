'use client';

import React from 'react';
import { FadeUp } from '../ui/FadeUp';

export function QuoteBook() {
    return (
        <section className="relative py-32 md:py-48 bg-[#2B2218] overflow-hidden">
            {/* Decorative large ampersand or quote mark in background */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#F0EBE3] opacity-[0.03] font-serif italic leading-none select-none pointer-events-none"
                style={{ fontSize: 'clamp(300px, 60vw, 800px)' }}
            >
                &ldquo;
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
                <FadeUp delay={0.1}>
                    <blockquote className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-[1.2] text-[#F0EBE3] italic">
                        &ldquo;If you feel called to understand yourself&mdash;and others&mdash;with more clarity, compassion and depth, this book may be a meaningful companion on your path.&rdquo;
                    </blockquote>
                </FadeUp>

                <FadeUp delay={0.3}>
                    <div className="mt-12 flex items-center justify-center gap-6">
                        <div className="w-16 h-[1px] bg-[#D27349]" />
                        <span className="font-sans text-[14px] font-semibold tracking-[0.2em] uppercase text-[#D27349]">
                            Dirk Nellens
                        </span>
                        <div className="w-16 h-[1px] bg-[#D27349]" />
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
