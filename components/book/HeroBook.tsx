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
                            {/* Primary Button */}
                            <a
                                href="https://mybook.to/dirk-nellens"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                            >
                                <Image
                                    src="/images/amazon.png"
                                    alt="Buy on Amazon"
                                    width={220}
                                    height={80}
                                    className="object-contain h-[56px] w-auto drop-shadow-lg group-hover:drop-shadow-xl transition-all"
                                />
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
