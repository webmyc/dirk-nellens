import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FadeUp, FadeUpStaggerGroup } from '@/components/ui/FadeUp';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CheckCircle2, Circle, X } from 'lucide-react';
import { getFeaturedTherapyGridArticles } from '@/lib/substack';
import { BookPromoCampaign } from '@/components/BookPromoCampaign';

export default async function CommunityPage() {
    const featuredArticles = await getFeaturedTherapyGridArticles();
    const previews = featuredArticles.slice(0, 3);

    return (
        <main className="min-h-screen flex flex-col bg-[#F7F4EF]">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 bg-[#2B2218] text-[#F0EBE3] overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/images/bg-black.jpg" alt="" fill className="object-cover opacity-20" priority />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 mb-8 md:mb-12">
                    <Breadcrumbs items={[{ label: 'Community', href: '/community' }]} className="text-[#F0EBE3]/60" />
                </div>

                <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
                    <FadeUpStaggerGroup>
                        <FadeUp delay={0.1}>
                            <h1 className="font-serif text-[48px] md:text-[80px] leading-[1.1] tracking-[-0.02em] mb-8">
                                Reflector's <span className="text-[#C96A45] italic">Sanctuary</span>
                            </h1>
                        </FadeUp>
                        <FadeUp delay={0.2}>
                            <p className="font-sans text-[18px] md:text-[22px] leading-[1.6] opacity-80 max-w-2xl mx-auto mb-12">
                                An exclusive premium community space for deep, ongoing therapeutic support, live neutrino weather analysis, and complete access to the ultimate Human Design archive.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.3}>
                            <a
                                href="https://reflectorsreflections.substack.com/subscribe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-[#C96A45] text-white px-8 py-4 rounded-full font-sans text-[13px] font-bold tracking-widest uppercase hover:bg-white hover:text-[#C96A45] transition-colors duration-300"
                            >
                                Upgrade to Premium
                            </a>
                        </FadeUp>
                    </FadeUpStaggerGroup>
                </div>
            </section>

            {/* Pricing Tiers Section */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8">
                    <FadeUp className="text-center mb-16 md:mb-24">
                        <p className="font-sans text-[13px] font-semibold tracking-[0.2em] uppercase text-[#C96A45] mb-6">Join the Inner Circle</p>
                        <h2 className="font-serif text-[42px] md:text-[56px] text-[#2B2218] leading-[1.1] tracking-[-0.01em]">
                            Choose your subscription
                        </h2>
                    </FadeUp>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* 1. Monthly */}
                        <FadeUp delay={0.1}>
                            <a href="https://reflectorsreflections.substack.com/subscribe" target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
                                <div className="h-full border border-[#2B2218]/10 rounded-2xl p-8 bg-[#F7F4EF]/50 hover:bg-[#F7F4EF] transition-colors relative flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="font-sans font-bold text-[20px] text-[#2B2218]">Monthly</h3>
                                            <p className="font-sans text-[#2B2218]/60 mt-1">€17/month</p>
                                        </div>
                                        <Circle className="w-6 h-6 text-[#2B2218]/20" />
                                    </div>
                                    <ul className="space-y-4 font-sans text-[#2B2218]/80 text-[15px] flex-grow">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#2B2218]/40 shrink-0 mt-0.5" />
                                            <span>Subscriber-only posts and full archive</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#2B2218]/40 shrink-0 mt-0.5" />
                                            <span>Weekly Neutrino Weather & Post comments and join the community</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#2B2218]/40 shrink-0 mt-0.5" />
                                            <span>2 Zoom calls per month with live Neutrino Weather hot seat readings</span>
                                        </li>
                                    </ul>
                                </div>
                            </a>
                        </FadeUp>

                        {/* 2. Annual (Highlighted) */}
                        <FadeUp delay={0.2}>
                            <a href="https://reflectorsreflections.substack.com/subscribe" target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
                                <div className="h-full border-2 border-[#C96A45] rounded-2xl p-8 bg-white relative shadow-lg flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="font-sans font-bold text-[20px] text-[#2B2218]">Annual</h3>
                                            <p className="font-sans text-[#2B2218]/60 mt-1">€177/year <span className="opacity-70">(€14.75/month)</span></p>
                                        </div>
                                        <div className="w-6 h-6 rounded-full bg-[#C96A45] flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <ul className="space-y-4 font-sans text-[#2B2218]/80 text-[15px] flex-grow">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#C96A45] shrink-0 mt-0.5" />
                                            <span>Subscriber-only posts and full archive</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#C96A45] shrink-0 mt-0.5" />
                                            <span>Weekly Neutrino Weather & Post comments and join the community</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#C96A45] shrink-0 mt-0.5" />
                                            <span>2 Zoom calls per month with live Neutrino Weather hot seat readings</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#C96A45] shrink-0 mt-0.5" />
                                            <span>13% cheaper than subscribing monthly</span>
                                        </li>
                                    </ul>
                                </div>
                            </a>
                        </FadeUp>

                        {/* 3. Founding Member */}
                        <FadeUp delay={0.3}>
                            <a href="https://reflectorsreflections.substack.com/subscribe" target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
                                <div className="h-full border border-[#2B2218]/10 rounded-2xl p-8 bg-[#F7F4EF]/50 hover:bg-[#F7F4EF] transition-colors relative flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="font-sans font-bold text-[20px] text-[#2B2218]">Founding Member</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="border border-[#2B2218]/20 bg-white rounded-md px-3 py-1 text-sm font-sans text-[#2B2218]">
                                                    € 440
                                                </div>
                                                <span className="font-sans text-[#2B2218]/60 text-sm">/ year</span>
                                            </div>
                                        </div>
                                        <Circle className="w-6 h-6 text-[#2B2218]/20" />
                                    </div>
                                    <ul className="space-y-4 font-sans text-[#2B2218]/80 text-[15px] flex-grow">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#2B2218]/40 shrink-0 mt-0.5" />
                                            <span>Subscriber-only posts and full archive</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#2B2218]/40 shrink-0 mt-0.5" />
                                            <span>Weekly Neutrino Weather & Post comments and join the community</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#2B2218]/40 shrink-0 mt-0.5" />
                                            <span>2 Zoom calls per month with live Neutrino Weather hot seat readings</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#2B2218]/40 shrink-0 mt-0.5" />
                                            <span>Get a private Human Design reading with me</span>
                                        </li>
                                    </ul>
                                </div>
                            </a>
                        </FadeUp>

                        {/* 4. None (Free) */}
                        <FadeUp delay={0.4}>
                            <a href="https://reflectorsreflections.substack.com/subscribe" target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
                                <div className="h-full border border-[#2B2218]/10 rounded-2xl p-8 bg-[#F7F4EF]/20 hover:bg-[#F7F4EF]/50 transition-colors relative flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="font-sans font-bold text-[20px] text-[#2B2218]">None</h3>
                                            <p className="font-sans text-[#2B2218]/60 mt-1">Free</p>
                                        </div>
                                        <Circle className="w-6 h-6 text-[#2B2218]/20" />
                                    </div>
                                    <ul className="space-y-4 font-sans text-[#2B2218]/80 text-[15px] flex-grow">
                                        <li className="flex items-start gap-3 opacity-40">
                                            <X className="w-5 h-5 shrink-0 mt-0.5" />
                                            <span className="line-through">Subscriber-only posts and full archive</span>
                                        </li>
                                        <li className="flex items-start gap-3 opacity-40">
                                            <X className="w-5 h-5 shrink-0 mt-0.5" />
                                            <span className="line-through">Weekly Neutrino Weather & Post comments and join the community</span>
                                        </li>
                                        <li className="flex items-start gap-3 opacity-40">
                                            <X className="w-5 h-5 shrink-0 mt-0.5" />
                                            <span className="line-through">2 Zoom calls per month with live Neutrino Weather hot seat readings</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#2B2218]/40 shrink-0 mt-0.5" />
                                            <span>Weekly Human Design Reflection</span>
                                        </li>
                                    </ul>
                                </div>
                            </a>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* Preview Section */}
            <section className="py-24 bg-[#EBE4D8] border-t border-[#2B2218]/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <FadeUp className="mb-12 md:mb-16 flex justify-between items-end">
                        <div>
                            <h2 className="font-serif text-[36px] md:text-[48px] text-[#2B2218] leading-[1.1] mb-4">
                                Premium Previews
                            </h2>
                            <p className="font-sans text-[16px] text-[#2B2218]/60 max-w-lg">
                                A glimpse into the type of deep psychological and mechanics-based content available to the community.
                            </p>
                        </div>
                        <Link href="/blog/newsletter" className="hidden md:inline-flex items-center hover:text-[#C96A45] font-sans text-[13px] font-bold tracking-widest uppercase transition-colors">
                            Read the free blog
                        </Link>
                    </FadeUp>

                    <div className="grid md:grid-cols-3 gap-8">
                        {previews.map((article, i) => (
                            <FadeUp key={article.slug} delay={i * 0.1} className="group cursor-pointer">
                                <Link href={`/blog/newsletter/${article.slug}`}>
                                    <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-700">
                                        {article.coverImage ? (
                                            <Image src={article.coverImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                                        ) : (
                                            <div className="w-full h-full bg-[#2B2218]" />
                                        )}
                                    </div>
                                    <h3 className="font-serif text-[20px] md:text-[24px] leading-[1.3] text-[#2B2218] group-hover:text-[#C96A45] transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                </Link>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            <BookPromoCampaign />

            {/* Final Substack CTA */}
            <section className="py-32 bg-[#2B2218] text-center px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <FadeUpStaggerGroup>
                        <FadeUp delay={0.1}>
                            <Image src="/images/substack-orange.png" alt="Substack" width={60} height={60} className="mx-auto mb-8 opacity-80" />
                        </FadeUp>
                        <FadeUp delay={0.2}>
                            <h2 className="font-serif text-[42px] md:text-[64px] text-[#F0EBE3] leading-[1.1] mb-8">
                                Ready to join the <span className="italic text-[#C96A45]">inner circle</span>?
                            </h2>
                        </FadeUp>
                        <FadeUp delay={0.3}>
                            <p className="font-sans text-[18px] md:text-[20px] text-[#F0EBE3]/60 mb-12">
                                Upgrade to the paid tier on Substack today for €15/month and get instant access to the archive and upcoming live zoom calls.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.4}>
                            <a
                                href="https://reflectorsreflections.substack.com/subscribe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-[#C96A45] text-white px-10 py-5 rounded-full font-sans text-[14px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-[#C96A45] transition-all duration-300 shadow-xl"
                            >
                                Become a Paid Subscriber
                            </a>
                        </FadeUp>
                    </FadeUpStaggerGroup>
                </div>
            </section>

            <Footer />
        </main>
    );
}
