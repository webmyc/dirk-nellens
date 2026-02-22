'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'motion/react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { ChevronDown, ShoppingBag } from 'lucide-react';

export function HeroBookTilt() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);

        // Max rotation ±8°
        setTilt({ x: x * 8, y: -y * 8 });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full flex items-center justify-center perspective-[800px] z-10 hidden md:flex"
            style={{ perspective: '800px' }}
        >
            {/* Ground shadow */}
            <motion.div
                className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[55%] h-[25px] bg-black/40 blur-2xl rounded-[100%]"
                animate={{ scale: isHovered ? 1.05 : [1, 0.95, 1], opacity: isHovered ? 0.3 : [0.3, 0.2, 0.3] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            />
            <motion.div
                animate={{
                    rotateY: tilt.x,
                    rotateX: tilt.y,
                    y: isHovered ? 0 : [0, -10, 0],
                }}
                transition={{
                    rotateY: { type: 'spring', stiffness: 100, damping: 30, mass: 0.5 },
                    rotateX: { type: 'spring', stiffness: 100, damping: 30, mass: 0.5 },
                    y: isHovered ? { duration: 0.5 } : { duration: 5, ease: 'easeInOut', repeat: Infinity },
                }}
                className="relative w-full max-w-[560px] lg:max-w-[640px] aspect-[4/5] md:ml-auto"
            >
                <Image
                    src="/images/book-transparent.png"
                    alt="Understanding Our Energetic Architecture"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_50px_70px_rgba(43,34,24,0.45)] scale-125 md:scale-[1.40] origin-center"
                    sizes="(max-width: 768px) 100vw, 760px"
                />
            </motion.div>
        </motion.div>
    );
}

export function StaggeredText({ text }: { text: string }) {
    const words = text.split(' ');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div ref={ref} className="overflow-hidden flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]">
            {words.map((word, i) => {
                const isItalic = word.toLowerCase().includes('energetic') || word.toLowerCase().includes('architecture');
                return (
                    <motion.span
                        key={i}
                        initial={{ y: '100%' }}
                        animate={isInView ? { y: 0 } : { y: '100%' }}
                        transition={{
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.4 + i * 0.06,
                        }}
                        className={`inline-block ${isItalic ? 'italic' : ''}`}
                    >
                        {word}
                    </motion.span>
                );
            })}
        </div>
    );
}

export function HeroHome() {
    return (
        <section className="relative min-h-screen flex items-center bg-[#C96A45] overflow-hidden pt-20">
            {/* Noise/Grain texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Grid lines (5% opacity) */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #F0EBE3 1px, transparent 1px),
            linear-gradient(to bottom, #F0EBE3 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                    backgroundPosition: 'center center'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid md:grid-cols-[55%_45%] gap-10 items-center py-20 pb-32">
                {/* Left Column - Mobile puts book above text */}
                <div className="flex flex-col md:hidden items-center justify-center mb-12 mt-12 w-full max-w-[420px] mx-auto aspect-[4/5] relative">
                    <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[60%] h-[20px] bg-black/40 blur-xl rounded-[100%]" />
                    <Image
                        src="/images/book-transparent.png"
                        alt="Understanding Our Energetic Architecture"
                        fill
                        priority
                        className="object-contain drop-shadow-[0_20px_40px_rgba(43,34,24,0.35)]"
                    />
                </div>

                <div className="flex flex-col items-start gap-8 relative z-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[12px] uppercase tracking-[0.2em] text-[#F0EBE3]/60 font-sans"
                    >
                        HUMAN DESIGN
                    </motion.div>

                    <h1 className="font-serif text-[52px] md:text-[84px] lg:text-[100px] leading-[0.97] tracking-[-0.02em] text-white">
                        <StaggeredText text="'Understanding our Energetic Architecture' is now available" />
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.6, type: 'spring', bounce: 0.4 }}
                        className="mt-6 md:mt-2 flex flex-col sm:flex-row gap-4"
                    >
                        {/* Official Amazon Button */}
                        <a
                            href="https://amzn.to/4svseEs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-3 bg-[#FF9900] text-[#111111] hover:bg-[#E38800] px-8 py-4 rounded-full font-sans font-[600] text-[17px] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
                            style={{ boxShadow: '0 8px 30px rgba(255, 153, 0, 0.4)' }}
                        >
                            <span>Buy on Amazon</span>
                        </a>
                        <Button
                            href="/book"
                            variant="secondary"
                            className="w-full sm:w-auto border-white/40 text-white hover:text-white bg-transparent hover:bg-white/10"
                        >
                            Or learn more
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 2.2 }}
                        className="mt-8"
                    >
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                            className="flex flex-col items-center justify-center text-[#F0EBE3] opacity-80"
                        >
                            <ChevronDown className="w-5 h-5 -mb-2" />
                            <ChevronDown className="w-5 h-5" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Column - Desktop Only */}
                <HeroBookTilt />
            </div>
        </section>
    );
}
