'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FadeUp } from '../ui/FadeUp';
import Link from 'next/link';

export function AuthorBioBook() {
    return (
        <section className="py-24 md:py-32 bg-[#F7F4EF] border-t border-[#2B2218]/10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">

                    <FadeUp delay={0.1} className="w-full md:w-[45%] flex justify-center md:justify-start">
                        <div className="relative w-[300px] md:w-[420px] aspect-square rounded-full overflow-hidden shadow-2xl">
                            <Image
                                src="/images/dirk-1.jpg"
                                alt="Dirk Nellens"
                                fill
                                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 300px, 420px"
                            />
                        </div>
                    </FadeUp>

                    <div className="flex flex-col gap-8 w-full md:w-[55%] max-w-[600px] text-center md:text-left">
                        <FadeUp delay={0.2}>
                            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.1] text-[#2B2218]">
                                About the Author
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.3}>
                            <p className="font-sans text-[20px] leading-[1.7] text-[#2B2218] opacity-[0.85]">
                                A certified Human Design Analyst with more than 20 years of experience, Dirk has conducted over 4,000 readings and trainings internationally.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.4}>
                            <p className="font-sans text-[20px] leading-[1.7] text-[#2B2218] opacity-[0.85]">
                                He discovered Human Design in 2002 and is one of the very few Reflectors&mdash;comprising just 1% of the population&mdash;to have had the rare privilege of studying directly under the Human Design founder Ra Uru Hu in Ibiza for many years.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.5}>
                            <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start mt-4">
                                <Link
                                    href="/about"
                                    className="group flex items-center gap-2 text-[#D27349] font-sans font-medium text-[16px]"
                                >
                                    <span className="relative pb-1">
                                        Read full bio
                                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D27349] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                    </span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>

                                <div className="w-[1px] h-6 bg-[#2B2218]/20 hidden md:block" />

                                <Link
                                    href="/blog/newsletter"
                                    className="group flex items-center gap-2 text-[#2B2218] opacity-[0.6] hover:opacity-100 transition-opacity font-sans font-medium text-[16px]"
                                >
                                    <span className="relative pb-1">
                                        Read articles
                                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2B2218] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                    </span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </FadeUp>

                    </div>
                </div>
            </div>
        </section>
    );
}
