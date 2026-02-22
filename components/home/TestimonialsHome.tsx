'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
    {
        quote: "Dirk introduced me to my Bodygraph and told me things about myself that I didn't know and yet that somehow felt true. He made me feel inspired to be curious about myself and curious to see if life can be different if I change my approach.",
        author: 'SOPHIE',
    },
    {
        quote: "Dirk has the unique capacity to see the potential in people, beyond their conditioning, and guide them back to their organic essence. A profoundly transformational experience.",
        author: 'MARCUS',
    },
    {
        quote: "An honest, deeply resonant look into my own operating system. This reading gave me permission to finally rest in who I actually am.",
        author: 'ELENA',
    },
];

export function TestimonialsHome() {
    const [slide, setSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setSlide((s) => (s + 1) % testimonials.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 8000); // 8s auto-advance
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative py-32 md:py-48 bg-[#2B2218] overflow-hidden">

            {/* Super faint geometric background moving slowly */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <svg
                    viewBox="0 0 100 100"
                    className="w-[120vw] h-[120vw] opacity-[0.04] text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                >
                    <motion.g
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 250, repeat: Infinity, ease: 'linear' }}
                        className="origin-center"
                    >
                        <polygon points="50,10 90,50 50,90 10,50" />
                        <polygon points="50,25 75,50 50,75 25,50" />
                        <line x1="50" y1="10" x2="50" y2="90" />
                        <line x1="10" y1="50" x2="90" y2="50" />
                        <circle cx="50" cy="50" r="30" />
                    </motion.g>
                </svg>
            </div>

            <div className="relative z-10 max-w-[820px] mx-auto px-6 text-center">
                <div className="min-h-[280px] md:min-h-[240px] flex items-center justify-center mb-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            className="flex flex-col gap-10 items-center w-full"
                        >
                            <blockquote className="font-serif text-[32px] md:text-[44px] lg:text-[52px] leading-[1.2] text-white italic">
                                "{testimonials[slide].quote}"
                            </blockquote>
                            <div className="font-sans text-[16px] text-[#C96A45] tracking-[0.16em] uppercase font-semibold">
                                — {testimonials[slide].author}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Custom dash navigation */}
                <div className="flex justify-center items-center gap-3">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setSlide(i)}
                            className={`h-[2px] transition-all duration-300 ease-out ${i === slide
                                    ? 'w-[40px] bg-[#C96A45]'
                                    : 'w-[24px] bg-[#C96A45]/30 hover:bg-[#C96A45]/60'
                                }`}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
