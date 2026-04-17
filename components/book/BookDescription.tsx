'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FadeUp } from '../ui/FadeUp';
import { Button } from '../ui/Button';

const audienceItems = [
    {
        title: "For parents",
        content: "It offers invaluable guidance for supporting their children\u2019s authentic development by understanding their innate energetic wiring."
    },
    {
        title: "For therapists",
        content: "It offers a way to perceive clients beyond their conditioned patterns\u2014revealing their energetic essence and the deeper roots of their defence mechanisms."
    },
    {
        title: "For spiritual seekers",
        content: "It serves as an inner GPS pointing toward awareness, helping them recognize the intelligence of their aliveness and transcend limiting mental constructs."
    },
    {
        title: "For anthropologists and cultural explorers",
        content: "It introduces Human Design as a fresh, non-ethnocentric lens for appreciating the richness of human diversity."
    }
];

function AccordionItem({ item, isOpen, onClick }: { item: any; isOpen: boolean; onClick: () => void }) {
    return (
        <div className="border-b border-[#2B2218]/10 last:border-0">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <h3 className="font-serif text-[24px] md:text-[28px] text-[#2B2218] group-hover:text-[#D27349] transition-colors">
                    {item.title}
                </h3>
                <div className={`w-10 h-10 rounded-full border border-[#2B2218]/15 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#D27349] border-[#D27349] text-white rotate-180' : 'text-[#2B2218] group-hover:border-[#D27349]'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="font-sans text-[18px] text-[#2B2218] opacity-[0.85] leading-[1.6] pb-8 pr-12">
                            {item.content}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function BookDescription() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Main 2-column layout */}
                <div className="grid md:grid-cols-[45%_55%] gap-16 md:gap-24 mb-32 items-start">

                    {/* Left Side: Sticky Text */}
                    <div className="md:sticky md:top-32 space-y-6 font-sans text-[20px] leading-[1.8] text-[#2B2218] opacity-[0.85]">
                        <FadeUp delay={0.1}>
                            <p>
                                <em>Understanding Our Energetic Architecture</em> represents the culmination of two decades of exploration into Human Design as a living, embodied system.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.2}>
                            <p>
                                It is a truly original contribution to the field of Human Design, one that honors Human Design&rsquo;s founder Ra&rsquo;s teachings while opening new pathways for therapy, childhood development, conscious living and relating.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.3}>
                            <p>
                                This book guides readers through Human Design&rsquo;s Bodygraph in a clear, experiential way. Real life examples bring these energetic patterns to life, transforming abstract ideas into practical insights anyone can apply.
                            </p>
                        </FadeUp>
                    </div>

                    {/* Right Side: Accordion for Audiences */}
                    <div className="flex flex-col gap-8">
                        <FadeUp delay={0.2}>
                            <h2 className="font-serif text-[36px] md:text-[44px] leading-[1.1] text-[#2B2218] mb-4">
                                Who is this book for?
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.3} className="w-full">
                            <div className="flex flex-col border-t border-[#2B2218]/10 pt-2">
                                {audienceItems.map((item, i) => (
                                    <AccordionItem
                                        key={i}
                                        item={item}
                                        isOpen={openIndex === i}
                                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    />
                                ))}
                            </div>
                        </FadeUp>
                    </div>

                </div>

                {/* Conclusion + Full Width CTA Band */}
                <div className="bg-[#EFDFCE] rounded-[24px] md:rounded-[40px] p-10 md:p-16 lg:p-20 relative overflow-hidden">
                    {/* Subtle noise over the CTA container */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />

                    <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                        <FadeUp delay={0.1}>
                            <p className="font-serif text-[28px] md:text-[36px] lg:text-[42px] leading-[1.3] text-[#2B2218] mb-12 italic">
                                &ldquo;In a world that pressures us to conform, my book offers something radical: the science of our authentic Self&mdash;a drop in a vast ocean of Love.&rdquo;
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.3}>
                            <Button href="https://mybook.to/dirk-nellens" variant="primary">
                                Shop the book
                            </Button>
                        </FadeUp>
                    </div>
                </div>

            </div>
        </section>
    );
}
