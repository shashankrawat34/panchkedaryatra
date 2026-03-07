import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClock, FiMapPin, FiCheck, FiX, FiArrowLeft, FiChevronLeft, FiChevronRight,
  FiStar, FiTrendingUp, FiUsers, FiSun, FiSend, FiZoomIn,
} from 'react-icons/fi';
import { FaWhatsapp, FaMountain } from 'react-icons/fa';
import { getPackageBySlug, packages } from '../data/packages';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { toWebP } from '../utils/image';

// Trek-specific color-graded gradient overlays for hero banners
// Trek-color tint in middle, very dark primary-950 at bottom where text sits
const trekGradients = {
  'kedarnath-yatra': 'from-primary-950/90 via-kedarnath-900/45 to-transparent',
  'tungnath-chandrashila-trek': 'from-primary-950/90 via-tungnath-900/45 to-transparent',
  'rudranath-trek': 'from-primary-950/90 via-rudranath-900/45 to-transparent',
  'madmaheshwar-trek': 'from-primary-950/90 via-madmaheshwar-900/45 to-transparent',
  'kalpeshwar-temple-visit': 'from-primary-950/90 via-kalpeshwar-900/45 to-transparent',
  'complete-panch-kedar-circuit': 'from-primary-950/90 via-primary-900/45 to-transparent',
  'kedarnath-tungnath-combo': 'from-primary-950/90 via-kedarnath-800/40 to-transparent',
  'rudranath-madmaheshwar-trek': 'from-primary-950/90 via-rudranath-800/40 to-transparent',
};

function ImageGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setLightbox(true)}>
        <OptimizedImage
          src={images[activeIndex]}
          alt={`${title} - Photo ${activeIndex + 1}`}
          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <FiZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Nav arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition-colors"
          aria-label="Previous image"
        >
          <FiChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition-colors"
          aria-label="Next image"
        >
          <FiChevronRight className="w-5 h-5 text-gray-800" />
        </button>
        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              idx === activeIndex ? 'border-accent-500 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            aria-label={`View photo ${idx + 1}`}
          >
            <img src={toWebP(img)} alt={`${title} - Photo ${idx + 1}`} className="w-16 h-16 md:w-20 md:h-20 object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full"
              onClick={() => setLightbox(false)}
              aria-label="Close"
            >
              <FiX className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white"
              aria-label="Previous"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={toWebP(images[activeIndex])}
              alt={`${title} - Photo ${activeIndex + 1}`}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white"
              aria-label="Next"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 text-white text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function TrekDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pkg = getPackageBySlug(slug);
  const [openDay, setOpenDay] = useState(null);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4">
        <FaMountain className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="font-heading text-2xl font-bold text-primary-800 mb-2">Package Not Found</h1>
        <p className="text-gray-500 mb-6">The trek package you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/packages" className="btn-primary">View All Packages</Link>
      </div>
    );
  }

  // Related packages (different from current)
  const related = packages.filter((p) => p.id !== pkg.id).slice(0, 3);
  const heroGradient = trekGradients[pkg.slug] || 'from-primary-950/90 via-primary-900/50 to-transparent';

  const trekJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.description,
    touristType: 'Pilgrims, Trekkers',
    offers: {
      '@type': 'Offer',
      price: pkg.price.replace(/[^\d]/g, ''),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'TourOperator',
      name: 'Panch Kedar Yatra',
      url: 'https://panchkedaryatra.in',
      telephone: '+91-7455062107',
    },
  };

  return (
    <>
      <SEO
        title={pkg.title}
        description={`${pkg.description} Duration: ${pkg.duration}. Price: ${pkg.price} ${pkg.priceNote}. Book your ${pkg.title} with expert guides.`}
        canonical={`/packages/${pkg.slug}`}
        image={toWebP(pkg.heroImage)}
        jsonLd={trekJsonLd}
      />
      {/* Hero Banner */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${toWebP(pkg.heroImage)})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${heroGradient}`} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-32">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center flex-wrap gap-1 text-sm text-white/60">
              <li><Link to="/" className="hover:text-accent-400 transition-colors">Home</Link></li>
              <li className="flex items-center gap-1"><FiChevronRight className="w-3.5 h-3.5" /><Link to="/packages" className="hover:text-accent-400 transition-colors">Packages</Link></li>
              <li className="flex items-center gap-1"><FiChevronRight className="w-3.5 h-3.5" /><span className="text-accent-400">{pkg.title}</span></li>
            </ol>
          </nav>
          {pkg.badge && (
            <span className={`inline-block ${pkg.badgeColor} text-white text-xs font-bold px-4 py-1.5 rounded-full mb-3`}>
              {pkg.badge}
            </span>
          )}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            {pkg.title}
          </h1>
          <p className="text-white/85 text-lg md:text-xl mb-4">{pkg.subtitle}</p>
          <div className="flex flex-wrap items-center gap-4 text-white/75 text-sm">
            <span className="flex items-center gap-1.5"><FiClock className="w-4 h-4" />{pkg.duration}</span>
            <span className="flex items-center gap-1.5"><FiMapPin className="w-4 h-4" />{pkg.location}</span>
            <span className="flex items-center gap-1.5"><FiTrendingUp className="w-4 h-4" />{pkg.difficulty}</span>
            <span className="flex items-center gap-1.5"><FiUsers className="w-4 h-4" />{pkg.groupSize}</span>
          </div>
        </div>
      </section>

      {/* Sticky Price Bar (mobile) */}
      <div className="lg:hidden sticky top-[56px] z-30 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-accent-500">{pkg.price}</span>
            <span className="text-gray-400 text-sm ml-1">/ {pkg.priceNote}</span>
          </div>
          <Link to="/contact" className="btn-primary text-sm py-2 px-5">Book Now</Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column — Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Interactive Gallery */}
              <div data-aos="fade-up">
                <ImageGallery images={pkg.gallery} title={pkg.title} />
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-aos="fade-up">
                {[
                  { icon: FiTrendingUp, label: 'Altitude', value: pkg.altitude },
                  { icon: FiStar, label: 'Difficulty', value: pkg.difficulty },
                  { icon: FiUsers, label: 'Group Size', value: pkg.groupSize },
                  { icon: FiSun, label: 'Best Season', value: pkg.bestSeason },
                ].map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="bg-gray-50 rounded-xl p-4 text-center">
                      <Icon className="w-5 h-5 text-accent-500 mx-auto mb-2" />
                      <div className="text-xs text-gray-400 mb-0.5">{info.label}</div>
                      <div className="font-semibold text-primary-800 text-sm">{info.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              <div data-aos="fade-up">
                <h2 className="font-heading text-2xl font-bold text-primary-800 mb-4">About This Trek</h2>
                {pkg.longDescription.split('\n\n').map((para, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed mb-4">{para}</p>
                ))}
              </div>

              {/* Highlights */}
              <div data-aos="fade-up">
                <h2 className="font-heading text-2xl font-bold text-primary-800 mb-4">Package Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 bg-green-50 p-3 rounded-xl">
                      <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Itinerary (Accordion) */}
              <div data-aos="fade-up">
                <h2 className="font-heading text-2xl font-bold text-primary-800 mb-4">Day-by-Day Itinerary</h2>
                <div className="space-y-3">
                  {pkg.itinerary.map((day) => {
                    const isOpen = openDay === day.day;
                    return (
                      <div
                        key={day.day}
                        className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
                          isOpen ? 'border-accent-400 bg-accent-50/30' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <button
                          className="w-full flex items-center gap-4 px-5 py-4 text-left"
                          onClick={() => setOpenDay(isOpen ? null : day.day)}
                          aria-expanded={isOpen}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                            isOpen ? 'bg-accent-500 text-white' : 'bg-primary-100 text-primary-800'
                          }`}>
                            D{day.day}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-primary-800 text-sm">{day.title}</h3>
                          </div>
                          <FiChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-4 pl-[4.5rem]">
                                <p className="text-gray-600 text-sm leading-relaxed">{day.details}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inclusions / Exclusions */}
              <div className="grid md:grid-cols-2 gap-6" data-aos="fade-up">
                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-green-800 text-lg mb-4 flex items-center gap-2">
                    <FiCheck className="w-5 h-5" /> Inclusions
                  </h3>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-green-800 text-sm">
                        <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-red-800 text-lg mb-4 flex items-center gap-2">
                    <FiX className="w-5 h-5" /> Exclusions
                  </h3>
                  <ul className="space-y-2">
                    {pkg.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-red-800 text-sm">
                        <FiX className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Sidebar — Sticky Booking Card */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-card p-6" data-aos="fade-left">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-accent-500">{pkg.price}</span>
                    <span className="text-gray-400 text-sm">/ {pkg.priceNote}</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-6">{pkg.duration} &bull; {pkg.difficulty}</p>

                  <Link
                    to="/contact"
                    className="btn-primary w-full text-center mb-3"
                  >
                    <FiSend className="w-4 h-4" /> Book This Trek
                  </Link>
                  <a
                    href={`https://wa.me/917455062107?text=Hi! I'm interested in the ${pkg.title} package (${pkg.price}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border-2 border-green-500 text-green-600
                               font-semibold py-3 rounded-xl transition-all duration-300 hover:bg-green-500 hover:text-white text-sm"
                  >
                    <FaWhatsapp className="w-4 h-4" /> Ask on WhatsApp
                  </a>

                  <div className="mt-6 pt-5 border-t border-gray-100 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium text-primary-800">{pkg.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Max Altitude</span>
                      <span className="font-medium text-primary-800">{pkg.altitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Difficulty</span>
                      <span className="font-medium text-primary-800">{pkg.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Group Size</span>
                      <span className="font-medium text-primary-800">{pkg.groupSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Best Season</span>
                      <span className="font-medium text-primary-800">{pkg.bestSeason}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Help */}
                <div className="bg-primary-50 rounded-2xl p-5 text-center">
                  <p className="text-primary-800 font-semibold text-sm mb-2">Need help choosing?</p>
                  <p className="text-gray-500 text-xs mb-3">Our experts will help you pick the perfect package</p>
                  <a href="tel:+917455062107" className="text-accent-500 font-bold text-sm hover:underline">
                    Call +91-74550 62107
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treks */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-primary-800 mb-8" data-aos="fade-up">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r, idx) => (
              <Link
                key={r.id}
                to={`/packages/${r.slug}`}
                className="card group block"
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={r.image}
                    alt={r.title}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {r.badge && (
                    <span className={`absolute top-3 left-3 ${r.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {r.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <span className="font-bold text-accent-500 text-sm">{r.price}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
                    <FiClock className="w-3.5 h-3.5" /> {r.duration}
                  </div>
                  <h3 className="font-heading font-bold text-primary-800 group-hover:text-accent-500 transition-colors">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
