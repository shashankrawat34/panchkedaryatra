import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn } from 'react-icons/fi';
import OptimizedImage from './OptimizedImage';
import { toWebP } from '../utils/image';

const galleryImages = [
  // Best picks from each Kedar for the homepage gallery (16 images)
  { src: '/images/kedarnath/kedarnath-1.jpg', alt: 'Kedarnath Temple with snow-capped peaks in the background', category: 'Kedarnath', tall: true },
  { src: '/images/tungnath/tungnath-1.jpg', alt: 'Sunrise over the Chopta meadows leading to Tungnath', category: 'Tungnath', tall: false },
  { src: '/images/rudranath/rudra-1.png', alt: 'Alpine meadows on the Rudranath trek route', category: 'Rudranath', tall: false },
  { src: '/images/madhyamaheshwar/madhya-1.jpg', alt: 'Chaukhamba peaks viewed from Madmaheshwar trek', category: 'Madmaheshwar', tall: true },
  { src: '/images/kalpeshwar/kalpeshwar.jpg', alt: 'Urgam Valley near Kalpeshwar temple', category: 'Kalpeshwar', tall: false },
  { src: '/images/kedarnath/kedarnath-3.jpg', alt: 'Aerial view of the trail leading to Kedarnath shrine', category: 'Kedarnath', tall: false },
  { src: '/images/tungnath/tungnath-drone-1.jpg', alt: 'Aerial drone view of the Tungnath trek ridge and valley', category: 'Tungnath', tall: true },
  { src: '/images/rudranath/rudra-2.png', alt: 'Foggy morning trek through rhododendron forests to Rudranath', category: 'Rudranath', tall: false },
  { src: '/images/madhyamaheshwar/madhya-3.jpg', alt: 'Serene lake reflecting mountain peaks near Madmaheshwar', category: 'Madmaheshwar', tall: false },
  { src: '/images/kedarnath/kedarnath-5.jpg', alt: 'Golden hour light illuminating Kedarnath valley', category: 'Kedarnath', tall: true },
  { src: '/images/tungnath/tungnath-5.jpg', alt: 'Lush green Chopta meadows with Tungnath temple in distance', category: 'Tungnath', tall: false },
  { src: '/images/madhyamaheshwar/madhya-10.jpg', alt: 'Dramatic cloud formations over Madmaheshwar valley', category: 'Madmaheshwar', tall: false },
  { src: '/images/rudranath/rudra-8.jpg', alt: 'Vast alpine bugyals and wildflowers near Rudranath', category: 'Rudranath', tall: true },
  { src: '/images/tungnath/tungnath-doli.jpg', alt: 'Traditional doli procession from Tungnath temple', category: 'Tungnath', tall: false },
  { src: '/images/kalpeshwar/kalp-4.png', alt: 'Ancient rock-cut Kalpeshwar temple in the Urgam Valley', category: 'Kalpeshwar', tall: false },
  { src: '/images/madhyamaheshwar/madhya-7.jpg', alt: 'Traditional Garhwali village houses along the Madmaheshwar route', category: 'Madmaheshwar', tall: true },
];

// Per-category color-graded hover overlays
const itemOverlayColor = {
  Kedarnath: 'group-hover:bg-kedarnath-900/60',
  Tungnath: 'group-hover:bg-tungnath-900/60',
  Rudranath: 'group-hover:bg-rudranath-900/60',
  Madmaheshwar: 'group-hover:bg-madmaheshwar-900/65',
  Kalpeshwar: 'group-hover:bg-kalpeshwar-900/65',
};

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            Gallery
          </span>
          <h2 className="section-title" id="gallery-heading">
            Glimpses of <span className="text-accent-500">Panch Kedar</span>
          </h2>
          <p className="section-subtitle">
            Witness the divine beauty of the five sacred Kedar shrines and the stunning trails that lead to them.
          </p>
        </div>

        {/* Masonry Grid – color-graded per category */}
        <div className="gallery-masonry" data-aos="fade-up" data-aos-delay="100">
          {galleryImages.map((img, idx) => {
            const overlayClass = itemOverlayColor[img.category] || 'group-hover:bg-primary-900/50';
            return (
              <div
                key={idx}
                className="gallery-item group relative rounded-xl overflow-hidden cursor-pointer"
                data-category={img.category}
                onClick={() => setLightbox(img)}
                role="button"
                tabIndex={0}
                aria-label={`View larger: ${img.alt}`}
                onKeyDown={(e) => e.key === 'Enter' && setLightbox(img)}
              >
                <OptimizedImage
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    img.tall ? 'h-72 md:h-80' : 'h-48 md:h-56'
                  }`}
                />
                <div className={`absolute inset-0 bg-transparent ${overlayClass} transition-colors duration-300 flex items-center justify-center`}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <FiZoomIn className="w-8 h-8 text-white mx-auto mb-2 drop-shadow-lg" />
                    <span className="text-white text-sm font-semibold drop-shadow-lg">{img.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <FiX className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={toWebP(lightbox.src)}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 text-center text-white">
              <p className="text-sm opacity-80">{lightbox.alt}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
