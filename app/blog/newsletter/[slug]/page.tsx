import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { getSubstackFeed } from '@/lib/substack';
import { notFound } from 'next/navigation';
import { FadeUp } from '@/components/ui/FadeUp';
import Newsletter from '@/components/Newsletter';
import Script from 'next/script';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

// Generate dynamic metadata for the article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const articles = await getSubstackFeed();
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return { title: 'Article Not Found | Dirk Nellens' };
    }

    return {
        title: `${article.title} | Dirk Nellens`,
        description: article.contentSnippet,
        alternates: {
            canonical: article.link, // Essential for SEO attribution to Substack
        },
        openGraph: {
            title: article.title,
            description: article.contentSnippet,
            url: article.link,
            images: article.coverImage ? [{ url: article.coverImage }] : [],
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const articles = await getSubstackFeed();
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        image: article.coverImage ? [article.coverImage] : [],
        datePublished: new Date(article.pubDate).toISOString(),
        author: [{
            '@type': 'Person',
            name: 'Dirk Nellens',
            url: 'https://dirk.respira.cafe/about'
        }],
        publisher: {
            '@type': 'Organization',
            name: 'Reflector\'s Reflections',
            logo: {
                '@type': 'ImageObject',
                url: 'https://dirk.respira.cafe/logo/logo-symbol-black.png'
            }
        }
    };

    return (
        <main className="min-h-screen flex flex-col pt-0 bg-white">
            <Navigation />

            {/* JSON-LD Schema */}
            <Script
                id="article-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="pb-24">
                {/* Article Hero */}
                <header className="relative pt-32 md:pt-40 pb-16 md:pb-24 mb-16 px-6 overflow-hidden bg-[#2B2218] text-[#F0EBE3]">
                    {article.coverImage && (
                        <div className="absolute inset-0 opacity-20 max-w-7xl mx-auto">
                            <Image
                                src={article.coverImage}
                                alt=""
                                fill
                                className="object-cover blur-[80px]"
                                priority
                            />
                        </div>
                    )}
                    <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
                        <FadeUp delay={0.1} className="w-full flex justify-center mb-6">
                            <Breadcrumbs items={[{ label: 'Blog', href: '/blog/newsletter' }, { label: article.title, href: `/blog/newsletter/${article.slug}` }]} className="text-white/60" />
                        </FadeUp>

                        <FadeUp delay={0.2}>
                            <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[76px] leading-[1.05] tracking-[-0.01em]">
                                {article.title}
                            </h1>
                        </FadeUp>

                        <FadeUp delay={0.3}>
                            <div className="flex items-center justify-center gap-4 font-sans text-[16px] text-[#F0EBE3]/70 mt-6 md:mt-8">
                                <time dateTime={new Date(article.pubDate).toISOString()}>{formatDate(article.pubDate)}</time>
                                <span>•</span>
                                <span>Dirk Nellens</span>
                            </div>
                        </FadeUp>

                        {/* Audio Player for Podcasts moved to Hero */}
                        {article.audioUrl && (
                            <FadeUp delay={0.4} className="w-full mt-10">
                                <div className="mb-8 w-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F0EBE3] p-6 md:p-8 rounded-[24px] shadow-lg flex flex-col items-center gap-4 max-w-2xl mx-auto">
                                    <div className="flex items-center gap-3 w-full justify-center text-center">
                                        <div className="flex flex-col">
                                            <span className="font-sans text-[12px] font-semibold tracking-widest uppercase text-[#FF9900]">Listen to the Podcast</span>
                                        </div>
                                    </div>
                                    <audio controls className="w-full mt-2 custom-audio-player">
                                        <source src={article.audioUrl} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            </FadeUp>
                        )}
                    </div>
                </header>

                {/* Article Content Container */}
                <FadeUp delay={0.4}>
                    <div className="max-w-[720px] mx-auto px-6">

                        {/* Substack Attribution Banner */}
                        <div className="mb-12 p-6 bg-[#F7F4EF] rounded-[16px] border border-[#C96A45]/20 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                            <div className="w-12 h-12 bg-[#C96A45] rounded-full flex items-center justify-center flex-shrink-0">
                                <Image src="/images/substack-orange.png" alt="Substack" width={24} height={24} className="brightness-0 invert object-contain" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-serif text-[18px] text-[#2B2218]">
                                    Originally published on Substack
                                </p>
                                <p className="font-sans text-[14px] text-[#2B2218]/70 leading-relaxed">
                                    This article is part of Dirk's ongoing newsletter <em>Reflector's Reflections</em>. You can read, comment, and engage with the original post on Substack.
                                </p>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-[14px] text-[#C96A45] font-medium hover:underline w-fit mx-auto sm:mx-0 mt-1"
                                >
                                    View original article →
                                </a>
                            </div>
                        </div>

                        {/* Injected Content */}
                        <div
                            className="prose prose-xl md:prose-2xl prose-stone max-w-none 
                         prose-headings:font-serif prose-headings:text-[#2B2218] prose-headings:leading-tight
                         prose-p:font-sans prose-p:text-[#2B2218] prose-p:opacity-[0.88] prose-p:leading-[2.1] prose-p:text-[22px] md:prose-p:text-[25px] prose-p:tracking-tight prose-p:font-light
                         prose-a:text-[#C96A45] prose-a:underline prose-a:underline-offset-4
                         prose-strong:font-semibold prose-strong:text-[#2B2218]
                         prose-blockquote:font-serif prose-blockquote:text-[#2B2218] prose-blockquote:italic prose-blockquote:border-l-4 prose-blockquote:border-[#C96A45] prose-blockquote:bg-[#F7F4EF] prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-2xl prose-blockquote:text-[28px] prose-blockquote:my-16 prose-blockquote:leading-snug
                         prose-img:rounded-[24px] prose-img:w-full prose-img:shadow-sm prose-img:my-16
                         prose-iframe:w-full prose-iframe:aspect-video prose-iframe:rounded-[24px] prose-iframe:shadow-sm prose-iframe:my-16 mt-16"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>
                </FadeUp>
            </article>

            {/* Recommended Articles or CTA */}
            <section className="bg-[#F0EBE3] py-24 border-t border-[#2B2218]/5">
                <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">
                    <h2 className="font-serif text-[36px] md:text-[48px] text-[#2B2218]">
                        Continue exploring
                    </h2>
                    <p className="font-sans text-[18px] text-[#2B2218]/70 max-w-xl leading-relaxed">
                        If this reflection resonated with you, consider subscribing to receive weekly insights directly in your inbox, or explore my comprehensive book.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 mt-4">
                        <a
                            href="https://reflectorsreflections.substack.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#2B2218] text-white px-8 py-4 rounded-full font-sans font-medium text-[15px] hover:bg-black transition-colors"
                        >
                            Subscribe on Substack
                        </a>
                        <Link
                            href="/book"
                            className="bg-[#C96A45] text-white px-8 py-4 rounded-full font-sans font-medium text-[15px] hover:bg-[#b05c3b] transition-colors"
                        >
                            View the Book
                        </Link>
                    </div>
                </div>
            </section>

            <Newsletter />
            <Footer />
        </main>
    );
}
