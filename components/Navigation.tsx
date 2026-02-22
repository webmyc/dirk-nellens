'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const sessions = [
  { label: 'Human Design Personal Chart Analysis', href: '/sessions#chart-analysis' },
  { label: 'Human Design Connection Chart Analysis', href: '/sessions#connection' },
  { label: "Human Design & Personal Guidance", href: '/sessions#guidance' },
  { label: "'Opening to Change' Session", href: '/sessions#opening-to-change' },
  { label: 'Codependency & Inner Child Healing', href: '/sessions#codependency' },
  { label: 'Couples Therapy Session', href: '/sessions#couples' },
];

const media = [
  { label: 'Podcasts', href: '#podcasts' },
  { label: 'Videos', href: '#videos' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('sessions');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleAccordion = (key: string) =>
    setOpenAccordion(prev => (prev === key ? null : key));

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F9F6F0]/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 relative flex-shrink-0">
              <Image
                src="/logo/logo-symbol-black.png"
                alt="Dirk Nellens logo"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-[1.1rem] font-normal tracking-wide text-[#2C2C2C]">
                Dirk Nellens
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#2C2C2C]/55 mt-0.5">
                Human Design
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-sans font-normal text-[#2C2C2C]">
            <DesktopDropdown label="Online Courses">
              <DropdownLink href="/courses">View All Courses</DropdownLink>
            </DesktopDropdown>

            <DesktopDropdown label="Human Design & Therapy Sessions">
              {sessions.map(s => (
                <DropdownLink key={s.href} href={s.href}>{s.label}</DropdownLink>
              ))}
              <DropdownLink href="/sessions" accent>View All Sessions</DropdownLink>
            </DesktopDropdown>

            <Link href="/book" className="hover:text-[#D96C40] transition-colors duration-200">
              Book
            </Link>

            <DesktopDropdown label="Media">
              {media.map(m => (
                <DropdownLink key={m.href} href={m.href}>{m.label}</DropdownLink>
              ))}
            </DesktopDropdown>

            <Link href="/about" className="hover:text-[#D96C40] transition-colors duration-200">
              About
            </Link>

            <a
              href="https://substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#2C2C2C]/20 rounded-full px-4 py-2 hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] transition-all duration-300 group/sub"
            >
              Articles on Substack
              <div className="relative w-3.5 h-3.5 flex-shrink-0">
                <Image
                  src="/images/substack-orange.png"
                  alt="Substack"
                  fill
                  className="object-contain group-hover/sub:brightness-0 group-hover/sub:invert transition-all"
                />
              </div>
            </a>
          </nav>

          <button
            className="lg:hidden p-2 text-[#2C2C2C] hover:text-[#D96C40] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-0 z-[60] bg-[#F4EFE6] overflow-y-auto"
          >
            <div className="px-6 pt-6 pb-12">
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <Link href="/" className="flex items-center gap-3" onClick={closeMobile}>
                  <div className="w-9 h-9 relative">
                    <Image src="/logo/logo-symbol-black.png" alt="Dirk Nellens" fill className="object-contain" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-serif text-[1.05rem] text-[#2C2C2C]">Dirk Nellens</span>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-[#2C2C2C]/55 mt-0.5">Human Design</span>
                  </div>
                </Link>
                <button
                  onClick={closeMobile}
                  className="text-[#D96C40] p-1 hover:scale-110 transition-transform"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Accordion items */}
              <div className="flex flex-col gap-2.5">
                <AccordionItem
                  label="Online Courses"
                  isOpen={openAccordion === 'courses'}
                  onToggle={() => toggleAccordion('courses')}
                >
                  <Link href="/courses" className="block py-1 text-sm text-[#2C2C2C]/65 hover:text-[#D96C40] transition-colors" onClick={closeMobile}>
                    View All Courses
                  </Link>
                </AccordionItem>

                <AccordionItem
                  label="Human Design & Therapy Sessions"
                  isOpen={openAccordion === 'sessions'}
                  onToggle={() => toggleAccordion('sessions')}
                  highlighted
                >
                  {sessions.map(s => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block py-1 text-sm text-[#2C2C2C]/65 hover:text-[#D96C40] transition-colors"
                      onClick={closeMobile}
                    >
                      {s.label}
                    </Link>
                  ))}
                </AccordionItem>

                <Link
                  href="/book"
                  className="border border-[#2C2C2C]/12 rounded-2xl px-5 py-4 font-sans text-[#2C2C2C] hover:border-[#D96C40] hover:text-[#D96C40] transition-colors bg-white/40"
                  onClick={closeMobile}
                >
                  Book
                </Link>

                <Link
                  href="https://substack.com"
                  className="border border-[#2C2C2C]/12 rounded-2xl px-5 py-4 font-sans text-[#2C2C2C] hover:border-[#D96C40] hover:text-[#D96C40] transition-colors bg-white/40"
                  onClick={closeMobile}
                >
                  Articles on Substack
                </Link>

                <AccordionItem
                  label="Media"
                  isOpen={openAccordion === 'media'}
                  onToggle={() => toggleAccordion('media')}
                >
                  <Link href="#podcasts" className="block py-1 text-sm text-[#2C2C2C]/65 hover:text-[#D96C40] transition-colors" onClick={closeMobile}>Podcasts</Link>
                  <Link href="#videos" className="block py-1 text-sm text-[#2C2C2C]/65 hover:text-[#D96C40] transition-colors" onClick={closeMobile}>Videos</Link>
                </AccordionItem>

                <Link
                  href="/about"
                  className="border border-[#2C2C2C]/12 rounded-2xl px-5 py-4 font-sans text-[#2C2C2C] hover:border-[#D96C40] hover:text-[#D96C40] transition-colors bg-white/40"
                  onClick={closeMobile}
                >
                  About
                </Link>
              </div>

              {/* Social icons */}
              <div className="flex gap-3 justify-center mt-12">
                {[
                  { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { label: 'YouTube', path: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
                  { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { label: 'Substack', path: 'M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z' },
                ].map(({ label, path }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-11 h-11 bg-[#D96C40] rounded-full flex items-center justify-center text-white hover:bg-[#c25a30] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DesktopDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 hover:text-[#D96C40] transition-colors duration-200 py-2">
        {label}
        <ChevronDown className="w-3.5 h-3.5 mt-0.5 group-hover:rotate-180 transition-transform duration-200" />
      </button>
      <div className="absolute top-full left-0 mt-1 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl py-2 px-2 min-w-[230px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 border border-black/5">
        {children}
      </div>
    </div>
  );
}

function DropdownLink({ href, children, accent }: { href: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <Link
      href={href}
      className={`block py-2 px-3 text-sm rounded-xl transition-colors ${
        accent
          ? 'text-[#D96C40] font-medium hover:bg-[#D96C40]/5'
          : 'text-[#2C2C2C] hover:text-[#D96C40] hover:bg-[#F9F6F0]'
      }`}
    >
      {children}
    </Link>
  );
}

function AccordionItem({
  label,
  isOpen,
  onToggle,
  children,
  highlighted,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <div className={`rounded-2xl overflow-hidden bg-white/40 border transition-colors ${highlighted ? 'border-[#D96C40]/40' : 'border-[#2C2C2C]/12'}`}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left font-sans text-[#2C2C2C] hover:text-[#D96C40] transition-colors"
        onClick={onToggle}
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#D96C40] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 flex flex-col gap-2.5 border-t border-[#2C2C2C]/8 pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
