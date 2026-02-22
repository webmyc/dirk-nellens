import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FadeUp, FadeUpStaggerGroup } from '@/components/ui/FadeUp';
import Image from 'next/image';
import { Podcast, Headphones } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Podcasts | Dirk Nellens',
    description: 'Listen to Dirk discuss the mechanics of Human Design in various interviews.',
    openGraph: {
        title: 'Podcasts | Dirk Nellens',
        description: 'Listen to Dirk discuss the mechanics of Human Design in various interviews.',
        url: 'https://dirknellens.com/podcasts',
        siteName: 'Dirk Nellens',
        images: [
            {
                url: '/images/dirk-3.jpg',
                width: 1200,
                height: 630,
            }
        ],
        locale: 'en_US',
        type: 'website',
    }
};

export default function PodcastsPage() {
    return (
        <main className="min-h-screen bg-[#F0EBE3]">
            <Navigation />
            {/* Header section with padding to account for fixed nav */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <Breadcrumbs
                    items={[
                        { label: 'Media', href: '/#media' },
                        { label: 'Podcasts', href: '/podcasts' }
                    ]}
                    className="mb-8"
                />

                <FadeUp className="max-w-3xl">
                    <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] text-[#2B2218] leading-[1.05] tracking-[-0.02em] mb-6">
                        Podcasts & Audio
                    </h1>
                    <p className="font-sans text-[18px] md:text-[20px] text-[#2B2218]/70 leading-[1.6]">
                        Listen to conversations and reflections exploring the mechanics of Human Design, therapeutic deconditioning, and how we navigate the cosmic weather.
                    </p>
                </FadeUp>
            </section>

            <section className="py-16 bg-white border-t border-[#2B2218]/10 pb-32 flex-grow">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
                    <FadeUpStaggerGroup className="grid md:grid-cols-3 gap-8">
                        {/* Substack Panel */}
                        <FadeUp delay={0.1}>
                            <a href="https://reflectorsreflections.substack.com/podcast" target="_blank" rel="noopener noreferrer" className="group block bg-[#F7F4EF] rounded-[24px] p-8 h-full shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 border border-[#2B2218]/10 text-[#2B2218]">
                                <div className="w-14 h-14 bg-[#C96A45] text-white rounded-full flex items-center justify-center mb-8 relative">
                                    <Image src="/images/substack-orange.png" alt="Substack" width={24} height={24} className="brightness-0 invert" />
                                </div>
                                <h3 className="font-serif text-[28px] mb-3">Reflector's Reflections</h3>
                                <p className="font-sans text-[15px] opacity-70 mb-8 line-clamp-3">
                                    The native home for all my audio content, including weekly Neutrino Weather and deep-dive reflections.
                                </p>
                                <div className="font-sans font-medium text-[#C96A45] flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Listen on Substack <span>&rarr;</span>
                                </div>
                            </a>
                        </FadeUp>

                        {/* Spotify Panel */}
                        <FadeUp delay={0.2}>
                            <a href="https://open.spotify.com/show/6uezr2HxhrhqLNuJoLmCnH?si=16a58c52e8b54f54" target="_blank" rel="noopener noreferrer" className="group block bg-[#1ed760]/10 rounded-[24px] p-8 h-full shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 border border-[#1ed760]/20 text-[#2B2218]">
                                <div className="w-14 h-14 bg-[#1ed760] text-white rounded-full flex items-center justify-center mb-8">
                                    {/* Spotify Icon SVG */}
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-[28px] mb-3">Spotify</h3>
                                <p className="font-sans text-[15px] opacity-70 mb-8 line-clamp-3">
                                    Listen to my podcast directly on Spotify, featuring insights, interviews, and human design reflections.
                                </p>
                                <div className="font-sans font-medium text-[#1ed760] flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Open in Spotify <span>&rarr;</span>
                                </div>
                            </a>
                        </FadeUp>

                        {/* Apple Podcasts Panel */}
                        <FadeUp delay={0.3}>
                            <a href="https://podcasts.apple.com/us/podcast/human-design-reflectors-reflections-with-dirk-nellens/id1731551459" target="_blank" rel="noopener noreferrer" className="group block bg-[#b52d9a]/10 rounded-[24px] p-8 h-full shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 border border-[#b52d9a]/20 text-[#2B2218]">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#b52d9a] to-[#592cb5] text-white rounded-full flex items-center justify-center mb-8">
                                    <Podcast className="w-7 h-7" />
                                </div>
                                <h3 className="font-serif text-[28px] mb-3">Apple Podcasts</h3>
                                <p className="font-sans text-[15px] opacity-70 mb-8 line-clamp-3">
                                    Listen to my guest features and interviews on the Apple Podcasts platform.
                                </p>
                                <div className="font-sans font-medium text-[#b52d9a] flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Listen on Apple <span>&rarr;</span>
                                </div>
                            </a>
                        </FadeUp>
                    </FadeUpStaggerGroup>

                    {/* Featured Spotify Episodes */}
                    <FadeUp delay={0.4}>
                        <div className="pt-24 pb-8 flex flex-col items-center max-w-3xl mx-auto text-center border-t border-[#2B2218]/10 mt-8">
                            <h2 className="font-serif text-[36px] md:text-[44px] text-[#2B2218] mb-4">
                                Featured Episodes
                            </h2>
                            <p className="font-sans text-[18px] text-[#2B2218] opacity-[0.85] leading-[1.6]">
                                Dive straight into a few of my most insightful episodes directly from the page.
                            </p>
                        </div>
                    </FadeUp>

                    <FadeUpStaggerGroup className="grid md:grid-cols-3 gap-8 pb-16">
                        <FadeUp delay={0.1}>
                            <iframe
                                data-testid="embed-iframe"
                                style={{ borderRadius: '12px' }}
                                src="https://open.spotify.com/embed/episode/24KJfAhoLmYMjghmHhJkQ8?utm_source=generator"
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                className="shadow-lg"
                            ></iframe>
                        </FadeUp>
                        <FadeUp delay={0.2}>
                            <iframe
                                data-testid="embed-iframe"
                                style={{ borderRadius: '12px' }}
                                src="https://open.spotify.com/embed/episode/3YqlkvJmRvXQBcTXIxeWMf?utm_source=generator"
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                className="shadow-lg"
                            ></iframe>
                        </FadeUp>
                        <FadeUp delay={0.3}>
                            <iframe
                                data-testid="embed-iframe"
                                style={{ borderRadius: '12px' }}
                                src="https://open.spotify.com/embed/episode/6aAbvTqXG3PR2LQ8Ia7Fsm?utm_source=generator"
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                className="shadow-lg"
                            ></iframe>
                        </FadeUp>
                    </FadeUpStaggerGroup>
                </div>
            </section>
            <Footer />
        </main>
    );
}
