import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiShield, FiUsers, FiMapPin, FiHeart } from 'react-icons/fi';
import OptimizedImage from './OptimizedImage';

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
    description: 'Committed to sustainable tourism – we practice Leave No Trace principles across every trek route.',
  },
];

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <div className="relative" data-aos="fade-right">
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <OptimizedImage
                src="/images/tungnath/tungnath-1.jpg"
                alt="Pilgrims trekking through lush green Himalayan valleys towards Tungnath temple"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-xl shadow-card-hover p-4 md:p-5 max-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">5</span>
                </div>
                <div>
                  <div className="font-heading font-bold text-primary-800 text-lg">Sacred Kedars</div>
                  <div className="text-primary-600 text-sm">Since 2018</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div data-aos="fade-left">
            <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
              About Us
            </span>
            <h2 className="section-title text-left">
              Your Trusted Partner for{' '}
              <span className="text-accent-500">Panch Kedar</span> Pilgrimage
            </h2>
            <p className="text-primary-800 leading-relaxed mb-6">
              The Panch Kedar Yatra is one of the most revered pilgrimages in Hinduism, 
              tracing the path of the Pandavas who sought Lord Shiva's blessings across five 
              ancient temples nestled high in the Garhwal Himalayas of Uttarakhand. Each temple 
              holds a unique part of Lord Shiva's divine form, making this journey a profound 
              spiritual odyssey.
            </p>
            <p className="text-primary-800 leading-relaxed mb-8">
              At Panch Kedar Yatra, we have been guiding pilgrims and adventure seekers through 
              these sacred routes for over 8 years. Our team of certified mountaineering guides, 
              comfortable camping arrangements, nutritious meals, and comprehensive logistics 
              ensure your yatra is safe, memorable, and deeply fulfilling. We are committed to 
              eco-friendly tourism and community-driven travel that respects these pristine landscapes.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                  >
                    <div className="w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-primary-800 text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-primary-700 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
