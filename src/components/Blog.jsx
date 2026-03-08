import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import OptimizedImage from './OptimizedImage';
import { getHomeBlogPosts } from '../data/blogPosts';

const blogPosts = getHomeBlogPosts();

export default function Blog() {
  return (
    <section id="blog" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            Blog & News
          </span>
          <h2 className="section-title">
            Latest from <span className="text-accent-500">Our Journal</span>
          </h2>
          <p className="section-subtitle">
            Travel tips, mythological stories, and practical guides for your Panch Kedar pilgrimage.
          </p>
        </div>

        {/* News Ticker */}
        <div className="mb-10 bg-primary-800 text-white py-3 rounded-xl overflow-hidden" data-aos="fade-up">
          <div className="ticker-wrap">
            <div className="ticker-content">
              {[...blogPosts, ...blogPosts].map((post, idx) => (
                <span key={idx} className="inline-flex items-center gap-4 mx-8 text-sm">
                  <span className="bg-accent-500 text-xs px-2 py-0.5 rounded font-bold">{post.category}</span>
                  <span className="text-white/90">{post.title}</span>
                  <span className="text-white/40">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, idx) => (
            <article
              key={idx}
              className="card group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </Link>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-primary-600 mb-2">
                  <FiCalendar className="w-3.5 h-3.5" />
                  {post.date}
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-heading font-bold text-primary-800 text-base mb-2 leading-snug group-hover:text-accent-500 transition-colors duration-300">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-primary-700 text-xs leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.slug}`} className="flex items-center gap-1.5 text-primary-800 hover:text-accent-500 text-sm font-semibold transition-colors duration-300" aria-label={`Read full article: ${post.title}`}>
                  Read More <FiArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
