import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FiStar } from 'react-icons/fi';
import PageBanner from '../components/PageBanner';
import SEO from '../components/SEO';

const testimonials = [
  {
    name: 'Rajesh Sharma',
    role: 'Software Engineer, Delhi',
    initials: 'RS',
    color: 'from-blue-500 to-blue-700',
    rating: 5,
    text: 'The Kedarnath trek was an absolutely life-changing experience! The team at Panch Kedar Yatra ensured every detail was taken care of — from comfortable stays to knowledgeable guides. The views were beyond anything I\'ve ever witnessed.',
  },
  {
    name: 'Priya Patel',
    role: 'Teacher, Mumbai',
    initials: 'PP',
    color: 'from-pink-500 to-pink-700',
    rating: 5,
    text: 'I joined the Tungnath-Chandrashila trek and it exceeded all my expectations. The 360° summit view at sunrise was magical. Guides were incredibly supportive and made the trek accessible for someone like me who was a beginner.',
  },
  {
    name: 'Amit Kumar',
    role: 'Photographer, Bangalore',
    initials: 'AK',
    color: 'from-green-500 to-green-700',
    rating: 5,
    text: 'As a photographer, I was blown away by the landscapes on the Rudranath trek. The team knew exactly which camps would offer the best views. Every frame was a masterpiece waiting to happen. Highly recommend!',
  },
  {
    name: 'Sneha Reddy',
    role: 'Doctor, Hyderabad',
    initials: 'SR',
    color: 'from-purple-500 to-purple-700',
    rating: 4,
    text: 'The Madmaheshwar trek was beautifully organized. The food was delicious, the camping arrangements were comfortable, and the Chaukhamba views along the way were absolutely breathtaking. Will definitely come back!',
  },
  {
    name: 'Vikram Singh',
    role: 'Retired Army Officer, Dehradun',
    initials: 'VS',
    color: 'from-amber-500 to-amber-700',
    rating: 5,
    text: 'Having trekked extensively in the Himalayas, I can say Panch Kedar Yatra is one of the best operators I\'ve experienced. Their attention to safety and environmental responsibility is commendable. The complete circuit was unforgettable.',
  },
  {
    name: 'Meera Joshi',
    role: 'Yoga Instructor, Rishikesh',
    initials: 'MJ',
    color: 'from-teal-500 to-teal-700',
    rating: 5,
    text: 'The spiritual energy on the Kalpeshwar temple visit was immense. The team created a perfect blend of adventure and devotion throughout our journey. I felt safe, inspired, and deeply connected to the mountains.',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-orange-400 fill-orange-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <SEO
        title="Testimonials"
        description="Read reviews from trekkers and pilgrims who completed Panch Kedar Yatra treks. Real experiences from Kedarnath, Tungnath, Rudranath, Madmaheshwar & Kalpeshwar."
        canonical="/testimonials"
        image="/images/kedarnath/kedarnath-6.webp"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'Panch Kedar Yatra',
          url: 'https://panchkedaryatra.in',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            bestRating: '5',
            worstRating: '1',
            ratingCount: '6',
          },
        }}
      />
      <PageBanner
        title="Testimonials"
        subtitle="What our trekkers say about their unforgettable Panch Kedar experiences"
        breadcrumbs={[{ label: 'Testimonials' }]}
        bgImage="/images/kedarnath/kedarnath-6.jpg"
      />

      {/* Featured Slider */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 text-center mb-12">
            Voices From the Mountains
          </h2>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 6000 }}
            pagination={{ clickable: true }}
            navigation
            className="testimonial-slider"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-12 text-center shadow-card">
                  <div className={`w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg mb-6 bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-2xl">{t.initials}</span>
                  </div>
                  <StarRating rating={t.rating} />
                  <p className="text-lg md:text-xl text-primary-800 italic mt-4 mb-6 max-w-2xl mx-auto leading-relaxed">
                    "{t.text}"
                  </p>
                  <h4 className="text-xl font-display font-bold text-primary-900">{t.name}</h4>
                  <p className="text-sm text-accent-500">{t.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-primary-900 text-center mb-10" data-aos="fade-up">
            All Reviews
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center border-2 border-primary-100 flex-shrink-0`}>
                    <span className="text-white font-bold text-lg">{t.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-900">{t.name}</h4>
                    <p className="text-sm text-primary-600">{t.role}</p>
                  </div>
                </div>
                <StarRating rating={t.rating} />
                <p className="text-primary-700 mt-3 text-sm leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '500+', label: 'Happy Trekkers' },
            { value: '4.9', label: 'Average Rating' },
            { value: '100%', label: 'Would Recommend' },
            { value: '8+', label: 'Years Experience' },
          ].map((s, i) => (
            <div key={i} data-aos="zoom-in" data-aos-delay={i * 120}>
              <div className="text-3xl md:text-4xl font-bold text-white">{s.value}</div>
              <div className="text-primary-200 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
