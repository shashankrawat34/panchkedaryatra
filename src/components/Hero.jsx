import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax - uses CSS background, naturally lazy loads */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage:
            'url(/images/madhyamaheshwar/madhya-1.webp)',
        }}
        role="img"
        aria-label="Madmaheshwar valley with stunning Chaukhamba peaks in the Garhwal Himalayas"
        loading="lazy"
      />

      {/* Gradient Overlay – warm amber tint with dark edges for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/75 via-madmaheshwar-900/55 to-primary-950/85" />

      {/* Animated particles / decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-accent-400 rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-white rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-accent-300 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-float opacity-30" style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Discover{' '}
          <span className="text-amber-300">Panch Kedar</span>{' '}
          Yatra
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Embark on the Sacred Journey to the Five Shrines of Lord Shiva
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base sm:text-lg text-white/75 mb-10 max-w-2xl mx-auto"
        >
          Kedarnath &bull; Tungnath &bull; Rudranath &bull; Madmaheshwar &bull; Kalpeshwar
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/packages" className="btn-primary text-base md:text-lg">
            Explore Packages
          </Link>
          <Link to="/contact" className="btn-secondary text-base md:text-lg">
            Get in Touch
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '8+', label: 'Years Experience' },
            { value: '5000+', label: 'Happy Pilgrims' },
            { value: '5', label: 'Sacred Kedars' },
            { value: '50+', label: 'Expert Guides' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-300 font-heading">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-white/75 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Link
          to="/about"
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-xs mb-2 tracking-widest uppercase">Scroll</span>
          <FiChevronDown className="w-5 h-5 animate-bounce" />
        </Link>
      </motion.div>
    </section>
  );
}
