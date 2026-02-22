'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { FadeUp } from '../ui/FadeUp';

export function CoursesHome() {
    return (
        <section className="py-24 md:py-32 bg-[#F0EBE3]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="border-t border-[#C96A45] mb-12 hidden md:block" />

                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

                    <div className="flex flex-col gap-10">
                        <FadeUp delay={0.1}>
                            <h2 className="font-serif text-[48px] md:text-[68px] lg:text-[72px] leading-tight text-[#2B2218]">
                                Courses taught by Dirk
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.2}>
                            <figure className="relative ml-0 md:ml-6 my-4 pl-8 border-l-4 border-[#C96A45]">
                                <blockquote className="font-serif text-[24px] md:text-[26px] lg:text-[28px] leading-[1.4] text-[#2B2218] italic pb-6">
                                    "I have learned the most about myself not through theory and information, but through therapy, creative expression, meditation, dance, deep conversations, listening, music, touch, breath—anything that moves the body and strengthens the inner witness. It's in these spaces that Human Design truly comes alive."
                                </blockquote>
                                <figcaption className="font-sans text-[14px] font-semibold tracking-[0.12em] uppercase text-[#C96A45]">
                                    — Dirk Nellens
                                </figcaption>
                            </figure>
                        </FadeUp>

                        <FadeUp delay={0.3}>
                            <div className="mt-4">
                                <Button href="/courses" variant="primary">
                                    Find out more
                                </Button>
                            </div>
                        </FadeUp>
                    </div>

                    <FadeUp delay={0.2} className="w-full flex justify-center md:justify-end">
                        <div className="relative w-full max-w-[540px] aspect-[4/5] animate-[float-large_7s_ease-in-out_infinite]">
                            <Image
                                src="/images/collage-g-center-composition.png"
                                alt="Human Design organic collage artwork"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 540px"
                            />
                        </div>
                    </FadeUp>

                </div>
            </div>
        </section>
    );
}
