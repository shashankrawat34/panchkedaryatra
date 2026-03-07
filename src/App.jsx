import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';

// Lazy-loaded pages for code splitting
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const TrekDetailPage = lazy(() => import('./pages/TrekDetailPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center pt-24">
      <h1 className="font-heading text-6xl md:text-8xl font-bold text-primary-800 mb-4">404</h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-2">Page Not Found</p>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Page Loader */}
      <div className={`page-loader ${!loading ? 'loaded' : ''}`} aria-hidden={!loading}>
        <div className="flex flex-col items-center gap-4">
          <div className="text-white font-heading text-2xl font-bold text-center">
            Panch Kedar <span className="text-accent-400">Yatra</span>
          </div>
          <p className="text-accent-400 text-[0.65rem] font-medium tracking-wider">by Garhwal Hikes</p>
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-accent-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ width: '60%' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <BrowserRouter>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/packages/:slug" element={<TrekDetailPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </>
  );
}
