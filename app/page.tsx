'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#F9F6F0]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#2C2C2C] flex items-center justify-center overflow-hidden">
               {/* Placeholder for Logo */}
               <div className="w-full h-full bg-[url('https://picsum.photos/100/100?random=1')] bg-cover bg-center grayscale opacity-80 group-hover:scale-110 transition-transform duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-semibold text-lg leading-tight tracking-wide">Dirk Nellens</span>
              <span className="text-[10px] uppercase tracking-widest text-[#2C2C2C]/70">Human Design</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#D96C40] transition-colors">
              Online Courses <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#D96C40] transition-colors">
              Human Design & Therapy Sessions <ChevronDown className="w-4 h-4" />
            </div>
            <Link href="#book" className="hover:text-[#D96C40] transition-colors">Book</Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#D96C40] transition-colors">
              Media <ChevronDown className="w-4 h-4" />
            </div>
            <Link href="#about" className="hover:text-[#D96C40] transition-colors">About</Link>
            <Link href="#substack" className="flex items-center gap-2 border border-[#2C2C2C]/20 rounded-full px-4 py-2 hover:bg-[#2C2C2C] hover:text-white transition-all duration-300">
              Articles on Substack
              <div className="w-3 h-3 bg-[#D96C40] rounded-sm"></div>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-[#F9F6F0] pt-24 px-6 flex flex-col gap-6 text-lg font-serif"
        >
          <Link href="#courses" onClick={() => setIsMobileMenuOpen(false)}>Online Courses</Link>
          <Link href="#sessions" onClick={() => setIsMobileMenuOpen(false)}>Human Design & Therapy Sessions</Link>
          <Link href="#book" onClick={() => setIsMobileMenuOpen(false)}>Book</Link>
          <Link href="#media" onClick={() => setIsMobileMenuOpen(false)}>Media</Link>
          <Link href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="#substack" onClick={() => setIsMobileMenuOpen(false)} className="text-[#D96C40]">Articles on Substack</Link>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-[#D96C40] text-white">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-light">
              'Understanding our Energetic Architecture'<br/>
              is now available on Amazon
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href="#shop" className="bg-white text-[#2C2C2C] px-8 py-4 rounded-full font-medium hover:bg-[#F9F6F0] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-300">
                Shop the book
              </Link>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center gap-4 mt-8">
              <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
              </div>
              <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] md:h-[600px] flex items-center justify-center perspective-1000"
          >
            {/* Book Mockup Placeholder */}
            <div className="relative w-2/3 h-4/5 bg-[#1A1A1A] rounded-r-xl shadow-2xl transform rotate-y-[-15deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0 border-l-[16px] border-[#333]">
              <div className="absolute inset-0 p-8 flex flex-col items-center justify-between text-center border border-white/10 rounded-r-xl">
                 <h2 className="font-serif text-2xl text-white tracking-widest uppercase mt-4">Understanding<br/>Our<br/><span className="text-[#D96C40]">Energetic</span><br/>Architecture</h2>
                 <div className="w-16 h-16 border border-[#D96C40] rotate-45 flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#D96C40] rounded-full"></div>
                 </div>
                 <p className="font-serif text-sm tracking-widest uppercase">Dirk Nellens</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden"
          >
            <Image 
              src="https://picsum.photos/800/1000?random=2" 
              alt="Dirk Nellens" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#2C2C2C]">
              A Certified Human Design Analyst with more than 20 years of experience, Dirk has conducted over 4,000 readings and trainings internationally.
            </h2>
            
            <div className="space-y-6 text-[#2C2C2C]/80 leading-relaxed">
              <p>
                Dirk discovered Human Design in 2002 and is one of the very few Reflector Types—comprising just 1% of the population—to have had the rare privilege of studying directly under the Human Design founder Ra Uru Hu in Ibiza for many years.
              </p>
              <p>
                Dirk's therapeutic background includes formal training in body-centered approaches such as inner child work, co-dependency recovery, breathwork, family constellations, and the Enneagram, as well as active meditative practices developed by Osho, which he profoundly explored during his years at the Osho Meditation Resort in Pune, India.
              </p>
              <p>
                The integration of Human Design with therapeutic and meditative pathways forms the foundation of Dirk's work.
              </p>
            </div>

            <Link href="#about-more" className="inline-block bg-[#D96C40] text-white px-8 py-4 rounded-full font-medium hover:bg-[#c25a30] transition-colors w-fit mt-4">
              Learn more
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="sessions" className="py-24 md:py-32 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-[#2C2C2C]">Human Design & Therapy Sessions</h2>
          
          <div className="flex overflow-x-auto pb-12 -mx-6 px-6 md:mx-0 md:px-0 gap-6 snap-x snap-mandatory hide-scrollbar">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[350px] flex-1 bg-[#FDFBF7] p-8 rounded-[2rem] snap-start flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <h3 className="font-serif text-xl font-semibold mb-4">Personal Chart Analysis</h3>
                <p className="text-[#2C2C2C]/70 leading-relaxed mb-8">
                  This session offers a clear, compassionate mirror of who you are beneath conditioning—how your energy moves, how you make decisions, and how life flows most naturally for you.
                </p>
              </div>
              <button className="w-full py-3 rounded-full border border-[#D96C40] text-[#D96C40] font-medium hover:bg-[#D96C40] hover:text-white transition-colors">
                Find out more
              </button>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="min-w-[300px] md:min-w-[350px] flex-1 bg-[#FDFBF7] p-8 rounded-[2rem] snap-start flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <h3 className="font-serif text-xl font-semibold mb-4">Connection Chart Analysis</h3>
                <p className="text-[#2C2C2C]/70 leading-relaxed mb-8">
                  Human Design offers a profound lens for understanding how two people connect. A Connection Chart Analysis maps the energetic interplay between both charts, revealing who brings which qualities to the relationship, where sparks ignite, and where friction invites growth.
                </p>
              </div>
              <button className="w-full py-3 rounded-full border border-[#D96C40] text-[#D96C40] font-medium hover:bg-[#D96C40] hover:text-white transition-colors">
                Find out more
              </button>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="min-w-[300px] md:min-w-[350px] flex-1 bg-[#FDFBF7] p-8 rounded-[2rem] snap-start flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <h3 className="font-serif text-xl font-semibold mb-4">Human Design & Personal Guidance Session</h3>
                <p className="text-[#2C2C2C]/70 leading-relaxed mb-8">
                  By using Human Design as a subtle but powerful lens, any life situation can become a doorway to recognising and embodying your true authenticity.
                </p>
              </div>
              <button className="w-full py-3 rounded-full border border-[#D96C40] text-[#D96C40] font-medium hover:bg-[#D96C40] hover:text-white transition-colors">
                Find out more
              </button>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="min-w-[300px] md:min-w-[350px] flex-1 bg-[#FDFBF7] p-8 rounded-[2rem] snap-start flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <h3 className="font-serif text-xl font-semibold mb-4">'Opening to Change' Session</h3>
                <p className="text-[#2C2C2C]/70 leading-relaxed mb-8">
                  Feeling stuck or confused about your next steps? If life feels confusing or you sense the need for change but aren't sure where to start, this session offers a powerful starting point.
                </p>
              </div>
              <button className="w-full py-3 rounded-full border border-[#D96C40] text-[#D96C40] font-medium hover:bg-[#D96C40] hover:text-white transition-colors">
                Find out more
              </button>
            </motion.div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="w-12 h-12 rounded-full border border-[#2C2C2C] flex items-center justify-center hover:bg-[#2C2C2C] hover:text-white transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-full border border-[#2C2C2C] flex items-center justify-center hover:bg-[#2C2C2C] hover:text-white transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative aspect-square flex items-center justify-center"
          >
            {/* Abstract Graphic Placeholder */}
            <div className="w-full h-full max-w-[300px] max-h-[400px] relative">
              <div className="absolute inset-0 bg-[#E5D5C5] rounded-t-full rounded-b-md transform -rotate-6 opacity-50"></div>
              <div className="absolute inset-4 bg-[url('https://picsum.photos/400/600?random=3')] bg-cover bg-center rounded-t-full rounded-b-md mix-blend-multiply"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                 <div className="w-8 h-8 rounded-full border-4 border-[#D96C40]"></div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex flex-col items-center text-center gap-8"
          >
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#2C2C2C]">
              "Dirk introduced me to my Bodygraph and told me things about myself that I didn't know and yet that somehow felt true.
              <br/><br/>
              He made me feel inspired to be curious about myself and curious to see if life can be different if I change my approach towards myself and towards how I live with what I learnt from my Bodygraph. Which is huge!"
            </p>
            <p className="font-serif italic text-[#D96C40]">~ Ana</p>

            {/* Testimonial Controls */}
            <div className="flex items-center gap-4 mt-8 border border-[#2C2C2C] rounded-full px-4 py-2">
              <button className="p-1 hover:text-[#D96C40] transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D96C40]"></div>
                <div className="w-2 h-2 rounded-full bg-[#2C2C2C]/20"></div>
                <div className="w-2 h-2 rounded-full bg-[#2C2C2C]/20"></div>
              </div>
              <button className="p-1 hover:text-[#D96C40] transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Discover More Section */}
      <section className="py-24 bg-[#EBE4D8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-[#2C2C2C]">Discover more by Dirk on Human Design</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-[400px] mx-auto w-full bg-[#38B6FF] rounded-[2rem] overflow-hidden p-8 flex items-center justify-center"
            >
               {/* Abstract Collage Placeholder */}
               <div className="w-full h-full relative">
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl"></div>
                  <div className="absolute bottom-12 right-12 w-32 h-48 bg-[url('https://picsum.photos/200/300?random=4')] bg-cover bg-center rounded-t-full transform rotate-12"></div>
                  <div className="absolute top-1/4 right-1/4 w-40 h-24 bg-[url('https://picsum.photos/300/200?random=5')] bg-cover bg-center rounded-full transform -rotate-12"></div>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 max-w-sm mx-auto md:mx-0 w-full"
            >
              <Link href="#substack" className="flex items-center justify-between bg-white px-8 py-6 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <span className="font-serif text-xl font-medium">Articles on Substack</span>
                <div className="w-8 h-8 bg-[#D96C40]/10 rounded-sm flex items-center justify-center group-hover:bg-[#D96C40] transition-colors">
                  <div className="w-4 h-4 bg-[#D96C40] group-hover:bg-white transition-colors"></div>
                </div>
              </Link>
              <Link href="#podcasts" className="flex items-center justify-center bg-white px-8 py-6 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <span className="font-serif text-xl font-medium">Podcasts</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-[#EBE4D8] border-t border-[#2C2C2C]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-[#2C2C2C]">
              Deepen your life journey with Dirk's Reflector Reflections, including Human Design insights and Neutrino reports
            </h2>
            
            <div className="relative max-w-md">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-white px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-[#D96C40]/50 shadow-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-[#2C2C2C] px-6 py-2 rounded-full font-medium hover:bg-[#2C2C2C] hover:text-white transition-colors">
                Sign up
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-[400px] mx-auto w-full bg-[#A0522D] rounded-[2rem] overflow-hidden flex items-center justify-center p-8"
          >
             {/* Abstract Collage Placeholder */}
             <div className="w-full h-full relative">
                <div className="absolute top-8 left-8 w-12 h-12 border-2 border-white/40 rounded-full flex items-center justify-center">
                   <div className="w-1 h-8 bg-white/40"></div>
                   <div className="w-8 h-1 bg-white/40 absolute"></div>
                </div>
                <div className="absolute inset-12 bg-[url('https://picsum.photos/400/400?random=6')] bg-cover bg-center rounded-xl mix-blend-overlay opacity-80"></div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <h4 className="text-[#2C2C2C]/50 text-sm uppercase tracking-wider">Courses</h4>
            <div className="flex flex-col gap-4 text-sm">
              <Link href="#" className="hover:text-[#D96C40] transition-colors line-through decoration-[#2C2C2C]/30 text-[#2C2C2C]/60">Human Design Analysis</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors line-through decoration-[#2C2C2C]/30 text-[#2C2C2C]/60">Connection Chart Analysis</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors line-through decoration-[#2C2C2C]/30 text-[#2C2C2C]/60">Human Design & Personal Guidance</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors underline underline-offset-4">View All Courses</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[#2C2C2C]/50 text-sm uppercase tracking-wider">Human Design & Therapy Sessions</h4>
            <div className="flex flex-col gap-4 text-sm">
              <Link href="#" className="hover:text-[#D96C40] transition-colors">Personal Chart Analysis</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors">Connection Chart Analysis</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors">Human Design & Personal Guidance</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors">'Opening to Change' Session</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors underline underline-offset-4">View All Sessions</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[#2C2C2C]/50 text-sm uppercase tracking-wider">Media</h4>
            <div className="flex flex-col gap-4 text-sm">
              <Link href="#" className="hover:text-[#D96C40] transition-colors">Podcasts</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors">Videos</Link>
            </div>
            
            <h4 className="text-[#2C2C2C]/50 text-sm uppercase tracking-wider mt-4">About</h4>
            <div className="flex flex-col gap-4 text-sm">
              <Link href="#" className="hover:text-[#D96C40] transition-colors">Dirk</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors">Speaking</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors">Contact</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[#2C2C2C]/50 text-sm uppercase tracking-wider">Writings</h4>
            <div className="flex flex-col gap-4 text-sm">
              <Link href="#" className="hover:text-[#D96C40] transition-colors">Books</Link>
              <Link href="#" className="hover:text-[#D96C40] transition-colors">Articles on Substack</Link>
            </div>

            <h4 className="text-[#2C2C2C]/50 text-sm uppercase tracking-wider mt-4">Social Links</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#2C2C2C]/20 flex items-center justify-center hover:bg-[#2C2C2C] hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#2C2C2C]/20 flex items-center justify-center hover:bg-[#2C2C2C] hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#2C2C2C]/20 flex items-center justify-center hover:bg-[#2C2C2C] hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#2C2C2C]/20 flex items-center justify-center hover:bg-[#2C2C2C] hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
