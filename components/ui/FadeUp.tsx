'use client';

import React, { useRef, useEffect, useState } from 'react';

interface FadeUpProps {
    children: React.ReactNode;
    delay?: number; // In seconds
    className?: string;
    staggerChildren?: boolean;
}

export function FadeUp({ children, delay = 0, className = '', staggerChildren = false }: FadeUpProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check for prefers-reduced-motion
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        // eslint-disable-next-line
        setPrefersReducedMotion(mediaQuery.matches);

        // Fallback visible if reduced motion is preferred
        if (mediaQuery.matches) {
            setIsVisible(true);
            return;
        }

        const currentRef = domRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Once visible, stop observing to keep it visible
                        if (currentRef) observer.unobserve(currentRef);
                    }
                });
            },
            { threshold: 0.15 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    const baseStyle = prefersReducedMotion
        ? {}
        : {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: `all 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
            willChange: 'opacity, transform',
        };

    return (
        <div ref={domRef} style={baseStyle as React.CSSProperties} className={`fade-up-wrapper ${className}`}>
            {children}
        </div>
    );
}

export function FadeUpStaggerGroup({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    // Utility wrapper to apply staggered delays to children
    // Assumes children are individual FadeUp elements
    return <div className={className}>{children}</div>;
}
