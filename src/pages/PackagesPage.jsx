import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiCheck, FiArrowRight } from 'react-icons/fi';
import PageBanner from '../components/PageBanner';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { packages } from '../data/packages';

export default function PackagesPage() {
  return (
    <>
      <SEO
        title="Trekking & Pilgrimage Packages"
        description="Explore our curated Panch Kedar Yatra packages – Kedarnath, Tungnath, Rudranath, Madmaheshwar & Kalpeshwar treks. Prices from ₹4,499. Expert guides, all-inclusive."
        canonical="/packages"
        image="/images/kedarnath/kedarnath-4.webp"
      />
      <PageBanner
        title="Panch Kedar Packages"
        subtitle="Choose from our carefully curated pilgrimage and trekking packages for every level of experience"
        breadcrumbs={[{ label: 'Packages' }]}
        bgImage="/images/kedarnath/kedarnath-4.jpg"
      />

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Filter hint */}
          <div className="flex flex-wrap items-center gap-3 mb-10" data-aos="fade-up">
            <span className="text-primary-600 text-sm font-medium">Showing:</span>
            <span className="bg-primary-50 text-primary-800 text-sm font-semibold px-4 py-1.5 rounded-full">
              All {packages.length} Packages
            </span>
          </div>

          {/* Package Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {packages.map((pkg, idx) => (
              <Link
                key={pkg.id}
                to={`/packages/${pkg.slug}`}
                className="card group block"
                data-aos="fade-up"
                data-aos-delay={idx * 60}
              >
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {pkg.badge && (
                    <span className={`absolute top-3 left-3 ${pkg.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {pkg.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <span className="font-bold text-accent-500 text-sm">{pkg.price}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2 text-xs text-primary-600">
                    <span className="flex items-center gap-1">
                      <FiClock className="w-3.5 h-3.5" /> {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin className="w-3.5 h-3.5" /> {pkg.location.split(',')[0]}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-primary-800 text-lg mb-2 group-hover:text-accent-500 transition-colors duration-300">
                    {pkg.title}
                  </h3>
                  <ul className="space-y-1 mb-4">
                    {pkg.highlights.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-center gap-1.5 text-primary-700 text-xs">
                        <FiCheck className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="w-full flex items-center justify-center gap-2 text-primary-800 hover:text-accent-500
                                     font-semibold text-sm py-2.5 border-2 border-primary-800 hover:border-accent-500
                                     rounded-xl transition-all duration-300 group-hover:bg-accent-500
                                     group-hover:text-white group-hover:border-accent-500">
                    View Details <FiArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
