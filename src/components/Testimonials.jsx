import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    name: 'Rajesh Sharma',
    location: 'Delhi, India',
    initials: 'RS',
    color: 'from-blue-500 to-blue-700',
    rating: 5,
    text: 'The Panch Kedar Yatra was a once-in-a-lifetime experience. The guides were knowledgeable, the arrangements were impeccable, and the spiritual energy at each temple was beyond words. Highly recommended for any devotee of Lord Shiva.',
    package: 'Complete Panch Kedar Circuit',
  },
  {
    name: 'Priya Patel',
    location: 'Mumbai, India',
    initials: 'PP',
    color: 'from-pink-500 to-pink-700',
    rating: 5,
    text: 'As a solo female traveler, I felt completely safe throughout the journey. The team at Panch Kedar Yatra took care of every detail – from comfortable stays to nourishing meals at high altitudes. The Tungnath sunrise was magical!',
    package: 'Tungnath-Chandrashila Trek',
  },
  {
    name: 'Amit Verma',
    location: 'Bangalore, India',
    initials: 'AV',
    color: 'from-green-500 to-green-700',
    rating: 5,
    text: 'We booked the Kedarnath Yatra for our family including elderly parents. The team arranged ponies, comfortable lodging, and ensured my parents could complete the darshan without difficulty. Professional and compassionate service.',
    package: 'Kedarnath Yatra',
  },
  {
    name: 'Sunita Devi',
    location: 'Jaipur, India',
    initials: 'SD',
    color: 'from-purple-500 to-purple-700',
    rating: 5,
    text: 'The Rudranath trek was challenging but the alpine meadows made every step worth it. Our guide Raju bhai shared beautiful stories about each temple. The camping under the stars near Panar bugyal was unforgettable.',
    package: 'Rudranath Trek',
  },
  {
    name: 'Vikram Singh',
    location: 'Chandigarh, India',
    initials: 'VS',
    color: 'from-amber-500 to-amber-700',
    rating: 5,
    text: 'Third time booking with Panch Kedar Yatra and they never disappoint. This time we did the Madmaheshwar trek – the Chaukhamba views were spectacular. Their eco-friendly approach to trekking is commendable.',
    package: 'Madmaheshwar Trek',
  },
  {
    name: 'Kavita Nair',
    location: 'Kochi, India',
    initials: 'KN',
    color: 'from-teal-500 to-teal-700',
    rating: 5,
    text: 'The Kalpeshwar visit was perfect for our short trip. Easy trek, beautiful valley, and the ancient cave temple was awe-inspiring. The local homestay arranged by the team gave us authentic Garhwali hospitality.',
    package: 'Kalpeshwar Temple Visit',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage:
            'url(/images/tungnath/tungnath-drone-1.webp)',
        }}
      />
      <div className="absolute inset-0 bg-primary-900/85" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-accent-400 font-semibold text-sm tracking-widest uppercase mb-3 block">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white mb-4 leading-tight">
            What Our <span className="text-accent-400">Pilgrims</span> Say
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Thousands of satisfied pilgrims and trekkers trust us with their sacred journey.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
          }}
          className="pb-14"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mx-2 mb-4">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-accent-400 fill-accent-400" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-white/80 leading-relaxed mb-6 text-sm md:text-base italic">
                  "{t.text}"
                </p>
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center border-2 border-accent-400 flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">{t.initials}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                    <p className="text-white/50 text-xs">{t.location}</p>
                    <p className="text-accent-400 text-xs mt-0.5">{t.package}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
