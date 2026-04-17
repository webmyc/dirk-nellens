import Image from 'next/image';
import { FadeUp, FadeUpStaggerGroup } from '@/components/ui/FadeUp';
import { Gift } from 'lucide-react';

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
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D27349]/30 bg-[#D27349]/10 text-[#D27349] font-sans text-[12px] font-bold tracking-[0.2em] uppercase mb-8">
                                <Gift className="w-4 h-4" /> Special Offer
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.2}>
                            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.1] tracking-[-0.01em] mb-6 text-white">
                                Free 3-month access to the Inner Circle
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.3}>
                            <p className="font-sans text-[18px] md:text-[22px] leading-[1.6] opacity-80 mb-10">
                                Buy the book, leave an honest review on Amazon, and receive three months of premium Substack access completely free <span className="text-white font-bold">(&euro;45 Value)</span>.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.6}>
                            <a
                                href={TALLY_FORM_URL}
                                className="inline-flex items-center justify-center bg-transparent border-[1.5px] border-white text-white px-8 py-4 rounded-full font-sans text-[13px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-[#2B2218] transition-all duration-300"
                            >
                                Claim My Free Access
                            </a>
                        </FadeUp>
                    </FadeUpStaggerGroup>

                    {/* Right: Visual */}
                    <FadeUp delay={0.4} className="relative hidden lg:block aspect-[4/5] overflow-hidden group">
                        <Image
                            src="/images/book-cover.jpg"
                            alt="Understanding Our Energetic Architecture"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                    </FadeUp>

                </div>
            </div>
        </section>
    );
}
