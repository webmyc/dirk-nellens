'use client';

import React, { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { ArrowRight } from 'lucide-react';

interface BookSessionButtonProps {
    variant?: 'primary' | 'outline' | 'text';
    className?: string;
    icon?: boolean;
}

export function BookSessionButton({ variant = 'primary', className = '', icon = false }: BookSessionButtonProps) {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                styles: { branding: { brandColor: "#D96C40" } },
                hideEventTypeDetails: false,
                layout: "month_view"
            });
        })();
    }, []);

    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium text-sm transition-all duration-300 transform";

    const variants = {
        primary: "bg-[#D96C40] text-white px-8 py-4 hover:bg-[#c25a30] shadow-md hover:shadow-lg hover:-translate-y-0.5",
        outline: "border border-[#2B2218]/30 text-[#2B2218] px-8 py-4 hover:bg-[#2B2218] hover:text-white hover:border-[#2B2218]",
        text: "text-[#D96C40] hover:text-[#c25a30] px-0 py-0 underline underline-offset-4"
    };

    return (
        <button
            data-cal-link="dirk-nellens"
            data-cal-config='{"layout":"month_view"}'
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            <span>Book a session</span>
            {icon && <ArrowRight className="w-4 h-4 ml-1" />}
        </button>
    );
}
