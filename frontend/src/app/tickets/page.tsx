'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Facebook, MessageCircle } from 'lucide-react';
import Footer from '@/components/Footer';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Donate', href: '/donate' },
  { name: 'Our Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

const upcomingEvents = [
  {
    title: "Galentines Ki Filmy Shaam – Where Bollywood, Sisterhood & Dance Take Over",
    date: "Friday, February 27 | 7:00 PM",
    location: "Royal Albert Palace, Woodbridge, NJ",
    price: "$60",
    image: "/Samaya/images/events/Galentines Ki Filmy Shaam – Where Bollywood, Sisterhood & Dance Take Over 💃✨.jpg",
    highlights: [
      "Special Live Performance – Jayshree Srikanth, Founder & Artistic Director",
      "The DX Team – Fun, easy-to-follow Bollywood dance steps",
      "Filmy Bollywood Vibes – All night dancing",
      "Surprise Performance – Stunning finale",
      "Women's Day Celebration",
    ],
    description: "A glamorous evening as Samaya presents Galentines Ki Filmy Shaam—a Bollywood-inspired celebration of friendship, empowerment, music, and dance.",
  },
];

export default function Tickets() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('event');
  const [showVenmoModal, setShowVenmoModal] = useState(false);
  const [showZelleModal, setShowZelleModal] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const newVisibleSections = new Set<string>();
      const entries = Object.entries(sectionRefs.current);
      
      entries.forEach(([key, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
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

  const event = upcomingEvents[0];

  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Header */}
        <header className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20">
          <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image
                  src="/Samaya/images/logo/samaya logo.png"
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
                  className="text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-400 after:transition-all after:duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-all duration-300"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900 border-t border-slate-800 animate-in slide-in-from-top duration-300">
              <div className="px-6 py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm font-medium text-slate-300 hover:text-white transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-16 relative z-10">
          {/* Title */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 text-transparent bg-clip-text">
              Get Your Tickets
            </h1>
            <p className="text-base sm:text-lg text-slate-300">Secure your spot for an unforgettable evening of Bollywood, music, and sisterhood</p>
          </section>

          {/* Content Grid */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Flyer and Tabs */}
              <div>
                {/* Flyer Image */}
                <div className="mb-8">
                  <div
                    onClick={() => setSelectedImage(event.image)}
                    className="relative cursor-pointer group overflow-hidden rounded-2xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300"
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain min-h-96 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white text-lg font-semibold">Click to expand</p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setActiveTab('event')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      activeTab === 'event'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Event Details
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      activeTab === 'about'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    About Event
                  </button>
                </div>

                {/* Tab Content */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-2xl backdrop-blur-xl">
                  {activeTab === 'event' && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">Event Highlights</h3>
                      <ul className="space-y-3">
                        {event.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-emerald-400 mt-1">✓</span>
                            <span className="text-slate-300">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'about' && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
                      <p className="text-slate-300 mb-4">{event.description}</p>
                      <div className="space-y-2 text-slate-300">
                        <p><span className="font-semibold text-emerald-300">📅 Date:</span> {event.date}</p>
                        <p><span className="font-semibold text-emerald-300">📍 Location:</span> {event.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing & Payment */}
              <div>
                {/* Pricing Card */}
                <div className="relative mb-8">
                  {/* SALE Badge - Much More Prominent */}
                  <div className="absolute -top-6 left-8 z-20">
                    <div className="bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white font-black px-8 py-3 rounded-full shadow-2xl shadow-red-500/50 border-2 border-red-300 text-lg animate-pulse">
                      🔥 SALE 🔥
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black border-3 border-amber-500 p-12 rounded-3xl backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-amber-500/40">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-red-500/10 blur-2xl"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Savings Badge */}
                      <div className="mb-8 inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg">
                        💰 SAVE 25% - ONLY TODAY
                      </div>

                      <h2 className="text-2xl font-bold text-white mb-8">Limited Time Offer!</h2>
                      
                      {/* Price Display */}
                      <div className="mb-10 space-y-4">
                        <div className="flex items-center gap-6">
                          <div className="text-slate-500 line-through text-2xl font-bold">
                            $80
                          </div>
                          <div className="bg-red-500/30 border-2 border-red-500/60 px-4 py-2 rounded-lg">
                            <span className="text-red-300 font-bold text-sm">Original Price</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border-2 border-emerald-500/60 p-8 rounded-2xl">
                          <p className="text-slate-300 text-base mb-3 font-semibold">Your Price Today</p>
                          <div className="text-5xl font-black bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 text-transparent bg-clip-text mb-2">
                            $60
                          </div>
                          <p className="text-slate-300 text-base">Per person</p>
                        </div>
                      </div>

                      {/* You Save Highlight */}
                      <div className="bg-gradient-to-r from-red-500/20 to-amber-500/20 border-2 border-red-500/60 p-6 rounded-2xl mb-10 shadow-lg shadow-red-500/20">
                        <p className="text-center text-lg font-bold text-transparent bg-gradient-to-r from-red-300 to-amber-300 bg-clip-text">
                          ✨ YOU SAVE $20 PER TICKET ✨
                        </p>
                      </div>

                      <p className="text-slate-300 text-lg mb-8 pb-8 border-b border-amber-500/50">
                        Secure your spot for an unforgettable evening of music, dance, and sisterhood.
                      </p>

                      {/* Group Discount */}
                      <div className="bg-gradient-to-br from-amber-950/40 to-orange-950/40 border-2 border-amber-500/60 p-7 rounded-2xl mb-8 hover:border-amber-500/80 hover:shadow-lg hover:shadow-amber-500/40 transition-all duration-300">
                        <h3 className="text-lg font-bold text-amber-300 mb-4">🎟️ Group Ticket Discount</h3>
                        <p className="text-slate-300 mb-5 text-sm">Get even more savings for groups!</p>
                        <div className="bg-slate-900/80 p-5 rounded-xl border border-amber-500/40">
                          <p className="text-slate-200 font-semibold mb-3 text-sm">Call or Text:</p>
                          <a href="tel:+15082126915" className="text-amber-300 hover:text-amber-200 text-lg font-bold transition-colors duration-300">
                            +1 (508) 212-6915
                          </a>
                        </div>
                      </div>

                      {/* Impact Message */}
                      <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border-2 border-cyan-500/50 p-7 rounded-2xl">
                        <h3 className="text-lg font-bold text-cyan-300 mb-3">🎯 Your Impact</h3>
                        <p className="text-slate-300 text-sm">
                          Every ticket purchase helps us raise funds to reach our goal of uplifting women and children facing emotional, social, and economic hardship. Together, we're creating lasting change!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-12">
                  <h2 className="text-3xl font-bold text-white mb-8">Payment Methods</h2>
                  <div className="space-y-6">
                    {/* Autobooks/Credit Card */}
                    <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-emerald-500/40 p-8 rounded-2xl backdrop-blur-xl hover:border-emerald-500/70 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2 text-emerald-300">💳 Credit Card</h3>
                          <p className="text-slate-400">Buy securely using any major credit or debit card. Encrypted and safe.</p>
                        </div>
                      </div>
                      <a
                        href="https://app.autobooks.co/pay/samaya-global?amount=60"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 block text-center"
                      >
                        Buy Ticket with Card
                      </a>
                    </div>

                    {/* Venmo */}
                    <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/40 p-8 rounded-2xl backdrop-blur-xl hover:border-blue-500/70 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2 text-blue-300">📱 Venmo</h3>
                          <p className="text-slate-400 mb-2">Send money directly via Venmo. Easy, fast, and instant.</p>
                          <p className="text-blue-300 text-sm">Scan me to venmo here</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowVenmoModal(true)}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                      >
                        Buy via Venmo
                      </button>
                    </div>

                    {/* Zelle */}
                    <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-purple-500/40 p-8 rounded-2xl backdrop-blur-xl hover:border-purple-500/70 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2 text-purple-300">🏦 Zelle</h3>
                          <p className="text-slate-400 mb-2">Transfer money instantly using Zelle through your bank app.</p>
                          <p className="text-purple-300 text-sm">Scan me to zelle here</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowZelleModal(true)}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                      >
                        Buy via Zelle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Back to Events */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
            <Link
              href="/events"
              className="inline-block px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Back to Events
            </Link>
          </section>
        </main>

        {/* Full Screen Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full max-h-screen">
              <Image
                src={selectedImage}
                alt="Event flyer"
                width={1000}
                height={1000}
                className="w-full h-auto object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
              >
                <X size={28} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Venmo Modal */}
        {showVenmoModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-blue-500/30 shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-300">Venmo QR Code</h2>
                <button
                  onClick={() => setShowVenmoModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden bg-white p-2">
                <Image
                  src="/Samaya/images/Donate/venmo.jpg"
                  alt="Venmo QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-slate-300 mb-6">Scan this QR code to send your ticket payment via Venmo</p>
              <button
                onClick={() => setShowVenmoModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Zelle Modal */}
        {showZelleModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-purple-500/30 shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-purple-300">Zelle QR Code</h2>
                <button
                  onClick={() => setShowZelleModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden bg-white p-2">
                <Image
                  src="/Samaya/images/Donate/zelle.png"
                  alt="Zelle QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-slate-300 mb-6">Scan this QR code to send your ticket payment via Zelle</p>
              <button
                onClick={() => setShowZelleModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
