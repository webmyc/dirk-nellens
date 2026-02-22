'use client';

import React from 'react';
import Image from 'next/image';

export function BookImageDivider() {
    return (
        <section className="relative w-full h-[60vh] md:h-[80vh]">
            <Image
                src="/images/book-2.png"
                alt="Understanding Our Energetic Architecture Book Interior"
                fill
                className="object-cover"
                sizes="100vw"
            />
            {/* Optional overlay if you want to darken the image slightly or add text later */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </section>
    );
}
