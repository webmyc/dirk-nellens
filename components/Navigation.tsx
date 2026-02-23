'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

const sessions = [
  { label: 'Human Design Personal Chart Analysis', href: '/sessions#chart-analysis' },
  { label: 'Human Design Connection Chart Analysis', href: '/sessions#connection' },
  { label: "Human Design & Personal Guidance", href: '/sessions#guidance' },
  { label: "'Opening to Change' Session", href: '/sessions#opening-to-change' },
  { label: 'Codependency & Inner Child Healing', href: '/sessions#codependency' },
  { label: 'Couples Therapy Session', href: '/sessions#couples' },
];

const primaryLinks = [
  { label: 'Reflections', href: '/blog/newsletter' },
  { label: 'Podcasts', href: '/podcasts' },
  { label: 'Inner Circle', href: '/community' },
  { label: 'About', href: '/about' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('sessions');
  const [scrollProgress, setScrollProgress] = useState(0);

  const pathname = usePathname();
  const darkHeroPages = ['/', '/about', '/courses', '/sessions', '/community'];
  const isDarkHero = darkHeroPages.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        setScrollProgress((scrollTop / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleAccordion = (key: string) =>
    setOpenAccordion(prev => (prev === key ? null : key));

  const closeMobile = () => setMobileOpen(false);
  const isActivePath = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out border-b ${isScrolled
          ? 'bg-[#F7F4EF]/95 backdrop-blur-xl border-[#2B2218]/10 shadow-[0_8px_30px_rgba(43,34,24,0.08)] py-2.5 text-[#2B2218]'
          : isDarkHero
            ? 'bg-gradient-to-b from-black/35 to-transparent border-transparent py-4 text-white'
            : 'bg-[#F7F4EF]/80 backdrop-blur-md border-[#2B2218]/8 py-3.5 text-[#2B2218]'
          }`}
      >
        <div
          className="absolute top-0 left-0 h-[2px] bg-[#C96A45] z-[60]"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 flex items-center justify-between relative mt-[2px]">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`relative flex-shrink-0 transition-all duration-300 ease-in-out ${isScrolled ? 'w-[50px] h-[50px]' : 'w-[54px] h-[54px] md:w-[68px] md:h-[68px]'}`}
            >
              <Image
                src={isDarkHero && !isScrolled ? "/logo/logo-symbol-white.png" : "/logo/logo-symbol-black.png"}
                alt="Dirk Nellens logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-serif tracking-[0.01em] transition-all duration-300 ${isScrolled ? 'text-[1.28rem]' : 'text-[1.38rem] md:text-[1.52rem]'}`}>
                Dirk Nellens
              </span>
              <span className={`font-sans text-[10px] uppercase tracking-[0.22em] mt-1 transition-opacity ${isDarkHero && !isScrolled ? 'opacity-75' : 'opacity-60'}`}>
                Human Design
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center text-[15px] font-sans tracking-tight">
            <div className="flex items-center gap-5 xl:gap-7">
              <DesktopDropdown
                label="Online Courses"
                isScrolled={isScrolled}
                isDarkHero={isDarkHero}
                active={isActivePath('/courses')}
              >
                <DropdownLink href="/courses">View All Courses</DropdownLink>
              </DesktopDropdown>

              {primaryLinks.map((link) => (
                <DesktopNavLink
                  key={link.href}
                  href={link.href}
                  isActive={isActivePath(link.href)}
                  isScrolled={isScrolled}
                  isDarkHero={isDarkHero}
                >
                  {link.label}
                </DesktopNavLink>
              ))}
            </div>

            <div className={`mx-5 xl:mx-6 h-7 w-px ${isDarkHero && !isScrolled ? 'bg-white/25' : 'bg-[#2B2218]/12'}`} />

            <DesktopDropdown
              label="Sessions"
              isScrolled={isScrolled}
              isDarkHero={isDarkHero}
              active={isActivePath('/sessions')}
              alignRight
              pill
            >
              {sessions.map(s => (
                <DropdownLink key={s.href} href={s.href}>{s.label}</DropdownLink>
              ))}
              <DropdownLink href="/sessions" accent>View All Sessions</DropdownLink>
            </DesktopDropdown>

            <Link
              href="/book"
              className={`ml-3 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[15px] font-semibold tracking-[0.01em] transition-all duration-300 ${isDarkHero && !isScrolled
                ? 'bg-[#C96A45] text-[#F7F4EF] hover:bg-[#b45f3d] shadow-[0_10px_24px_rgba(24,12,6,0.35)]'
                : 'bg-[#C96A45] text-[#F7F4EF] hover:bg-[#b45f3d] shadow-[0_8px_18px_rgba(201,106,69,0.28)]'
                }`}
            >
              The Book
            </Link>
          </nav>

          <button
            className={`lg:hidden p-2 transition-colors ${isDarkHero && !isScrolled ? 'text-white hover:text-white/80' : 'text-[#2C2C2C] hover:text-[#D96C40]'}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {
          mobileOpen && (
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
                    href="/blog/newsletter"
                    className="border border-[#2C2C2C]/12 rounded-2xl px-5 py-4 font-sans text-[#2C2C2C] hover:border-[#D96C40] hover:text-[#D96C40] transition-colors bg-white/40"
                    onClick={closeMobile}
                  >
                    Substack
                  </Link>

                  <Link
                    href="/podcasts"
                    className="border border-[#2C2C2C]/12 rounded-2xl px-5 py-4 font-sans text-[#2C2C2C] hover:border-[#D96C40] hover:text-[#D96C40] transition-colors bg-white/40"
                    onClick={closeMobile}
                  >
                    Podcasts
                  </Link>

                  <Link
                    href="/community"
                    className="border border-[#2C2C2C]/12 rounded-2xl px-5 py-4 font-sans text-[#2C2C2C] hover:border-[#D96C40] hover:text-[#D96C40] transition-colors bg-white/40"
                    onClick={closeMobile}
                  >
                    Community
                  </Link>

                  <Link
                    href="/about"
                    className="border border-[#2C2C2C]/12 rounded-2xl px-5 py-4 font-sans text-[#2C2C2C] hover:border-[#D96C40] hover:text-[#D96C40] transition-colors bg-white/40"
                    onClick={closeMobile}
                  >
                    About
                  </Link>

                  <Link
                    href="/book"
                    className="border border-[#2C2C2C]/12 rounded-2xl px-5 py-4 mt-2 font-sans text-[#F0EBE3] bg-[#C96A45] font-semibold text-center hover:bg-[#b05c3b] hover:shadow-md transition-all duration-300 shadow-sm"
                    onClick={closeMobile}
                  >
                    The Book
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
          )
        }
      </AnimatePresence >
    </>
  );
}

function DesktopDropdown({
  label,
  children,
  isScrolled,
  isDarkHero,
  alignRight,
  pill,
  active,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  isScrolled: boolean;
  isDarkHero?: boolean;
  alignRight?: boolean;
  pill?: boolean;
  active?: boolean;
}) {
  const isWhite = isDarkHero && !isScrolled;
  const triggerClass = pill
    ? isWhite
      ? `px-[18px] py-2 rounded-full border transition-all duration-300 ${active ? 'border-white/70 bg-white/15 text-white' : 'border-white/40 hover:border-white/70 hover:bg-white/10 text-white'}`
      : `px-[18px] py-2 rounded-full border transition-all duration-300 ${active ? 'border-[#C96A45]/55 bg-[#C96A45]/12 text-[#2B2218]' : 'border-[#2B2218]/14 bg-[#2B2218]/5 hover:border-[#C96A45]/45 hover:bg-[#C96A45]/8 text-[#2B2218]'}`
    : isWhite
      ? `relative py-1 text-white/90 hover:text-white transition-colors duration-200 ${active ? 'text-white' : ''}`
      : `relative py-1 text-[#2B2218]/90 hover:text-[#2B2218] transition-colors duration-200 ${active ? 'text-[#2B2218]' : ''}`;
  return (
    <div className={`relative group/dropdown ${pill ? '' : 'py-1'} cursor-pointer`}>
      <div className={`flex items-center gap-1.5 font-medium ${triggerClass}`}>
        <span>{label}</span>
        <ChevronDown className={`w-3.5 h-3.5 group-hover/dropdown:rotate-180 transition-transform duration-200 ${isWhite ? 'text-white/80' : 'text-[#2B2218]/55'}`} />
      </div>
      {!pill && (
        <span
          className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-current origin-left transition-transform duration-300 ease-out ${active ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover/dropdown:scale-x-100'}`}
        />
      )}
      <div className={`absolute top-full flex ${alignRight ? 'right-0 justify-end' : 'left-0 justify-start'} mt-[2px] pt-4 min-w-[240px] opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 translate-y-1 group-hover/dropdown:translate-y-0`}>
        <div className="bg-[#F7F4EF]/95 backdrop-blur-md shadow-xl rounded-2xl py-2 px-2 border border-[#2B2218]/5 text-[#2B2218] text-left min-w-[260px]">
          {children}
        </div>
      </div>
    </div>
  );
}

function DesktopNavLink({
  href,
  children,
  isActive,
  isScrolled,
  isDarkHero,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  isScrolled: boolean;
  isDarkHero?: boolean;
}) {
  const isWhite = isDarkHero && !isScrolled;
  return (
    <Link
      href={href}
      className={`group relative py-1 font-medium transition-colors duration-200 ${isWhite ? 'text-white/85 hover:text-white' : 'text-[#2B2218]/90 hover:text-[#2B2218]'} ${isActive ? (isWhite ? 'text-white' : 'text-[#2B2218]') : ''}`}
    >
      {children}
      <span
        className={`absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-current origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
      />
    </Link>
  );
}

function DropdownLink({ href, children, accent }: { href: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <Link
      href={href}
      className={`block py-2.5 px-3 text-[15px] rounded-xl transition-colors ${accent
        ? 'text-[#C96A45] font-medium hover:bg-[#C96A45]/10'
        : 'hover:text-[#C96A45] hover:bg-[#2B2218]/5'
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
