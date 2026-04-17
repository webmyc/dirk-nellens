'use client';

import React, { useState } from 'react';
import { FadeUp } from '../ui/FadeUp';
import { Button } from '../ui/Button';

export function NewsletterHome() {
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implementation for newsletter signup
        console.log('Subscribing:', email);
        setEmail('');
    };

    return (
        <section className="py-[120px] bg-[#F0EBE3] px-6">
            <div className="max-w-[720px] mx-auto text-center flex flex-col items-center">

                <FadeUp delay={0.1}>
                    <h2 className="font-serif text-[48px] md:text-[56px] leading-[1.1] text-[#2B2218] mb-12">
                        Receive updates on courses, writings and Human Design
                    </h2>
                </FadeUp>

                <FadeUp delay={0.2} className="w-full">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-[580px]">
                            <div className="relative w-full max-w-[380px]">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Your email address"
                                    required
                                    className="w-full bg-transparent border-none outline-none text-[18px] text-[#2B2218] placeholder-[#2B2218]/40 py-3 pb-3 focus:ring-0 peer"
                                />
                                {/* Custom animated underline */}
                                <div
                                    className={`absolute bottom-0 left-0 w-full h-[2px] transition-colors duration-250 ${isFocused ? 'bg-[#D27349]' : 'bg-[#2B2218]/30'
                                        }`}
                                />
                            </div>

                            <Button type="submit" variant="primary" className="w-full md:w-auto mt-4 md:mt-0 px-8 py-3">
                                Sign up
                            </Button>
                        </div>

                        <p className="font-sans text-[13px] text-[#2B2218]/50 mt-4 leading-none">
                            No spam. Unsubscribe anytime.
                        </p>
                    </form>
                </FadeUp>

            </div>
        </section>
    );
}
