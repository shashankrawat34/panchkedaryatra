import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn } from 'react-icons/fi';
import PageBanner from '../components/PageBanner';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { toWebP } from '../utils/image';

const galleryImages = [
  // Kedarnath (6)
  { src: '/images/kedarnath/kedarnath-1.jpg', alt: 'Kedarnath Temple with snow-capped peaks in the background', category: 'Kedarnath', tall: true },
  { src: '/images/kedarnath/kedarnath-3.jpg', alt: 'Aerial view of the trail leading to Kedarnath shrine', category: 'Kedarnath', tall: false },
  { src: '/images/kedarnath/kedarnath-4.jpg', alt: 'Pilgrims making their way through misty mountain passes near Kedarnath', category: 'Kedarnath', tall: false },
  { src: '/images/kedarnath/kedarnath-5.jpg', alt: 'Golden hour light illuminating Kedarnath valley', category: 'Kedarnath', tall: true },
  { src: '/images/kedarnath/kedarnath-6.jpg', alt: 'Kedarnath temple architecture and carvings up close', category: 'Kedarnath', tall: false },
  { src: '/images/kedarnath/kedarnath-7.jpg', alt: 'Snow-covered landscape around Kedarnath during early season', category: 'Kedarnath', tall: false },

  // Tungnath (8)
  { src: '/images/tungnath/tungnath-1.jpg', alt: 'Sunrise over the Chopta meadows leading to Tungnath', category: 'Tungnath', tall: false },
  { src: '/images/tungnath/tungnath-2.jpg', alt: 'Majestic Himalayan mountain range at dawn from Tungnath trail', category: 'Tungnath', tall: true },
  { src: '/images/tungnath/tungnath-3.jpg', alt: 'Panoramic views along the Tungnath-Chandrashila ridge', category: 'Tungnath', tall: false },
  { src: '/images/tungnath/tungnath-5.jpg', alt: 'Lush green Chopta meadows with Tungnath temple in distance', category: 'Tungnath', tall: true },
  { src: '/images/tungnath/tungnath-8.jpg', alt: 'Tungnath temple — highest Shiva temple in the world at 3,680m', category: 'Tungnath', tall: false },
  { src: '/images/tungnath/tungnath-doli.jpg', alt: 'Traditional doli procession carrying deity from Tungnath temple', category: 'Tungnath', tall: false },
  { src: '/images/tungnath/tungnath-drone-1.jpg', alt: 'Aerial drone view of the Tungnath trek ridge and valley', category: 'Tungnath', tall: true },
  { src: '/images/tungnath/tungnath-drone-2.jpg', alt: 'Bird\'s-eye drone view of Tungnath temple amidst the clouds', category: 'Tungnath', tall: false },

  // Rudranath (7)
  { src: '/images/rudranath/rudra-1.png', alt: 'Alpine meadows on the Rudranath trek route', category: 'Rudranath', tall: false },
  { src: '/images/rudranath/rudra-2.png', alt: 'Foggy morning trek through rhododendron forests to Rudranath', category: 'Rudranath', tall: true },
  { src: '/images/rudranath/rudranath-3.jpg', alt: 'Ancient Rudranath cave temple nestled in the mountains', category: 'Rudranath', tall: false },
  { src: '/images/rudranath/rudra-7.jpg', alt: 'Trekkers crossing high-altitude pass on the Rudranath trail', category: 'Rudranath', tall: false },
  { src: '/images/rudranath/rudra-8.jpg', alt: 'Vast alpine bugyals and wildflowers near Rudranath', category: 'Rudranath', tall: true },
  { src: '/images/rudranath/rudra-9.png', alt: 'Steep rocky ascent along the Rudranath trek', category: 'Rudranath', tall: false },
  { src: '/images/rudranath/rudra-10.jpg', alt: 'Sunset glow over the Rudranath mountain peaks', category: 'Rudranath', tall: false },

  // Madmaheshwar (9)
  { src: '/images/madhyamaheshwar/madhya-1.jpg', alt: 'Chaukhamba peaks viewed from Madmaheshwar trek', category: 'Madmaheshwar', tall: true },
  { src: '/images/madhyamaheshwar/madhya-2.png', alt: 'Lush forests and river valley on the Madmaheshwar trail', category: 'Madmaheshwar', tall: false },
  { src: '/images/madhyamaheshwar/madhya-3.jpg', alt: 'Serene lake reflecting mountain peaks near Madmaheshwar', category: 'Madmaheshwar', tall: false },
  { src: '/images/madhyamaheshwar/madhya-4.png', alt: 'Madmaheshwar temple surrounded by pristine meadows', category: 'Madmaheshwar', tall: true },
  { src: '/images/madhyamaheshwar/madhya-5.jpg', alt: 'Green valley with river flowing from glaciers towards Madmaheshwar', category: 'Madmaheshwar', tall: false },
  { src: '/images/madhyamaheshwar/madhya-6.jpg', alt: 'Snow-capped Himalayan range from Madmaheshwar campsite', category: 'Madmaheshwar', tall: false },
  { src: '/images/madhyamaheshwar/madhya-7.jpg', alt: 'Traditional Garhwali village houses along the Madmaheshwar route', category: 'Madmaheshwar', tall: true },
  { src: '/images/madhyamaheshwar/madhya-10.jpg', alt: 'Dramatic cloud formations over Madmaheshwar valley', category: 'Madmaheshwar', tall: false },
  { src: '/images/madhyamaheshwar/madhya-11.jpg', alt: 'Trekkers resting at a high camp near Madmaheshwar', category: 'Madmaheshwar', tall: false },

  // Kalpeshwar (2)
  { src: '/images/kalpeshwar/kalpeshwar.jpg', alt: 'Urgam Valley near Kalpeshwar temple', category: 'Kalpeshwar', tall: false },
  { src: '/images/kalpeshwar/kalp-4.png', alt: 'Ancient rock-cut Kalpeshwar temple in the Urgam Valley', category: 'Kalpeshwar', tall: true },
];

const categories = ['All', ...new Set(galleryImages.map((i) => i.category))];

// Interactive color grading – per-category color palette
const categoryColors = {
  All: { active: 'bg-primary-800 text-white shadow-md', hover: 'hover:bg-primary-100 hover:text-primary-800', overlay: 'bg-primary-900/50', accent: '#1e3a8a' },
  Kedarnath: { active: 'bg-kedarnath-700 text-white shadow-md shadow-kedarnath-200', hover: 'hover:bg-kedarnath-100 hover:text-kedarnath-800', overlay: 'bg-kedarnath-800/50', accent: '#0ca5eb' },
  Tungnath: { active: 'bg-tungnath-700 text-white shadow-md shadow-tungnath-200', hover: 'hover:bg-tungnath-100 hover:text-tungnath-800', overlay: 'bg-tungnath-800/50', accent: '#10b981' },
  Rudranath: { active: 'bg-rudranath-700 text-white shadow-md shadow-rudranath-200', hover: 'hover:bg-rudranath-100 hover:text-rudranath-800', overlay: 'bg-rudranath-800/50', accent: '#a855f7' },
  Madmaheshwar: { active: 'bg-madmaheshwar-700 text-white shadow-md shadow-madmaheshwar-200', hover: 'hover:bg-madmaheshwar-100 hover:text-madmaheshwar-800', overlay: 'bg-madmaheshwar-800/50', accent: '#f59e0b' },
  Kalpeshwar: { active: 'bg-kalpeshwar-700 text-white shadow-md shadow-kalpeshwar-200', hover: 'hover:bg-kalpeshwar-100 hover:text-kalpeshwar-800', overlay: 'bg-kalpeshwar-800/50', accent: '#e45843' },
};

// Per-item overlay color based on category
const itemOverlayColor = {
  Kedarnath: 'group-hover:bg-kedarnath-900/60',
  Tungnath: 'group-hover:bg-tungnath-900/60',
  Rudranath: 'group-hover:bg-rudranath-900/60',
  Madmaheshwar: 'group-hover:bg-madmaheshwar-900/65',
  Kalpeshwar: 'group-hover:bg-kalpeshwar-900/65',
};

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? galleryImages : galleryImages.filter((i) => i.category === filter);
  const activeColor = categoryColors[filter] || categoryColors.All;

  return (
    <>
      <SEO
        title="Photo Gallery"
        description="Browse stunning photos from Panch Kedar Yatra treks – Kedarnath, Tungnath, Rudranath, Madmaheshwar & Kalpeshwar. Himalayan landscapes, temple views & trekking moments."
        canonical="/gallery"
        image="/images/tungnath/tungnath-drone-2.webp"
      />
      <PageBanner
        title="Gallery"
        subtitle="Witness the divine beauty of the five sacred Kedar shrines and their stunning trails"
        breadcrumbs={[{ label: 'Gallery' }]}
        bgImage="/images/tungnath/tungnath-drone-2.jpg"
      />

      <section className="section-padding bg-white section-grade-transition">
        <div className="max-w-7xl mx-auto">
          {/* Color-graded category indicator */}
          <div
            className="h-1 w-24 mx-auto mb-8 rounded-full transition-all duration-500"
            style={{ backgroundColor: activeColor.accent }}
          />

          {/* Filters – color-graded per category */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center" data-aos="fade-up">
            {categories.map((cat) => {
              const colors = categoryColors[cat] || categoryColors.All;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === cat
                      ? colors.active
                      : `bg-gray-100 text-gray-600 ${colors.hover}`
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Masonry – color-graded overlays per image category */}
          <div className="gallery-masonry" data-aos="fade-up">
            {filtered.map((img, idx) => {
              const overlayClass = itemOverlayColor[img.category] || 'group-hover:bg-primary-900/50';
              return (
                <div
                  key={`${img.src}-${idx}`}
                  className="gallery-item group relative rounded-xl overflow-hidden cursor-pointer"
                  data-category={img.category}
                  onClick={() => setLightbox(img)}
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
      </section>

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
            <button className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full" onClick={() => setLightbox(null)} aria-label="Close">
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
    </>
  );
}
