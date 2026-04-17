import Link from 'next/link';
import Image from 'next/image';

const socialIcons = [
  {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'YouTube',
    path: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z',
  },
  {
    label: 'Facebook',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'Substack',
    path: 'M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z',
  },
];

export default function Footer() {
  const headingClass = "text-[#D27349] text-[11px] uppercase tracking-[0.22em] font-medium";
  const linkClass = "text-[#2B2218] opacity-75 hover:opacity-100 hover:text-[#D27349] transition-all duration-200";

  return (
    <footer className="bg-[#F0EBE3] py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-20">
          {/* Courses */}
          <div className="flex flex-col gap-4">
            <h4 className={headingClass}>Courses</h4>
            <div className="flex flex-col gap-3 text-[15px]">
              <Link href="/courses" className="text-[#D27349] hover:text-[#b05c3b] transition-colors">
                View All Courses →
              </Link>
            </div>
          </div>

          {/* Sessions */}
          <div className="flex flex-col gap-4">
            <h4 className={headingClass}>Human Design & Therapy Sessions</h4>
            <div className="flex flex-col gap-3 text-[15px]">
              <Link href="/sessions#chart-analysis" className={linkClass}>Personal Chart Analysis</Link>
              <Link href="/sessions#connection" className={linkClass}>Connection Chart Analysis</Link>
              <Link href="/sessions#guidance" className={linkClass}>Human Design & Personal Guidance</Link>
              <Link href="/sessions#opening-to-change" className={linkClass}>'Opening to Change' Session</Link>
              <Link href="/sessions" className="text-[#D27349] hover:text-[#b05c3b] transition-colors mt-2">
                View All Sessions →
              </Link>
            </div>
          </div>

          {/* Media + About */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            <div className="flex flex-col gap-4">
              <h4 className={headingClass}>Media</h4>
              <div className="flex flex-col gap-3 text-[15px]">
                <Link href="#podcasts" className={linkClass}>Podcasts</Link>
                <Link href="#videos" className={linkClass}>Videos</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className={headingClass}>About</h4>
              <div className="flex flex-col gap-3 text-[15px]">
                <Link href="/about" className={linkClass}>Dirk</Link>
                <Link href="/about#speaking" className={linkClass}>Speaking</Link>
                <Link href="/about#contact" className={linkClass}>Contact</Link>
              </div>
            </div>
          </div>

          {/* Writings */}
          <div className="flex flex-col gap-4">
            <h4 className={headingClass}>Writings</h4>
            <div className="flex flex-col gap-3 text-[15px]">
              <Link href="/book" className={linkClass}>Books</Link>
              <Link href="https://reflectorsreflections.substack.com/" target="_blank" className={linkClass}>Articles on Substack</Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className={headingClass}>Social Links</h4>
            <div className="flex flex-wrap gap-4 mt-1">
              {socialIcons.map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-[#2B2218] opacity-75 hover:opacity-100 hover:text-[#D27349] hover:scale-115 transition-all duration-200"
                >
                  <svg className="w-[28px] h-[28px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#D27349]/20 pt-8 mt-12 flex flex-col items-center justify-center gap-2 text-[13px] text-[#2B2218]/50 text-center">
          <p>
            Bespoke site heart crafted by <a href="https://respira.cafe" target="_blank" rel="noopener noreferrer" className="hover:text-[#D27349] underline underline-offset-2 transition-colors">Mihai @ respira.cafe</a>. Thank you Sophia for the initial design.
          </p>
          <p>© {new Date().getFullYear()} Dirk Nellens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
