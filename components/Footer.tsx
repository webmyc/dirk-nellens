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
  return (
    <footer className="bg-[#F4EFE6] pt-16 pb-10 border-t border-[#2C2C2C]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Courses */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#2C2C2C]/45 text-[11px] uppercase tracking-widest font-medium">Courses</h4>
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-[#2C2C2C]/40 line-through decoration-[#2C2C2C]/25">Human Design Analysis</span>
              <span className="text-[#2C2C2C]/40 line-through decoration-[#2C2C2C]/25">Connection Chart Analysis</span>
              <span className="text-[#2C2C2C]/40 line-through decoration-[#2C2C2C]/25">Human Design & Personal Guidance</span>
              <Link href="/courses" className="text-[#D96C40] underline underline-offset-4 hover:text-[#c25a30] transition-colors">
                View All Courses
              </Link>
            </div>
          </div>

          {/* Sessions */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#2C2C2C]/45 text-[11px] uppercase tracking-widest font-medium">Human Design & Therapy Sessions</h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/sessions#chart-analysis" className="hover:text-[#D96C40] transition-colors">Personal Chart Analysis</Link>
              <Link href="/sessions#connection" className="hover:text-[#D96C40] transition-colors">Connection Chart Analysis</Link>
              <Link href="/sessions#guidance" className="hover:text-[#D96C40] transition-colors">Human Design & Personal Guidance</Link>
              <Link href="/sessions#opening-to-change" className="hover:text-[#D96C40] transition-colors">'Opening to Change' Session</Link>
              <Link href="/sessions" className="text-[#D96C40] underline underline-offset-4 hover:text-[#c25a30] transition-colors">
                View All Sessions
              </Link>
            </div>
          </div>

          {/* Media + About */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-[#2C2C2C]/45 text-[11px] uppercase tracking-widest font-medium">Media</h4>
              <div className="flex flex-col gap-3 text-sm">
                <Link href="#podcasts" className="hover:text-[#D96C40] transition-colors">Podcasts</Link>
                <Link href="#videos" className="hover:text-[#D96C40] transition-colors">Videos</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[#2C2C2C]/45 text-[11px] uppercase tracking-widest font-medium">About</h4>
              <div className="flex flex-col gap-3 text-sm">
                <Link href="/about" className="hover:text-[#D96C40] transition-colors">Dirk</Link>
                <Link href="/about#speaking" className="hover:text-[#D96C40] transition-colors">Speaking</Link>
                <Link href="/about#contact" className="hover:text-[#D96C40] transition-colors">Contact</Link>
              </div>
            </div>
          </div>

          {/* Writings */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#2C2C2C]/45 text-[11px] uppercase tracking-widest font-medium">Writings</h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/book" className="hover:text-[#D96C40] transition-colors">Books</Link>
              <Link href="https://substack.com" target="_blank" className="hover:text-[#D96C40] transition-colors">Articles on Substack</Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#2C2C2C]/45 text-[11px] uppercase tracking-widest font-medium">Social Links</h4>
            <div className="flex flex-wrap gap-2.5">
              {socialIcons.map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-[#2C2C2C]/20 flex items-center justify-center text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#2C2C2C]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2C2C2C]/35">
          <p>© {new Date().getFullYear()} Dirk Nellens. All rights reserved.</p>
          <div className="relative w-5 h-5 opacity-30">
            <Image src="/logo/logo-symbol-black.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}
