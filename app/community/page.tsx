import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FadeUp, FadeUpStaggerGroup } from '@/components/ui/FadeUp';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CheckCircle2, Video, Library, MessagesSquare } from 'lucide-react';
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

            {/* Benefits Section */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <FadeUp className="text-center mb-16 md:mb-24">
                        <p className="font-sans text-[13px] font-semibold tracking-[0.2em] uppercase text-[#C96A45] mb-6">The Paid Tier</p>
                        <h2 className="font-serif text-[42px] md:text-[56px] text-[#2B2218] leading-[1.1] tracking-[-0.01em]">
                            What's Included?
                        </h2>
                    </FadeUp>

                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <FadeUp delay={0.1} className="flex flex-col items-center text-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-[#EBE4D8] flex items-center justify-center text-[#C96A45]">
                                <Video className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-[24px] text-[#2B2218]">Two Live Zoom Calls</h3>
                            <p className="font-sans text-[#2B2218]/70 leading-[1.6]">
                                Every month, join me live. We dive into the current Neutrino Weather and evaluate how the cosmic shifts are directly influencing your specific body graph. Q&A included.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.2} className="flex flex-col items-center text-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-[#EBE4D8] flex items-center justify-center text-[#C96A45]">
                                <Library className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-[24px] text-[#2B2218]">Full Archive Access</h3>
                            <p className="font-sans text-[#2B2218]/70 leading-[1.6]">
                                Instantly unlock the entire back-catalog of premium essays, recorded audio reflections, and profound psychological deconditioning resources.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.3} className="flex flex-col items-center text-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-[#EBE4D8] flex items-center justify-center text-[#C96A45]">
                                <MessagesSquare className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-[24px] text-[#2B2218]">Community Comments</h3>
                            <p className="font-sans text-[#2B2218]/70 leading-[1.6]">
                                Engage deeply in the private comment sections. Connect with a community of individuals doing the grounded therapeutic work of living their designs.
                            </p>
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
