import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiYoutube, FiArrowUp, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const footerLinks = {
  'Quick Links': [
    { name: 'Home', to: '/' },
    { name: 'About Us', to: '/about' },
    { name: 'Packages', to: '/packages' },
    { name: 'Gallery', to: '/gallery' },
    { name: 'Testimonials', to: '/testimonials' },
    { name: 'Contact', to: '/contact' },
  ],
  'Popular Treks': [
    { name: 'Kedarnath Yatra', to: '/packages/kedarnath-yatra' },
    { name: 'Tungnath Trek', to: '/packages/tungnath-chandrashila-trek' },
    { name: 'Rudranath Trek', to: '/packages/rudranath-trek' },
    { name: 'Madmaheshwar Trek', to: '/packages/madmaheshwar-trek' },
    { name: 'Rudranath & Kalpeshwar', to: '/packages/rudranath-kalpeshwar-temple-visit' },
    { name: 'Full Panch Kedar', to: '/packages/complete-panch-kedar-circuit-with-badrinath' },
  ],
  'Resources': [
    { name: 'Blog', to: '/blog' },
    { name: 'Packing Guide', to: '/blog' },
    { name: 'Best Season', to: '/blog' },
    { name: 'Fitness Tips', to: '/blog' },
    { name: 'FAQs', to: '/contact' },
    { name: 'Terms & Conditions', to: '/' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-950 text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                Ready for Your Sacred Journey?
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Book your Panch Kedar Yatra today and experience the divine Himalayas.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/packages" className="btn-primary">
                View Packages
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div>
                <span className="font-heading font-bold text-xl text-white">
                  Panch Kedar <span className="text-accent-400">Yatra</span>
                </span>
                <p className="text-accent-400 text-[0.5rem] font-medium tracking-wider mt-1">
                  by Garhwal Hikes
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              Embark on the sacred journey to the five shrines of Lord Shiva. With 8+ years 
              of expertise, we are your trusted partner for Panch Kedar pilgrimages and 
              Himalayan treks in Uttarakhand.
            </p>
            <div className="space-y-2 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-accent-400" />
                <span>809, 8th Floor, Infinity Greens, Dehradun, Uttarakhand 248001</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-accent-400" />
                <a href="tel:+917455062107" className="hover:text-accent-400 transition-colors">
                  +91-74550 62107
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-accent-400" />
                <a href="mailto:info@panchkedaryatra.in" className="hover:text-accent-400 transition-colors">
                  info@panchkedaryatra.in
                </a>
              </div>
            </div>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: FiFacebook, label: 'Facebook', href: '#' },
                { icon: FiInstagram, label: 'Instagram', href: '#' },
                { icon: FiYoutube, label: 'YouTube', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-accent-500 rounded-lg flex items-center justify-center 
                             text-white/60 hover:text-white transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-white text-base mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-white/50 hover:text-accent-400 text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-sm text-center md:text-left">
              &copy; 2026 Panch Kedar Yatra. All rights reserved. | Har Har Mahadev 🙏
            </p>
            <div className="flex items-center gap-4 text-white/40 text-sm">
              <a 
                href="/privacy" 
                className="hover:text-accent-400 transition-colors"
                aria-label="Read our Privacy Policy"
              >
                Privacy Policy
              </a>
              <span aria-hidden="true">|</span>
              <a 
                href="/terms" 
                className="hover:text-accent-400 transition-colors"
                aria-label="Read our Terms of Service"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-4 md:right-6 w-11 h-11 bg-primary-800 hover:bg-primary-700 
                   text-white rounded-full shadow-lg flex items-center justify-center 
                   transition-all duration-300 hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
