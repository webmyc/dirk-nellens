'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeUp, FadeUpStaggerGroup } from '../ui/FadeUp';

const sessionCards = [
    {
        title: 'Personal Chart Analysis',
        price: '€ 175',
        desc: "This session offers a clear, compassionate mirror of who you are beneath conditioning—how your energy moves, how you make decisions, and how life flows most naturally for you.",
        href: '/sessions#chart-analysis',
    },
    {
        title: 'Connection Chart Analysis',
        price: '€ 250',
        desc: "Human Design offers a profound lens for understanding how two people connect. A Connection Chart Analysis maps the energetic interplay between both charts, revealing who brings what to the relationship.",
        href: '/sessions#connection',
    },
    {
        title: "Human Design & Personal Guidance",
        price: '€ 150',
        desc: "By using Human Design as a subtle but powerful lens, any life situation can become a doorway to recognising and embodying your true authenticity.",
        href: '/sessions#guidance',
    },
    {
        title: "'Opening to Change' Session",
        price: '€ 150',
        desc: "Feeling stuck or uncertain about your next step? By learning to listen deeply to your heart, and approaching challenges with greater awareness, a transformative process of clarity becomes possible.",
        href: '/sessions#opening-to-change',
    },
];

export function SessionsHome() {
    return (
        <section id="sessions" className="py-24 md:py-32 bg-[#F7F4EF]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative">
                <div className="flex flex-col md:flex-row items-baseline justify-between gap-6">
                    <FadeUp delay={0.1}>
                        <h2 className="font-serif text-[42px] md:text-[52px] lg:text-[60px] leading-tight text-[#2B2218]">
                            Human Design &<br className="hidden md:block" /> Therapy Sessions
                        </h2>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <Link
                            href="/sessions"
                            className="inline-flex items-center gap-2 text-[#C96A45] font-sans text-[14px] font-medium tracking-wide group"
                        >
                            <span className="relative">
                                View all sessions
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C96A45] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                            </span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </FadeUp>
                </div>
            </div>

            <div className="flex overflow-x-auto pb-16 px-6 md:px-12 gap-8 snap-x snap-mandatory hide-scrollbar">
                {sessionCards.map((card, i) => (
                    <FadeUp delay={0.15 + i * 0.1} key={card.title}>
                        <Link
                            href={card.href}
                            className="group block min-w-[85vw] md:min-w-[380px] w-[380px] h-full bg-[#F0EBE3] rounded-[16px] p-[40px] snap-start transition-all duration-350 ease-out hover:-translate-y-[10px] hover:shadow-[0_24px_48px_rgba(43,34,24,0.12)] relative overflow-hidden"
                        >
                            {/* Expanding 3px terracotta top border */}
                            <div className="absolute top-0 left-0 h-[3px] bg-[#C96A45] w-0 transition-all duration-400 ease-out group-hover:w-full" />

                            <div className="flex flex-col h-full justify-between gap-8 pt-2">
                                <div>
                                    <h3 className="font-serif font-bold text-[22px] leading-[1.3] text-[#2B2218] mb-4">
                                        {card.title}
                                    </h3>
                                    <div className="font-sans font-medium text-[18px] text-[#C96A45] mb-6">
                                        {card.price}
                                    </div>
                                    <p className="font-sans text-[16px] text-[#2B2218] opacity-80 leading-[1.6]">
                                        {card.desc}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-[#2B2218] mt-4">
                                    <span className="font-sans text-[14px] font-medium opacity-60 group-hover:opacity-100 group-hover:text-[#C96A45] transition-colors">
                                        Find out more
                                    </span>
                                    <div className="w-8 h-8 rounded-full border border-[#2B2218]/20 flex items-center justify-center group-hover:bg-[#C96A45] group-hover:border-[#C96A45] group-hover:text-[#F0EBE3] transition-colors">
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </FadeUp>
                ))}
                {/* Spacer to allow full scroll to the right element */}
                <div className="min-w-[48px] w-[48px] flex-shrink-0" />
            </div>
        </section>
    );
}
