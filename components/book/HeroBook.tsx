'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { FadeUp, FadeUpStaggerGroup } from '../ui/FadeUp';

export function HeroBook() {
    return (
        <section className="relative bg-[#F0EBE3] min-h-screen flex flex-col md:flex-row">
            {/* Left Side: Full height image flush to the edge */}
            <div className="w-full md:w-[45%] lg:w-[50%] relative min-h-[60vh] md:min-h-screen order-last md:order-first">
                <Image
                    src="/images/book-3.jpg"
                    alt="Understanding Our Energetic Architecture"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {/* Right Side: Text Content */}
            <div className="w-full md:w-[55%] lg:w-[50%] flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 py-32 md:py-40">
                <div className="max-w-2xl mx-auto md:mx-0">
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
                                    width={280}
                                    height={100}
                                    className="object-contain h-[73px] w-auto drop-shadow-lg group-hover:drop-shadow-xl transition-all"
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
