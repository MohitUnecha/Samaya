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

const eventPhotos = [
  '/images/eventphotos/KKPhotographyNJ-00991.jpg',
  '/images/eventphotos/KKPhotographyNJ-01031.jpg',
  '/images/eventphotos/KKPhotographyNJ-01044.jpg',
  '/images/eventphotos/KKPhotographyNJ-01292.jpg',
  '/images/eventphotos/KKPhotographyNJ-7407962.jpg',
  '/images/eventphotos/KKPhotographyNJ-7407975.jpg',
  '/images/eventphotos/KKPhotographyNJ-7407980.jpg',
  '/images/eventphotos/KKPhotographyNJ-7407985.jpg',
  '/images/eventphotos/KKPhotographyNJ-7408046.jpg',
  '/images/eventphotos/dandiya_2024_3.jpg',
];

const upcomingEvents = [
  {
    title: "Galentines Ki Filmy Shaam – Where Bollywood, Sisterhood & Dance Take Over",
    date: "Friday, February 27 | 7:00 PM",
    location: "Royal Albert Palace, Woodbridge, NJ",
    price: "$60",
    image: "/images/events/Galentines Ki Filmy Shaam – Where Bollywood, Sisterhood & Dance Take Over 💃✨.jpg",
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

const previousEvents = [
  {
    title: "Bollywood Garba Night – Where Beats, Tradition & Dance Take Over",
    date: "Sep 19, 2025",
    location: "Somerset, NJ",
    image: "/images/events/Bollywood Garba Night – Where Beats, Tradition & Dance Take Over 💃✨.png",
    highlights: [
      "Live Garba Energy – Celebrate tradition with vibrant Garba & Dandiya",
      "Bollywood Beats All Night – DJ Raj Kurani",
      "Garba + Dandiya + Open Dance Floor",
      "Photo-Perfect Moments",
      "Exciting Raffles & Surprises",
    ],
  },
  {
    title: "Desi Dhamal Galentine's Party",
    date: "Mar 7, 2025",
    location: "Fords, NJ",
    image: "/images/events/desi123.png",
    highlights: [
      "Dance the Night Away – DJ Raj Kurani",
      "Unlimited Food",
      "Open Premium Bar",
      "Exciting Raffles & Surprises",
      "Ladies Only (21+)",
    ],
  },
  {
    title: "Bollywood Fusion Dandiya",
    date: "Oct 4, 2024",
    location: "Edison, NJ",
    image: "/images/events/Bollywood Fusion Dandiya: The Most Awaited Dandiya Night in New Jersey! 🎉💃 .png",
    highlights: [
      "360 Photo Booth",
      "Live Dhol",
      "Garba + Dandiya + Open Dance Floor",
      "Exciting Raffles & Grand Prizes",
      "Live Food Stations",
    ],
  },
  {
    title: "Sunrise Beach Yoga",
    date: "Aug 25, 2024",
    location: "Beach",
    image: "/images/events/111222.png",
    highlights: [
      "Serene and revitalizing session",
      "6 AM start time",
      "Free for all",
      "Reconnect with nature",
    ],
  },
  {
    title: "🎉 Double the Magic, Double the Fun – Bollywood Tollywood Extravaganza! 🎶💃",
    date: "Apr 19, 2024",
    location: "TBD",
    image: "/images/events/4444.png",
    highlights: [
      "Bollywood & Tollywood DJs – Non-stop beats!",
      "Live Drums & Dance Motivators – Feel the rhythm!",
      "Twinning Parade – Walk hand in hand with your BFFs",
      "Duo Dance Performances – Take the stage in style",
      "Nostalgic Childhood Games – Relive cherished memories",
    ],
  },
  {
    title: "Ladies Bollywood Masti Night 💃",
    date: "Jan 19, 2024",
    location: "Grand Ballroom",
    image: "/images/events/222.png",
    highlights: [
      "Live Filming Opportunity – Be part of movie DASH!",
      "Walk the Red Carpet & Get Clicked by Paparazzi",
      "Media Coverage by ITV & TV Asia",
      "Amazing Prizes – Jewelry, Makeup, Gym Memberships & More",
      "Buffet Dinner by King Palace NJ",
    ],
  },
];

export default function Events() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        {/* Header */}
        <header className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20 transition-all duration-300">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo/samaya logo.png"
                  alt="Samaya Logo"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-sm font-medium hover:text-emerald-400 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-400 after:transition-all after:duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-all duration-300"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50 animate-in slide-in-from-top duration-300">
              <div className="px-4 py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm font-medium hover:text-emerald-400 transition-all duration-300"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h1 className="text-6xl font-bold mb-6 pt-8 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 text-transparent bg-clip-text animate-in fade-in slide-in-from-bottom-4 duration-700">Events & Celebrations</h1>
              <p className="text-lg text-slate-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">Join us for inspiring gatherings that build safe, compassionate communities and create lasting connections for women and children in need</p>
            </div>

            {/* Upcoming Events */}
            <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text">Upcoming Events</h2>
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-800/50 via-slate-900/40 to-black/50 backdrop-blur-xl rounded-2xl border border-emerald-500/30 mb-8 hover:border-emerald-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.01] group overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Image Section */}
                    {event.image && (
                      <div className="relative w-full min-h-96 rounded-xl overflow-hidden shadow-xl flex items-center justify-center cursor-pointer" onClick={() => setSelectedImage(event.image)}>
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={500}
                          height={500}
                          className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                          <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to expand</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Content Section */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text group-hover:from-emerald-200 group-hover:to-cyan-400 transition-all duration-300">{event.title}</h3>
                        <div className="mb-6 space-y-2 text-slate-300">
                          <p><strong>📅 Date:</strong> {event.date}</p>
                          <p><strong>📍 Location:</strong> {event.location}</p>
                          <p><strong>🎟 Price:</strong> {event.price}</p>
                        </div>
                        <p className="text-lg text-slate-300 mb-6">{event.description}</p>
                        <div className="mb-6">
                          <h4 className="font-bold mb-3">✨ What's in Store?</h4>
                          <ul className="space-y-2 text-slate-300">
                            {event.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-3">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Link
                        href="/tickets"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/60 transform active:scale-95 w-fit"
                      >
                        Get Tickets
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Event Photo Carousel */}
            <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text">Our Community in Action</h2>
              <div className="relative">
                {/* Carousel Container - Infinite Loop */}
                <div 
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {/* Original photos + duplicated photos for infinite loop */}
                  {[...eventPhotos, ...eventPhotos].map((photo, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(photo)}
                      className="flex-shrink-0 w-96 h-80 relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer"
                    >
                      <Image
                        src={photo}
                        alt={`Event photo ${(index % eventPhotos.length) + 1}`}
                        fill
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white text-lg font-semibold">Click to expand</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Gradient Fades */}
                <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Navigation Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {eventPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (carouselRef.current) {
                        const scrollLeft = index * (384 + 24); // 384px width + 24px gap
                        carouselRef.current.scrollLeft = scrollLeft;
                        setCarouselIndex(index);
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-500 ease-out ${
                      index === carouselIndex ? 'bg-emerald-500 w-8 shadow-lg shadow-emerald-500/50' : 'bg-slate-600 hover:bg-slate-500 w-2'
                    }`}
                    aria-label={`Go to photo ${index + 1}`}
                  />
                ))}
              </div>
            </section>

            {/* Previous Events */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text">Previous Events</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {previousEvents.map((event, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-teal-500/20 hover:scale-[1.02] group">
                    {/* Image */}
                    {event.image && (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-lg mb-4 cursor-pointer" onClick={() => setSelectedImage(event.image)}>
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={300}
                          height={200}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to expand</span>
                        </div>
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-300 transition-colors duration-300">{event.title}</h3>
                    <p className="text-slate-300 mb-2"><strong>📅</strong> {event.date}</p>
                    <p className="text-slate-300 mb-4"><strong>📍</strong> {event.location}</p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {event.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Event flyer"
                width={1200}
                height={800}
                className="w-full h-auto object-contain max-h-[90vh]"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 text-2xl"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
