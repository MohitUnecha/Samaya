'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sun, Moon, ArrowRight, Instagram, Facebook, MessageCircle, ChevronDown } from 'lucide-react';
import Footer from '@/components/Footer';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Events', href: '/events' },
  { name: 'Donate', href: '/donate' },
  { name: 'Our Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

const eventPhotos = [
  '/images/events/photo of event 1.jpg',
  '/images/events/poe2.png',
  '/images/events/poe3.png',
  '/images/events/poe4.png',
];

const stockYogaPhotos = [
  '/images/stockyoga/yoga-1.png',
  '/images/stockyoga/yoga-2.png',
  '/images/stockyoga/yoga-3.png',
  '/images/stockyoga/yoga-4.png',
  '/images/stockyoga/yoga-5.png',
  '/images/stockyoga/yoga-6.png',
  '/images/stockyoga/yoga-7.png',
  '/images/stockyoga/yoga-8.png',
  '/images/stockyoga/yoga-9.png',
  '/images/stockyoga/yoga-10.png',
  '/images/stockyoga/yoga-11.png',
  '/images/stockyoga/yoga-12.png',
  '/images/stockyoga/yoga-13.png',
  '/images/stockyoga/yoga-14.png',
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Initialize dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Calculate hero section opacity (disappears as you scroll)
      const opacity = Math.max(0, 1 - scrollY / (heroHeight * 0.6));
      setHeroOpacity(opacity);
      
      // Show/hide header after scrolling past hero
      setScrolled(scrollY > heroHeight * 0.9);
      
      // Check which sections are in view
      const newVisibleSections = new Set<string>();
      const entries = Object.entries(sectionRefs.current);
      
      entries.forEach(([key, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          // Element is in view if it's in the viewport
          if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            newVisibleSections.add(key);
          }
        }
      });
      
      setVisibleSections(newVisibleSections);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % eventPhotos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % stockYogaPhotos.length);
    }, 4000);
    return () => clearInterval(carouselInterval);
  }, [stockYogaPhotos.length]);

  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white transition-colors duration-500">
        {/* Header */}
        <header className={`fixed w-full top-0 z-50 transition-all duration-700 ease-out ${
          scrolled
            ? 'translate-y-0 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20'
            : '-translate-y-full opacity-0'
        }`}>
          <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image
                  src="/images/logo/samaya logo.png"
                  alt="Samaya"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-400 after:transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900 dark:bg-black border-t border-slate-800">
              <div className="px-6 py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20">
          <div className="absolute inset-0 overflow-hidden">
            {/* Blurred Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/logo/logomain.jpg"
                alt="Background"
                fill
                className="object-cover blur-md"
                priority
              />
              <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20"></div>
          </div>

          <div 
            className="relative z-10 max-w-6xl mx-auto text-center transition-opacity duration-500"
            style={{ opacity: heroOpacity }}
          >
            <div className="mb-12">
              <Image
                src="/images/logo/samaya logo.png"
                alt="Samaya"
                width={180}
                height={180}
                className="mx-auto drop-shadow-2xl animate-fade-in"
              />
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent leading-tight animate-fade-in">
              Samaya
            </h1>
            <p className="text-2xl sm:text-3xl font-medium text-emerald-400 mb-6 animate-fade-in">
              Bring People Together
            </p>
            <p className="text-lg text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              A US-based nonprofit dedicated to uplifting women and children facing emotional, social, and economic hardship through community, connection, and cultural celebration.
            </p>
            <div className="flex flex-col items-center gap-8">
              <Link
                href="/donate"
                className="group px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 flex items-center gap-2 text-lg animate-fade-in hover:scale-105"
              >
                Support Our Mission
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              {/* Scroll Down Indicator */}
              <a
                href="#mission"
                className="flex flex-col items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer animate-bounce"
              >
                <span className="text-sm font-medium">Scroll to explore</span>
                <ChevronDown size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* Mission Section with Image */}
        <section 
          id="mission" 
          className="py-24 px-6 lg:px-8 scroll-mt-20 bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-black transition-all duration-1000"
          ref={(el) => { if (el) sectionRefs.current['mission'] = el; }}
          style={{
            opacity: visibleSections.has('mission') ? 1 : 0.3,
            transform: visibleSections.has('mission') ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/logo/logomain.jpg"
                  alt="Samaya Mission"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <div className="space-y-6 text-slate-300 leading-relaxed">
                  <p className="text-lg">
                    SAMAYA is dedicated to uplifting women and children facing emotional, social, and economic hardship. We are especially committed to supporting women experiencing loneliness, isolation, or depression by creating safe, compassionate, and empowering communities.
                  </p>
                  <p className="text-lg">
                    Our mission is to provide resources, programs, and opportunities that nurture mental well-being, build confidence, and foster meaningful connections. We also strive to support underprivileged children by ensuring access to care, education, and emotional support, helping them grow with stability, dignity, and hope.
                  </p>
                  <p className="text-lg">
                    Through advocacy, community building, and direct support, SAMAYA works toward a world where women and children, regardless of background, have the opportunity to heal, thrive, and reach their full potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Accomplish Section */}
        <section 
          className="py-24 px-6 lg:px-8 bg-gradient-to-b from-slate-800/50 dark:from-black/50 to-slate-900/50 dark:to-black/50 transition-all duration-1000"
          ref={(el) => { if (el) sectionRefs.current['accomplish'] = el; }}
          style={{
            opacity: visibleSections.has('accomplish') ? 1 : 0.3,
            transform: visibleSections.has('accomplish') ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              How We Accomplish Our Goals
            </h2>
            <div className="max-w-4xl mx-auto text-center space-y-6 text-slate-300 text-lg leading-relaxed mb-16">
              <p>
                We expand access to education, healthcare, and essential resources for communities both locally and globally. We are dedicated to fostering opportunities that unlock individual potential, inspire hope, and lay the groundwork for a brighter, more sustainable future.
              </p>
              <p>
                We achieve this by raising funds through cultural and social gatherings, which are then donated to charities supporting those in need. Through these efforts, we aim to build awareness about the importance of giving back and creating lasting, positive change.
              </p>
            </div>

            {/* Event Photos Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {eventPhotos.map((photo, index) => (
                <div key={index} className="relative h-64 rounded-xl overflow-hidden group">
                  <Image
                    src={photo}
                    alt={`Event ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section 
          className="py-24 px-6 lg:px-8 bg-slate-900 dark:bg-slate-950 transition-all duration-1000"
          ref={(el) => { if (el) sectionRefs.current['impact'] = el; }}
          style={{
            opacity: visibleSections.has('impact') ? 1 : 0.3,
            transform: visibleSections.has('impact') ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="text-6xl font-bold text-emerald-400 mb-4">14+</div>
                <h3 className="text-xl font-semibold mb-2">Events Hosted</h3>
                <p className="text-slate-400">Cultural and social gatherings bringing communities together</p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="text-6xl font-bold text-emerald-400 mb-4">1000+</div>
                <h3 className="text-xl font-semibold mb-2">Lives Touched</h3>
                <p className="text-slate-400">Direct support and community empowerment</p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="text-6xl font-bold text-emerald-400 mb-4">∞</div>
                <h3 className="text-xl font-semibold mb-2">Lasting Change</h3>
                <p className="text-slate-400">Creating sustainable impact in communities</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-24 px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-emerald-500 transition-all duration-1000"
          ref={(el) => { if (el) sectionRefs.current['cta'] = el; }}
          style={{
            opacity: visibleSections.has('cta') ? 1 : 0.3,
            transform: visibleSections.has('cta') ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-10 opacity-90">
              Every contribution helps fund programs that uplift women and children in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="group px-10 py-4 bg-white text-emerald-600 font-bold rounded-full hover:bg-slate-100 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                Donate Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/events"
                className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Explore Events
              </Link>
            </div>
          </div>
        </section>

        {/* Photo Carousel */}
        <section 
          className="py-20 px-6 lg:px-8 bg-slate-900/50 dark:bg-black/30 overflow-hidden transition-all duration-1000"
          ref={(el) => { if (el) sectionRefs.current['carousel'] = el; }}
          style={{
            opacity: visibleSections.has('carousel') ? 1 : 0.3,
            transform: visibleSections.has('carousel') ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              Our Community in Action
            </h2>
            <div className="relative">
              {/* Carousel Container - Infinite Loop */}
              <div 
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                style={{ scrollBehavior: 'smooth' }}
              >
                {/* Original photos + duplicated photos for infinite loop */}
                {[...stockYogaPhotos, ...stockYogaPhotos].map((photo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 h-80 relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={photo}
                      alt={`Community photo ${(index % stockYogaPhotos.length) + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
              
              {/* Gradient Fades */}
              <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 dark:from-black to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 dark:from-black to-transparent pointer-events-none"></div>
            </div>
            
            {/* Navigation Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {stockYogaPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (carouselRef.current) {
                      const scrollLeft = index * (320 + 24); // 320px width + 24px gap
                      carouselRef.current.scrollLeft = scrollLeft;
                      setCarouselIndex(index);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${
                    index === carouselIndex ? 'bg-emerald-500 w-8 shadow-lg shadow-emerald-500/50' : 'bg-slate-600 dark:bg-slate-700 hover:bg-slate-500 dark:hover:bg-slate-600 w-2'
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
