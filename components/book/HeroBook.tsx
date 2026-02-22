'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../ui/Button';
import { FadeUp, FadeUpStaggerGroup } from '../ui/FadeUp';

export function HeroBook() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Optional: subtle parallax on the book image itself as we scroll past
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={containerRef} className="relative bg-[#F0EBE3] min-h-[120vh] pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 relative">

                {/* Left Side: Sticky Book Container */}
                <div className="w-full md:w-[45%] lg:w-[50%] relative">
                    <div className="md:sticky md:top-32 lg:top-40 w-full aspect-[3/4] max-w-[540px] mx-auto md:mx-0">
                        <motion.div style={{ y }} className="relative w-full h-full animate-[float-large_7s_ease-in-out_infinite]">
                            <Image
                                src="/images/book-cover.jpg" // Using the solid cover for the book page if available, else book-transparent
                                alt="Understanding Our Energetic Architecture"
                                fill
                                priority
                                className="object-contain drop-shadow-[0_40px_80px_rgba(43,34,24,0.35)]"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Fallback to book-transparent if book-cover doesn't look right:
                src="/images/book-transparent.png"
              */}
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Scrolling Text Content */}
                <div className="w-full md:w-[55%] lg:w-[50%] flex flex-col justify-center pt-8 md:pt-16 pb-32">

                    <FadeUp delay={0.1}>
                        <div className="font-sans text-[12px] font-semibold tracking-[0.2em] uppercase text-[#C96A45] mb-8">
                            The Book
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[76px] leading-[1.0] text-[#2B2218] tracking-[-0.01em] mb-12">
                            Understanding Our Energetic Architecture
                        </h1>
                    </FadeUp>

                    <FadeUp delay={0.3}>
                        <p className="font-serif text-[24px] md:text-[28px] leading-[1.3] text-[#2B2218] italic text-[#C96A45] border-l-2 border-[#C96A45] pl-6 mb-12">
                            What if your deepest struggles don't come from who you are, but from living against how your energy is designed?
                        </p>
                    </FadeUp>

                    <FadeUpStaggerGroup className="flex flex-col gap-6 font-sans text-[18px] md:text-[20px] leading-[1.8] text-[#2B2218] opacity-[0.85] mb-16">
                        <FadeUp delay={0.4}>
                            <p>
                                In <em>'Understanding Our Energetic Architecture'</em>, Dirk explores Human Design as more than a system—but as a living map of the body's intelligence, shaping how we live, make decisions, relate, parent, love, and protect ourselves.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.5}>
                            <p>
                                Your energetic architecture has been waiting your entire life to be recognized and lived by!
                            </p>
                        </FadeUp>
                    </FadeUpStaggerGroup>

                    <FadeUp delay={0.6}>
                        <div className="flex flex-col sm:flex-row gap-6 mt-4">
                            {/* Official Amazon Button */}
                            <a
                                href="https://amzn.to/4svseEs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center gap-3 bg-[#FF9900] text-[#111111] hover:bg-[#E38800] px-8 py-4 rounded-full font-sans font-bold text-[16px] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                            >
                                <span>Buy on</span>
                                <svg viewBox="0 0 100 30" fill="currentColor" className="h-6 mt-1">
                                    <path d="M63.74,18.06c-1.39-0.42-3.1-0.91-3.1-2.1c0-1.12,1.3-1.68,2.81-1.68c3.08,0,5.83,1.4,7.23,2.45v-4.63 C69.05,10.64,65.8,9.7,62.88,9.7c-4.43,0-8.08,2.37-8.08,6.8c0,4.41,3.47,6.01,7.21,7.09c1.99,0.56,2.82,1.19,2.82,2.25 c0,0.91-1,1.86-3.15,1.86c-3.13,0-6.93-1.47-8.91-3.23v5.1c2.18,1.68,6.23,2.77,9.58,2.77c5.63,0,8.27-2.67,8.27-6.92 C70.62,20.19,67.31,19.06,63.74,18.06z" />
                                    <path d="M34.86,9.98c-2.31,0-4.04,0.48-5.32,1.38V10H24.3v21.5h5.45V18.1c0-2.4,1.48-3.92,3.31-3.92 c1.6,0,3.08,1.04,3.08,3.28V23.7h5.42V17.3c0-2.78-0.96-5.11-3.08-6.14c1.86-1.1,2.81-3.04,2.81-5.34c0-4.04-2.88-5.83-7.58-5.83 c-2.91,0-6.05,1-7.85,2.46V7.4c1.78-1.02,4.6-1.78,7.39-1.78c2.25,0,3.33,0.72,3.33,2.02c0,1.21-1.21,1.84-3.06,1.84h-2.18v4.32 h2.66c1.62,0,2.6,0.66,2.6,2.02C36.63,17.43,35.53,18.1,34.86,18.1z M33.91,6.5c-2.25,0-3.33-0.72-3.33-2.02 c0-1.21,1.21-1.84,3.06-1.84h2.18v4.32h-2.66C32.32,6.96,33.15,6.5,33.91,6.5z" />
                                    <path d="M51.13,22.04c-1.2,0-2.63-0.58-2.63-2.23v-5.46h5.36v-4.2h-5.36V4h-5.46v6.15h-3.08v4.2h3.08v6.7 c0,3.75,2.68,5.18,5.91,5.18c2.06,0,3.45-0.34,4.24-0.66v-4.14C52.79,21.91,51.81,22.04,51.13,22.04z" />
                                    <path d="M11.96,16.89c0-1.24-0.12-2.14-0.41-2.91H22.1c0.14,0.59,0.22,1.22,0.22,1.96c0,5.64-3.52,9.65-9.82,9.65 c-5.64,0-9.82-4.19-9.82-9.82s4.19-9.82,9.82-9.82c2.61,0,4.87,0.92,6.47,2.37l-3.36,3.36c-0.89-0.79-1.92-1.23-3.11-1.23 c-3.05,0-5.34,2.44-5.34,5.34s2.29,5.34,5.34,5.34C10.05,21.15,11.5,19.34,11.96,16.89z" />
                                    <path d="M85.73,9.7c-4.47,0-7.79,3.12-7.79,7.11s3.32,7.11,7.79,7.11s7.79-3.12,7.79-7.11S90.2,9.7,85.73,9.7z M85.73,19.66 c-1.55,0-2.68-1.57-2.68-3.05c0-1.84,1.13-3.05,2.68-3.05c1.55,0,2.68,1.21,2.68,3.05C88.42,18.09,87.28,19.66,85.73,19.66z" />
                                    <path d="M101.81,9.98V10h-2.18c-1.39,0-2.73,0.56-3.75,1.52V10h-5.07v13.7h5.07v-6c0-1.8,0.92-3.18,2.42-3.18 c0.77,0,1.3,0.26,1.51,0.53v8.65h5.08V13.8C104.91,11.19,103.52,9.98,101.81,9.98z" />
                                    <path d="M48.24,30.34c-11.83,5.16-25.04,6.4-38.3,0.65C6.98,29.7,2.3,27.18,0.18,26.04c-0.12-0.07-0.14-0.16-0.08-0.23 c0.06-0.06,0.17-0.03,0.26,0l2.56,0.91c7.75,2.78,16.32,4.69,24.62,4.69c8.27,0,16.14-1.25,23.36-4.63 c0.12-0.06,0.2-0.04,0.24,0.02C51.2,27.32,49.2,29.93,48.24,30.34z" />
                                </svg>
                            </a>
                            <Button href="#excerpt" variant="outline">
                                Read an excerpt
                            </Button>
                        </div>
                    </FadeUp>

                </div>
            </div>
        </section>
    );
}
