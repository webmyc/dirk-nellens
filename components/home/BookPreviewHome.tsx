'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { FadeUp } from '../ui/FadeUp';

export function BookPreviewHome() {
    return (
        <section id="book" className="relative py-24 md:py-32 bg-[#D27349] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-[1fr_auto] gap-16 md:gap-24 items-center relative z-10">

                <div className="flex flex-col gap-8 max-w-[600px] order-2 md:order-1">
                    <FadeUp delay={0.1}>
                        <h2 className="font-serif italic text-[40px] md:text-[48px] leading-[1.05] tracking-[-0.01em] text-white">
                            Understanding Our Energetic Architecture
                        </h2>
                    </FadeUp>

                    <FadeUp delay={0.25}>
                        <div className="space-y-6 text-[#F0EBE3] opacity-[0.9] font-sans text-[19px] leading-[1.85]">
                            <p>
                                <span className="font-bold">This book is</span> a culmination of two decades of exploration into Human Design as a living, embodied system. Dirk&rsquo;s aim is to offer readers a practical and transformative understanding of our shared energetic blueprint, in <em>Understanding Our Energetic Architecture</em>.
                            </p>
                            <p>
                                An original contribution that honors the founder&rsquo;s teachings while opening new pathways for therapy, childhood development, conscious living and relating.
                            </p>
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.4}>
                        <div className="mt-4">
                            <Button href="https://mybook.to/dirk-nellens" variant="primary" className="bg-[#2B2218] text-[#F0EBE3] border-[1.5px] border-white">
                                Buy the book
                            </Button>
                        </div>
                    </FadeUp>
                </div>

                <FadeUp delay={0.2} className="order-1 md:order-2 w-full flex justify-center md:justify-end">
                    <div className="relative h-[340px] md:h-[420px] lg:h-[460px] aspect-[3/4] animate-[float-large_6s_ease-in-out_infinite]">
                        <Image
                            src="/images/book-transparent.png"
                            alt="Understanding Our Energetic Architecture by Dirk Nellens"
                            fill
                            className="object-contain drop-shadow-[0_40px_60px_rgba(43,34,24,0.4)]"
                            sizes="(max-width: 768px) 100vw, 460px"
                        />
                    </div>
                </FadeUp>

            </div>
        </section>
    );
}
