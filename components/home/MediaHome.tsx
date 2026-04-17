import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeUp, FadeUpStaggerGroup } from '../ui/FadeUp';
import { getSubstackFeed, getFeaturedTherapyGridArticles } from '@/lib/substack';

export async function MediaHome() {
    const allArticles = await getSubstackFeed();
    const linkedTherapyArticles = await getFeaturedTherapyGridArticles();

    // General recent articles (excluding the ones shown in the featured therapy grid)
    const linkedSlugs = linkedTherapyArticles.map(a => a.slug);
    const recentArticles = allArticles.filter(a => !linkedSlugs.includes(a.slug)).slice(0, 3);

    // Helper date formatter
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <section className="py-24 md:py-32 bg-[#F7F4EF]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-24">

                {/* Featured Therapy Series Grid */}
                {linkedTherapyArticles.length > 0 && (
                    <div>
                        <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-12 border-b border-[#2B2218]/10 pb-6">
                            <FadeUp delay={0.1}>
                                <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[56px] leading-tight text-[#2B2218]">
                                    Human Design & Therapy Series
                                </h2>
                            </FadeUp>
                            <FadeUp delay={0.2}>
                                <Link
                                    href="/blog/newsletter"
                                    className="font-sans text-[14px] text-[#D27349] font-medium tracking-wide hover:opacity-75 transition-opacity"
                                >
                                    View full series
                                </Link>
                            </FadeUp>
                        </div>

                        <FadeUpStaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {linkedTherapyArticles.map((article, i) => (
                                <FadeUp delay={0.15 + i * 0.1} key={article.id}>
                                    <Link href={`/blog/newsletter/${article.slug}`} className="group flex flex-col h-full bg-[#F0EBE3] rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 border border-[#2B2218]/5">
                                        {/* Cover image area */}
                                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#2B2218]/5">
                                            {article.coverImage ? (
                                                <Image
                                                    src={article.coverImage}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                                    <Image src="/images/substack-orange.png" alt="" width={60} height={60} className="object-contain" />
                                                </div>
                                            )}
                                        </div>
                                        {/* Content area */}
                                        <div className="flex flex-col flex-1 p-8 gap-4">
                                            <div className="flex items-center gap-3 font-sans text-[12px] font-semibold tracking-widest uppercase text-[#D27349]/80">
                                                {formatDate(article.pubDate)}
                                            </div>
                                            <h3 className="font-serif text-[22px] leading-[1.3] text-[#2B2218] group-hover:text-[#D27349] transition-colors line-clamp-3">
                                                {article.title}
                                            </h3>
                                            <p className="font-sans text-[15px] opacity-70 leading-[1.6] line-clamp-3 mt-auto pt-4">
                                                {article.contentSnippet}
                                            </p>
                                        </div>
                                    </Link>
                                </FadeUp>
                            ))}
                        </FadeUpStaggerGroup>
                    </div>
                )}

                {/* Recent Articles & Media Grid */}
                <div>
                    <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-12 border-b border-[#2B2218]/10 pb-6">
                        <FadeUp delay={0.1}>
                            <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[56px] leading-tight text-[#2B2218]">
                                Dirk&rsquo;s Recent Reflections
                            </h2>
                        </FadeUp>
                        <FadeUp delay={0.2}>
                            <a
                                href="https://reflectorsreflections.substack.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#D27349] font-sans text-[14px] font-medium tracking-wide group"
                            >
                                <span className="relative">
                                    All articles on Substack
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D27349] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                </span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </FadeUp>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_380px] gap-8 items-stretch">

                        {/* General Feed Articles List */}
                        <div className="flex flex-col gap-6">
                            <FadeUpStaggerGroup className="flex flex-col gap-6 h-full justify-between">
                                {recentArticles.length > 0 ? recentArticles.map((article, i) => (
                                    <FadeUp delay={0.1 + i * 0.1} key={article.id}>
                                        <Link href={`/blog/newsletter/${article.slug}`} className="group flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-[20px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-[#2B2218]/5">
                                            {article.coverImage && (
                                                <div className="relative w-full sm:min-w-[140px] sm:max-w-[140px] aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0 bg-[#2B2218]/5">
                                                    <Image src={article.coverImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="140px" />
                                                </div>
                                            )}
                                            <div className="flex flex-col justify-center gap-3">
                                                <div className="font-sans text-[12px] font-semibold tracking-widest uppercase text-[#2B2218]/40">
                                                    {formatDate(article.pubDate)}
                                                </div>
                                                <h3 className="font-serif text-[20px] leading-[1.3] text-[#2B2218] group-hover:text-[#D27349] transition-colors">
                                                    {article.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    </FadeUp>
                                )) : (
                                    <div className="opacity-50 text-[14px]">Loading recent articles...</div>
                                )}
                            </FadeUpStaggerGroup>
                        </div>

                        {/* Podcasts Promo Card */}
                        <FadeUp delay={0.4} className="h-full">
                            <Link
                                href="/podcasts"
                                className="group flex flex-col justify-between p-10 bg-[#2B2218] text-[#F0EBE3] rounded-[24px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 h-full relative overflow-hidden min-h-[320px]"
                            >
                                {/* Visual accent */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D27349] rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

                                <div className="flex flex-col gap-6 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#F0EBE3] rounded-full flex items-center justify-center p-3 text-[#2B2218] group-hover:bg-[#D27349] group-hover:text-white transition-colors duration-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="font-serif text-[36px] leading-[1.1]">
                                        Podcasts & Video
                                    </h3>
                                    <p className="font-sans text-[16px] opacity-70 leading-[1.6]">
                                        Listen to Dirk discuss the mechanics of Human Design in various interviews
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-[#D27349] font-sans font-medium mt-8 relative z-10 w-fit group/link">
                                    <span className="relative">
                                        Listen now
                                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D27349] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
                                    </span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                                </div>
                            </Link>
                        </FadeUp>

                    </div>
                </div>

            </div>
        </section>
    );
}
