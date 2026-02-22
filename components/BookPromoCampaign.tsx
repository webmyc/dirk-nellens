import Image from 'next/image';
import { FadeUp, FadeUpStaggerGroup } from '@/components/ui/FadeUp';
import { Gift, BookOpen, MessageSquareHeart } from 'lucide-react';

export function BookPromoCampaign() {
    const TALLY_FORM_URL = '#tally-open=rj6bYv&tally-layout=modal&tally-width=800&tally-emoji-text=👋&tally-emoji-animation=wave';

    return (
        <section className="py-24 md:py-32 bg-[#2B2218] relative overflow-hidden text-[#F0EBE3]">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
                <Image src="/images/bg-black.jpg" alt="" fill className="object-cover" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Copy & Offer */}
                    <FadeUpStaggerGroup>
                        <FadeUp delay={0.1}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C96A45]/30 bg-[#C96A45]/10 text-[#C96A45] font-sans text-[12px] font-bold tracking-[0.2em] uppercase mb-8">
                                <Gift className="w-4 h-4" /> Special Offer
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.2}>
                            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.1] tracking-[-0.01em] mb-6">
                                Free 3-Month Access to the <span className="text-[#C96A45] italic">Inner Circle</span>
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.3}>
                            <p className="font-sans text-[18px] md:text-[22px] leading-[1.6] opacity-80 mb-10">
                                Buy the book, leave an honest review on Amazon, and receive three months of premium Substack access completely free <span className="text-white font-bold">(€45 Value)</span>.
                            </p>
                        </FadeUp>

                        <div className="space-y-6 mb-12">
                            <FadeUp delay={0.4} className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-[#EBE4D8]/10 flex items-center justify-center shrink-0 mt-1">
                                    <BookOpen className="w-5 h-5 text-[#C96A45]" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-[22px] mb-2">1. Read the Book</h4>
                                    <p className="font-sans text-[#F0EBE3]/60 leading-[1.6]">
                                        Purchase and read <em className="text-[#F0EBE3]/90">Understanding Our Energetic Architecture</em>.
                                    </p>
                                </div>
                            </FadeUp>

                            <FadeUp delay={0.5} className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-[#EBE4D8]/10 flex items-center justify-center shrink-0 mt-1">
                                    <MessageSquareHeart className="w-5 h-5 text-[#C96A45]" />
                                </div>
                                <div>
                                    <h4 className="font-serif text-[22px] mb-2">2. Leave a Review</h4>
                                    <p className="font-sans text-[#F0EBE3]/60 leading-[1.6]">
                                        Write a review on Amazon sharing how the book impacted your journey.
                                    </p>
                                </div>
                            </FadeUp>
                        </div>

                        <FadeUp delay={0.6}>
                            <a
                                href={TALLY_FORM_URL}
                                className="inline-flex items-center justify-center bg-[#C96A45] text-white px-8 py-4 rounded-full font-sans text-[13px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-[#C96A45] transition-all duration-300 shadow-xl"
                            >
                                Claim My Free Access
                            </a>
                        </FadeUp>
                    </FadeUpStaggerGroup>

                    {/* Right: Visual */}
                    <FadeUp delay={0.4} className="relative hidden lg:block aspect-[4/5] rounded-[2rem] overflow-hidden group">
                        <Image
                            src="/images/book-cover.jpg"
                            alt="Understanding Our Energetic Architecture"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2218] to-transparent opacity-60" />
                        <div className="absolute bottom-12 left-12 right-12">
                            <h3 className="font-serif text-[32px] text-white leading-[1.2] mb-4 shadow-sm">
                                "A transformative understanding of our shared blueprint."
                            </h3>
                        </div>
                    </FadeUp>

                </div>
            </div>
        </section>
    );
}
