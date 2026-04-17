import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { getSubstackFeed, getFeaturedTherapyGridArticles } from '@/lib/substack';
import { FadeUp, FadeUpStaggerGroup } from '@/components/ui/FadeUp';
import Newsletter from '@/components/Newsletter';
import NewsletterHeroSubscribe from '@/components/NewsletterHeroSubscribe';
import { PlayCircle, Headphones } from 'lucide-react';
import { BookPromoCampaign } from '@/components/BookPromoCampaign';

export const metadata = {
    title: 'Reflector\u2019s Reflections',
    description: 'Weekly Human Design reflections, Neutrino Weather reports and psychological explorations through the lens of a Reflector.',
    openGraph: {
        title: 'Reflector\u2019s Reflections | Dirk Nellens',
        description: 'Weekly Human Design reflections, Neutrino Weather reports and psychological explorations through the lens of a Reflector.',
        images: [{ url: '/images/dirk-3.jpg' }],
    }
};

export default async function NewsletterIndex() {
    const allArticles = await getSubstackFeed();
    const linkedTherapyArticles = await getFeaturedTherapyGridArticles();

    const linkedSlugs = linkedTherapyArticles.map(a => a.slug);
    const generalArticles = allArticles.filter(a => !linkedSlugs.includes(a.slug));
    const featuredArticle = generalArticles.length > 0 ? generalArticles[0] : null;
    const recentGridArticles = generalArticles.slice(1);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <main className="min-h-screen flex flex-col pt-0 bg-[#F0EBE3]">
            <Navigation />

            {/* Header */}
            <section className="pt-32 md:pt-40 pb-16 px-6 md:px-12 text-center border-b border-[#2B2218]/5">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
                    <FadeUp delay={0.1}>
                        <p className="font-sans text-[12px] font-semibold tracking-[0.2em] uppercase text-[#D27349]">
                            Essays &amp; Insights
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[76px] leading-[1.0] text-[#2B2218] tracking-[-0.01em]">
                            Reflector&rsquo;s Reflections
                        </h1>
                    </FadeUp>
                    <FadeUp delay={0.3}>
                        <p className="font-sans text-[18px] md:text-[20px] leading-[1.6] text-[#2B2218] opacity-70 max-w-2xl mx-auto">
                            Weekly Human Design reflections, Neutrino Weather reports and psychological explorations through the lens of a Reflector.
                        </p>
                    </FadeUp>
                    <NewsletterHeroSubscribe />
                </div>
            </section>

            {/* Featured Article */}
            {featuredArticle && (
                <section className="py-16 md:py-24 px-6 md:px-12">
                    <div className="max-w-7xl mx-auto">
                        <FadeUp delay={0.4}>
                            <Link
                                href={`/blog/newsletter/${featuredArticle.slug}`}
                                className="group flex flex-col md:flex-row md:items-stretch gap-8 md:gap-16 bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-[#2B2218]/5"
                            >
                                {/* Image */}
                                <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:self-stretch bg-[#F7F4EF] overflow-hidden">
                                    {featuredArticle.coverImage ? (
                                        <Image
                                            src={featuredArticle.coverImage}
                                            alt={featuredArticle.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            priority
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                            <Image src="/images/substack-orange.png" alt="" width={100} height={100} className="object-contain" />
                                        </div>
                                    )}
                                    {featuredArticle.videoIframe && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors z-10">
                                            <PlayCircle className="w-16 h-16 text-white opacity-90 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    )}
                                    {!featuredArticle.videoIframe && featuredArticle.audioUrl && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors z-10">
                                            <Headphones className="w-16 h-16 text-white opacity-90 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-6 w-full md:w-1/2 p-8 md:pr-16 md:py-16">
                                    <div className="flex items-center gap-3 font-sans text-[13px] font-semibold tracking-widest uppercase text-[#D27349]">
                                        Latest Essay • {formatDate(featuredArticle.pubDate)}
                                    </div>
                                    <h2 className="font-serif text-[32px] md:text-[42px] leading-[1.15] text-[#2B2218] group-hover:text-[#D27349] transition-colors">
                                        {featuredArticle.title}
                                    </h2>
                                    <div className="w-12 h-[1px] bg-[#2B2218]/20 my-2" />
                                    <p className="font-sans text-[18px] leading-[1.7] text-[#2B2218] opacity-[0.8] line-clamp-3">
                                        {featuredArticle.contentSnippet}
                                    </p>
                                    <div className="mt-4 font-serif text-[18px] italic text-[#D27349] flex items-center gap-2">
                                        Read article <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                    </div>
                                </div>
                            </Link>
                        </FadeUp>
                    </div>
                </section>
            )}

            {/* Featured Therapy Series */}
            {linkedTherapyArticles.length > 0 && (
                <section className="py-24 bg-[#EBE4D8] border-y border-[#2B2218]/5">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <FadeUp delay={0.1}>
                            <div className="flex flex-col gap-4 text-center mb-16 max-w-2xl mx-auto">
                                <span className="font-sans text-[12px] font-semibold tracking-widest uppercase text-[#D27349]">
                                    Featured Series
                                </span>
                                <h2 className="font-serif text-[36px] md:text-[48px] leading-tight text-[#2B2218]">
                                    Human Design & Therapy
                                </h2>
                                <p className="font-sans text-[16px] text-[#2B2218] opacity-70 leading-relaxed">
                                    A multi-part exploration into the intersection of therapeutic modalities, character formation, and energetic architecture.
                                </p>
                            </div>
                        </FadeUp>

                        <FadeUpStaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {linkedTherapyArticles.map((article, i) => (
                                <FadeUp delay={0.15 + i * 0.1} key={article.id}>
                                    <Link href={`/blog/newsletter/${article.slug}`} className="group flex flex-col h-full bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 border border-[#2B2218]/5">
                                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F7F4EF]">
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
                                            {article.videoIframe && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors z-10">
                                                    <PlayCircle className="w-12 h-12 text-white opacity-90 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            )}
                                            {!article.videoIframe && article.audioUrl && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors z-10">
                                                    <Headphones className="w-12 h-12 text-white opacity-90 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col flex-1 p-8 gap-4">
                                            <div className="flex items-center gap-3 font-sans text-[12px] font-semibold tracking-widest uppercase text-[#2B2218]/40">
                                                {formatDate(article.pubDate)}
                                            </div>
                                            <h3 className="font-serif text-[22px] leading-[1.3] text-[#2B2218] group-hover:text-[#D27349] transition-colors line-clamp-3">
                                                {article.title}
                                            </h3>
                                            <p className="font-sans text-[15px] opacity-70 leading-[1.6] line-clamp-3 mt-auto pt-4 border-t border-[#2B2218]/5">
                                                {article.contentSnippet}
                                            </p>
                                        </div>
                                    </Link>
                                </FadeUp>
                            ))}
                        </FadeUpStaggerGroup>
                    </div>
                </section>
            )}

            {/* Promotional Campaign Injection */}
            <BookPromoCampaign />

            {/* General Grid */}
            <section className="py-24 px-6 md:px-12 bg-[#F0EBE3]">
                <div className="max-w-7xl mx-auto flex flex-col gap-12">

                    <FadeUp delay={0.1}>
                        <div className="w-full flex justify-between items-baseline border-b border-[#2B2218]/10 pb-6">
                            <h2 className="font-serif text-[32px] leading-tight text-[#2B2218]">
                                More Articles
                            </h2>
                        </div>
                    </FadeUp>

                    <FadeUpStaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentGridArticles.map((article, i) => (
                            <FadeUp delay={0.1 + (i % 3) * 0.1} key={article.id}>
                                <Link href={`/blog/newsletter/${article.slug}`} className="group flex flex-col gap-6 h-full">
                                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 bg-[#EBE4D8]/50 border border-[#2B2218]/5">
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
                                                <Image src="/images/substack-orange.png" alt="" width={50} height={50} className="object-contain" />
                                            </div>
                                        )}
                                        {article.videoIframe && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors z-10">
                                                <PlayCircle className="w-12 h-12 text-white opacity-90 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                        )}
                                        {!article.videoIframe && article.audioUrl && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors z-10">
                                                <Headphones className="w-12 h-12 text-white opacity-90 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="font-sans text-[12px] font-semibold tracking-widest uppercase text-[#D27349]/80">
                                            {formatDate(article.pubDate)}
                                        </div>
                                        <h3 className="font-serif text-[24px] leading-[1.3] text-[#2B2218] group-hover:text-[#D27349] transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="font-sans text-[15px] text-[#2B2218] opacity-70 leading-[1.6] line-clamp-2">
                                            {article.contentSnippet}
                                        </p>
                                    </div>
                                </Link>
                            </FadeUp>
                        ))}
                    </FadeUpStaggerGroup>
                </div>
            </section>

            <Newsletter />
            <Footer />
        </main>
    );
}
