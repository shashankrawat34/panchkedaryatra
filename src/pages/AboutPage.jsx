import PageBanner from '../components/PageBanner';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { FiShield, FiUsers, FiMapPin, FiHeart, FiAward, FiStar, FiSun, FiTrendingUp } from 'react-icons/fi';

const features = [
  {
    icon: FiShield,
    title: 'Certified Guides',
    description: 'All our guides are certified by the Indian Mountaineering Foundation with 10+ years of Himalayan experience.',
  },
  {
    icon: FiUsers,
    title: '8+ Years Expertise',
    description: 'Years of organizing sacred yatras with an impeccable safety record and thousands of satisfied pilgrims.',
  },
  {
    icon: FiMapPin,
    title: 'All 5 Kedars Covered',
    description: 'Comprehensive packages spanning Kedarnath, Tungnath, Rudranath, Madmaheshwar, and Kalpeshwar.',
  },
  {
    icon: FiHeart,
    title: 'Eco-Friendly Tours',
    description: 'Committed to sustainable tourism — we practice Leave No Trace principles across every trek route.',
  },
  {
    icon: FiAward,
    title: 'Safety First',
    description: 'Every trek includes first-aid trained staff, oxygen cylinders at high camps, and emergency evacuation protocols.',
  },
  {
    icon: FiStar,
    title: '5000+ Happy Pilgrims',
    description: 'Thousands of pilgrims and trekkers trust us with their sacred journey year after year, with 4.9-star average ratings.',
  },
  {
    icon: FiSun,
    title: 'Comfortable Stays',
    description: 'From cozy guesthouses to quality camping setups with proper sleeping bags, mats, and dining tents.',
  },
  {
    icon: FiTrendingUp,
    title: 'Flexible Packages',
    description: 'Choose from budget-friendly to premium options. We customize itineraries to match your pace and preferences.',
  },
];

const milestones = [
  { year: '2004', text: 'Founded in Uttarakhand with a mission to provide safe pilgrimage services' },
  { year: '2008', text: 'Completed first full Panch Kedar Circuit expedition with 12 pilgrims' },
  { year: '2012', text: 'Expanded to 50+ annual group departures across all five Kedar routes' },
  { year: '2015', text: 'Received Uttarakhand Tourism Excellence Award for responsible tourism' },
  { year: '2020', text: 'Launched eco-friendly camping initiative — zero single-use plastic on all treks' },
  { year: '2024', text: 'Crossed 5,000+ happy pilgrims with industry-leading 4.9-star average rating' },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Panch Kedar Yatra – 8+ years of organizing safe, eco-friendly pilgrimages to all five sacred Kedar shrines in the Garhwal Himalayas, Uttarakhand."
        canonical="/about"
        image="/images/tungnath/tungnath-1.webp"
      />
      <PageBanner
        title="About Us"
        subtitle="Your trusted partner for Panch Kedar pilgrimage since 2004"
        breadcrumbs={[{ label: 'About Us' }]}
        bgImage="/images/tungnath/tungnath-1.jpg"
      />

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative" data-aos="fade-right">
              <div className="rounded-2xl overflow-hidden shadow-card">
                <OptimizedImage
                  src="/images/tungnath/tungnath-1.jpg"
                  alt="Pilgrims trekking through lush green Himalayan valleys towards Tungnath temple"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-xl shadow-card-hover p-4 md:p-5 max-w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">5</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-primary-800 text-lg">Sacred Kedars</div>
                    <div className="text-gray-500 text-sm">Since 2004</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div data-aos="fade-left">
              <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
                Our Story
              </span>
              <h2 className="section-title text-left">
                Your Trusted Partner for{' '}
                <span className="text-accent-500">Panch Kedar</span> Pilgrimage
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Panch Kedar Yatra is one of the most revered pilgrimages in Hinduism,
                tracing the path of the Pandavas who sought Lord Shiva's blessings across five
                ancient temples nestled high in the Garhwal Himalayas of Uttarakhand. Each temple
                holds a unique part of Lord Shiva's divine form, making this journey a profound
                spiritual odyssey.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Panch Kedar Yatra, we have been guiding pilgrims and adventure seekers through
                these sacred routes for over 8 years. Our team of certified mountaineering guides,
                comfortable camping arrangements, nutritious meals, and comprehensive logistics
                ensure your yatra is safe, memorable, and deeply fulfilling.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are committed to eco-friendly tourism and community-driven travel that respects
                these pristine landscapes. Every trek supports local communities through employment,
                homestays, and cultural exchange — because we believe responsible tourism and authentic
                experiences go hand in hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14" data-aos="fade-up">
            <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
              Why Choose Us
            </span>
            <h2 className="section-title">
              What Makes Us <span className="text-accent-500">Different</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-card transition-shadow duration-300"
                  data-aos="fade-up"
                  data-aos-delay={idx * 80}
                >
                  <div className="w-12 h-12 bg-primary-800 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary-800 text-base mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14" data-aos="fade-up">
            <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
              Our Journey
            </span>
            <h2 className="section-title">
              Milestones <span className="text-accent-500">Over the Years</span>
            </h2>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-100 -translate-x-1/2" />
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                className={`relative flex items-start gap-6 mb-10 md:mb-12 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-accent-500 rounded-full border-4 border-white shadow -translate-x-1/2 flex items-center justify-center z-10">
                  <span className="w-2 h-2 bg-white rounded-full" />
                </div>
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <span className="text-accent-500 font-bold text-lg font-heading">{m.year}</span>
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '8+', label: 'Years Experience' },
              { value: '5000+', label: 'Happy Pilgrims' },
              { value: '50+', label: 'Expert Guides' },
              { value: '4.9★', label: 'Average Rating' },
            ].map((s) => (
              <div key={s.label} data-aos="zoom-in">
                <div className="text-3xl md:text-4xl font-bold text-accent-400 font-heading">{s.value}</div>
                <div className="text-white/60 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
