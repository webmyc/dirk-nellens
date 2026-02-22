'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { FadeUp } from '../ui/FadeUp';

function AnimatedCounter({ value, duration = 1.8 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            let startTime: number;
            let animationFrame: number;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / (duration * 1000), 1);

                // easeOutExpo
                const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

                setCount(Math.floor(easeOut * value));

                if (percentage < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrame);
        }
    }, [isInView, value, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function AboutBio() {
    return (
        <section id="about" className="relative bg-[#F0EBE3] overflow-hidden pb-20 md:pb-32">
            <div className="grid md:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center min-h-screen">

                {/* Full bleed left-edge photo */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full h-[60vh] md:h-full md:min-h-screen md:w-[45vw] md:max-w-[600px] lg:w-[50vw]"
                >
                    <Image
                        src="/images/dirk-1.jpg"
                        alt="Dirk Nellens portrait"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Subtle gradient to fade into cream right side */}
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F0EBE3] to-transparent hidden md:block" />
                </motion.div>

                {/* Right column text content */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col px-6 md:pr-12 lg:pr-24 py-16 md:py-0 w-full max-w-[700px]"
                >
                    {/* Broken headline */}
                    <h2 className="font-serif text-[46px] md:text-[60px] lg:text-[68px] leading-[1.0] text-[#2B2218] tracking-[-0.01em] mb-12">
                        A certified Human Design<br className="hidden md:block" /> Analyst{' '}
                        <span className="md:hidden">/</span><br className="hidden md:block" />
                        with more than <span className="md:hidden">/</span><br className="hidden md:block" />
                        20 years of experience&hellip;
                    </h2>

                    {/* Stats Grid */}
                    <div className="flex gap-8 mb-16 border-l pl-2 border-[#C96A45]">
                        <div className="flex flex-col gap-1 pr-8">
                            <div className="font-sans font-bold text-[60px] md:text-[80px] leading-none text-[#C96A45] tracking-tight">
                                <AnimatedCounter value={20} />+
                            </div>
                            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#2B2218]">
                                Years of experience
                            </div>
                        </div>

                        <div className="w-[1px] bg-[#C96A45]/30 self-stretch my-2" />

                        <div className="flex flex-col gap-1 pl-4">
                            <div className="font-sans font-bold text-[60px] md:text-[80px] leading-none text-[#C96A45] tracking-tight">
                                <AnimatedCounter value={4000} />+
                            </div>
                            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#2B2218] max-w-[120px]">
                                Readings & Trainings
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 text-[#2B2218] opacity-[0.85] font-sans text-[19px] md:text-[20px] leading-[1.85] max-w-[560px]">
                        <p>
                            He discovered Human Design in 2002 and is one of the very few Reflector Types—comprising just 1% of the population—to have had the rare privilege of studying directly under the Human Design founder Ra Uru Hu in Ibiza for many years.
                        </p>
                        <p>
                            Dirk's therapeutic background includes formal training in inner child work, co-dependency recovery, breathwork, family constellations, and the Enneagram, as well as active meditative practices developed by Osho.
                        </p>
                        <p>
                            The integration of Human Design with therapeutic and meditative pathways forms the foundation of Dirk's profound approach to holding space for others.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
