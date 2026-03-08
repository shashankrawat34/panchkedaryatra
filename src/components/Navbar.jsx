import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Panch Kedar Packages', to: '/packages' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Testimonials', to: '/testimonials' },
  { name: 'Blog', to: '/blog' },
  { name: 'Updates', to: '/updates' },
  { name: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-nav py-2'
          : 'bg-transparent py-4'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Name */}
          <Link to="/" className="flex items-center group" aria-label="Panch Kedar Yatra Home">
            <div className="flex flex-col">
              <span
                className={`font-heading font-bold text-lg md:text-xl leading-tight transition-colors duration-300 ${
                  scrolled ? 'text-primary-800' : 'text-white'
                }`}
              >
                Panch Kedar <span className={`${scrolled ? 'text-accent-500' : 'text-accent-400'}`}>Yatra</span>
              </span>
              <span
                className={`text-[0.5rem] font-medium tracking-wider transition-colors duration-300 ${
                  scrolled ? 'text-primary-600' : 'text-white/70'
                }`}
              >
                by Garhwal Hikes
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 ${
                    scrolled
                      ? `hover:text-primary-800 hover:bg-primary-50 ${isActive ? 'text-primary-800 bg-primary-50' : 'text-primary-700'}`
                      : `hover:text-white ${isActive ? 'text-white bg-white/10' : 'text-white/90'}`
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+917455062107"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-primary-800' : 'text-white'
              }`}
              aria-label="Call us"
            >
              <FiPhone className="w-4 h-4" />
              <span>+91-74550 62107</span>
            </a>
            <a
              href="https://wa.me/917455062107"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium 
                         py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
              aria-label="WhatsApp us"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <FiX className={`w-6 h-6 ${scrolled ? 'text-primary-800' : 'text-white'}`} />
            ) : (
              <FiMenu className={`w-6 h-6 ${scrolled ? 'text-primary-800' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={handleLinkClick}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'text-primary-800 bg-primary-50'
                        : 'text-primary-700 hover:text-primary-800 hover:bg-primary-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <a
                  href="tel:+917455062107"
                  className="flex items-center gap-2 px-4 py-2 text-primary-800 font-medium"
                >
                  <FiPhone className="w-5 h-5" />
                  +91-74550 62107
                </a>
                <a
                  href="https://wa.me/917455062107"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white font-medium 
                             py-3 px-4 rounded-lg"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
