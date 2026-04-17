'use client';

import React from 'react';
import { FadeUp } from '../ui/FadeUp';

export function QuoteHome() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-[#F0EBE3] overflow-hidden py-20 px-6 md:px-12">
            {/* Absolute positioning for the background SVG */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <svg
                    viewBox="0 0 100 100"
                    className="w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] opacity-7 text-[#2B2218] animate-[spin-slow_120s_linear_infinite]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                >
                    {/* A simple geometric representation of a Human Design chart */}
                    <polygon points="50,5 95,50 50,95 5,50" />
                    <polygon points="50,20 80,50 50,80 20,50" />
                    <line x1="50" y1="5" x2="50" y2="95" />
                    <line x1="5" y1="50" x2="95" y2="50" />
                </svg>
            </div>

            <div className="relative z-10 max-w-[900px] mx-auto text-center w-full">
                {/* Large decorative quotation mark, scrolls slower with simple CSS (can use framer motion for real parallax if needed, but sticky/transform is often enough) */}
                <div
                    className="absolute -top-[80px] md:-top-[120px] -left-[20px] md:-left-[60px] text-[#D27349] opacity-[0.18] font-serif leading-none select-none z-0"
                    style={{ fontSize: 'clamp(140px, 20vw, 240px)' }}
                >
                    &ldquo;
                </div>

                <div className="relative z-10 font-serif text-[30px] md:text-[40px] lg:text-[46px] leading-[1.2] text-[#2B2218] italic flex flex-col gap-4">
                    <FadeUp delay={0.1}>
                        <span>Human Design is not about what you know&mdash;</span>
                    </FadeUp>
                    <FadeUp delay={0.25}>
                        <span>it&rsquo;s about how you live,</span>
                    </FadeUp>
                    <FadeUp delay={0.4}>
                        <span>and about letting the process of awareness</span>
                    </FadeUp>
                    <FadeUp delay={0.55}>
                        <span>transform you from within.</span>
                    </FadeUp>
                </div>
                <FadeUp delay={0.7}>
                    <p className="relative z-10 mt-10 text-[#2B2218]/70 font-sans text-[14px] tracking-[0.18em] uppercase">
                        &mdash; Dirk Nellens &mdash;
                    </p>
                </FadeUp>
            </div>
        </section>
    );
}
