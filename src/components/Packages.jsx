import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiCheck, FiArrowRight } from 'react-icons/fi';
import OptimizedImage from './OptimizedImage';

const packages = [
  {
    id: 1,
    slug: 'kedarnath-yatra',
    title: 'Kedarnath Yatra',
    image: '/images/kedarnath/kedarnath-1.jpg',
    duration: '4 Days / 3 Nights',
    price: '₹10,499',
    priceNote: 'per person',
    location: 'Kedarnath, Uttarakhand',
    highlights: [
      'Helicopter option available',
      'Comfortable guesthouse stays',
      'Experienced local guides',
      'All meals included',
      'Rudraprayag & Gaurikund visits',
    ],
    description: 'Visit the most revered of the Panch Kedars – the majestic Kedarnath Temple at 3,563m.',
    badge: 'Most Popular',
    badgeColor: 'bg-accent-500',
  },
  {
    id: 2,
    slug: 'tungnath-chandrashila-trek',
    title: 'Tungnath-Chandrashila Trek',
    image: '/images/tungnath/tungnath-1.jpg',
    duration: '4 Days / 3 Nights',
    price: '₹4,499',
    priceNote: 'per person',
    location: 'Chopta, Uttarakhand',
    highlights: [
      'World\'s highest Shiva temple',
      'Chandrashila summit (3,656m)',
      'Panoramic Himalayan views',
      'Camp under the stars',
      'Beginner-friendly trail',
    ],
    description: 'Reach Tungnath, the highest Shiva temple in the world at 3,489m.',
    badge: 'Best Value',
    badgeColor: 'bg-green-500',
  },
  {
    id: 3,
    slug: 'rudranath-trek',
    title: 'Rudranath Trek',
    image: '/images/rudranath/rudra-1.png',
    duration: '5 Days / 4 Nights',
    price: '₹10,499',
    priceNote: 'per person',
    location: 'Gopeshwar, Uttarakhand',
    highlights: [
      'Alpine meadows (bugyals)',
      'Pristine Panar & Pitradhar camps',
      'Ancient cave temples',
      'Rich wildlife spotting',
      'Offbeat & uncrowded trails',
    ],
    description: 'Trek to the remote Rudranath temple at 3,549m through stunning alpine meadows.',
    badge: null,
    badgeColor: '',
  },
  {
    id: 4,
    slug: 'madmaheshwar-trek',
    title: 'Madmaheshwar Trek',
    image: '/images/madhyamaheshwar/madhya-1.jpg',
    duration: '4 Days / 3 Nights',
    price: '₹9,499',
    priceNote: 'per person',
    location: 'Ukhimath, Uttarakhand',
    highlights: [
      'Stunning Chaukhamba views',
      'Lush rhododendron forests',
      'Sacred Madmaheshwar temple',
      'Bantoli & Ransi villages',
      'Cultural immersion experience',
    ],
    description: 'Journey to Madmaheshwar at 3,239m, where Lord Shiva\'s navel is worshipped.',
    badge: null,
    badgeColor: '',
  },
  {
    id: 5,
    slug: 'rudranath-kalpeshwar-temple-visit',
    title: 'Rudranath & Kalpeshwar Temple Visit',
    image: '/images/kalpeshwar/kalpeshwar.jpg',
    duration: '5 Days / 4 Nights',
    price: '₹12,499',
    priceNote: 'per person',
    location: 'Urgam Valley, Uttarakhand',
    highlights: [
      'Only Kedar accessible year-round',
      'Easy trek suitable for all ages',
      'Urgam Valley exploration',
      'Ancient rock-cut temple',
      'Local village homestay',
    ],
    description: 'Visit Kalpeshwar, the only Panch Kedar temple accessible throughout the year.',
    badge: 'Easy Trek',
    badgeColor: 'bg-blue-500',
  },
  {
    id: 6,
    slug: 'complete-panch-kedar-circuit-with-badrinath',
    title: 'Complete Panch Kedar Circuit with Badrinath',
    image: '/images/kedarnath/kedarnath-3.jpg',
    duration: '12 Days / 11 Nights',
    price: '₹38,999',
    priceNote: 'per person',
    location: 'All 5 Kedars, Uttarakhand',
    highlights: [
      'All five sacred Kedar temples',
      'Professional mountaineering guide',
      'Porters & pack mules included',
      'All meals & accommodation',
      'Certificate of completion',
    ],
    description: 'The ultimate spiritual odyssey — visit all five Panch Kedar temples in one expedition.',
    badge: 'Ultimate Journey',
    badgeColor: 'bg-purple-600',
  },
  {
    id: 7,
    slug: 'kedarnath-tungnath-combo',
    title: 'Kedarnath + Tungnath Combo',
    image: '/images/tungnath/tungnath-2.jpg',
    duration: '8 Days / 7 Nights',
    price: '₹14,000',
    priceNote: 'per person',
    location: 'Kedarnath & Chopta',
    highlights: [
      'Two iconic Kedar temples',
      'Chopta meadow camping',
      'Gaurikund hot springs',
      'Chandrashila sunrise trek',
      'Comfortable lodging throughout',
    ],
    description: 'Combine the two most popular Panch Kedar pilgrimages in one memorable trip.',
    badge: 'Combo Deal',
    badgeColor: 'bg-accent-500',
  },
  {
    id: 8,
    slug: 'rudranath-madmaheshwar-trek',
    title: 'Rudranath + Madmaheshwar Trek',
    image: '/images/rudranath/rudra-2.png',
    duration: '9 Days / 8 Nights',
    price: '₹19,999',
    priceNote: 'per person',
    location: 'Gopeshwar & Ukhimath',
    highlights: [
      'Two remote Kedar temples',
      'Epic alpine meadow camping',
      'Rich biodiversity trails',
      'Interact with local shepherds',
      'Offbeat adventure experience',
    ],
    description: 'For the adventurous soul — trek to the two most remote Panch Kedar temples.',
    badge: 'Adventure',
    badgeColor: 'bg-red-500',
  },
];

// Trek-specific color grading for package cards
const trekAccentColors = {
  'kedarnath-yatra': 'bg-kedarnath-500',
  'tungnath-chandrashila-trek': 'bg-tungnath-500',
  'rudranath-trek': 'bg-rudranath-500',
  'madmaheshwar-trek': 'bg-madmaheshwar-500',
  'rudranath-kalpeshwar-temple-visit': 'bg-kalpeshwar-500',
  'complete-panch-kedar-circuit-with-badrinath': 'bg-gradient-to-r from-kedarnath-500 via-tungnath-500 to-rudranath-500',
  'kedarnath-tungnath-combo': 'bg-gradient-to-r from-kedarnath-500 to-tungnath-500',
  'rudranath-madmaheshwar-trek': 'bg-gradient-to-r from-rudranath-500 to-madmaheshwar-500',
};

export default function Packages() {
  return (
    <section id="packages" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            Our Packages
          </span>
          <h2 className="section-title">
            Panch Kedar <span className="text-accent-500">Yatra Packages</span>
          </h2>
          <p className="section-subtitle">
            Choose from our carefully curated pilgrimage and trekking packages designed 
            for every level of experience and devotion.
          </p>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg, idx) => (
            <Link
              key={pkg.id}
              to={`/packages/${pkg.slug}`}
              className="card group relative"
              data-aos="fade-up"
              data-aos-delay={idx * 80}
            >
              {/* Trek-specific color accent bar */}
              <div className={`trek-accent-bar ${trekAccentColors[pkg.slug] || 'bg-primary-500'}`} />
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
                <span className="w-full flex items-center justify-center gap-2 text-primary-800 
                                   font-semibold text-sm py-2.5 border-2 border-primary-800 
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
  );
}
