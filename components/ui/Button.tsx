'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
    magnetic?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    icon?: boolean;
}

export function Button({
    children,
    href,
    variant = 'primary',
    className = '',
    magnetic = true,
    onClick,
    type = 'button',
    icon = true,
}: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (!magnetic || !buttonRef.current) return;

        // Magnetic effect calculation (max 8px offset)
        const { clientX, clientY } = e;
        const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.15;
        const y = (clientY - (top + height / 2)) * 0.15;

        // Clamp values to roughly max 8px
        const clampedX = Math.max(-8, Math.min(8, x));
        const clampedY = Math.max(-8, Math.min(8, y));

        setPosition({ x: clampedX, y: clampedY });
    };

    const handleMouseLeave = () => {
        if (!magnetic) return;
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative inline-flex items-center justify-center font-sans transition-all duration-400 ease-out overflow-hidden group tracking-wide";
    const sizeStyles = "h-[56px] px-[36px] rounded-full text-[17px]";

    const variants = {
        primary: "bg-[#C96A45] text-[#F0EBE3]",
        // Hover effect for Primary CTA: dark charcoal fill slides in from left
        secondary: "bg-transparent border-[1.5px] border-[#2B2218] text-[#2C2C2C]",
        outline: "bg-transparent border-[1.5px] border-[#F0EBE3] text-[#F0EBE3]",
    };

    const content = (
        <>
            <span className="relative z-10 flex items-center gap-2">
                {children}
                {icon && (
                    <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-[3px]" />
                )}
            </span>
            {variant === 'primary' && (
                <span className="absolute inset-0 z-0 bg-[#2B2218] translate-x-[-100%] transition-transform duration-400 ease-out group-hover:translate-x-0 rounded-full" />
            )}
            {variant === 'secondary' && (
                <span className="absolute inset-0 z-0 bg-[#2B2218] translate-x-[-100%] transition-transform duration-400 ease-out group-hover:translate-x-0 rounded-full" />
            )}
            {variant === 'outline' && (
                <span className="absolute inset-0 z-0 bg-[#F0EBE3] translate-x-[-100%] transition-transform duration-400 ease-out group-hover:translate-x-0 rounded-full" />
            )}
        </>
    );

    // Group hover for text color changes
    const parentClasses = `${baseStyles} ${sizeStyles} ${variants[variant]} ${className} ${variant === 'secondary' ? 'hover:text-[#F0EBE3]' : ''
        } ${variant === 'outline' ? 'hover:text-[#2B2218]' : ''}`;

    if (href) {
        if (href.startsWith('http')) {
            return (
                <motion.a
                    ref={buttonRef as any}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={parentClasses}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    animate={{ x: position.x, y: position.y }}
                    transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                >
                    {content}
                </motion.a>
            );
        }
        return (
            <motion.div
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
                <Link
                    ref={buttonRef as any}
                    href={href}
                    className={parentClasses}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {content}
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.button
            ref={buttonRef as any}
            type={type}
            onClick={onClick}
            className={parentClasses}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {content}
        </motion.button>
    );
}
