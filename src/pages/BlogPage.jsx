import { Link } from 'react-router-dom';
import { FiClock, FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi';
import PageBanner from '../components/PageBanner';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import blogPosts from '../data/blogPosts';

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      <SEO
        title="Blog & Travel Guides"
        description="Panch Kedar Yatra blog – trekking tips, packing guides, spiritual stories, and expert advice for Kedarnath, Tungnath, Rudranath, Madmaheshwar & Kalpeshwar treks."
        canonical="/blog"
        image="/images/kedarnath/kedarnath-5.webp"
      />
      <PageBanner
        title="Blog & Stories"
        subtitle="Insights, travel guides, and inspirational stories from the Himalayas"
        breadcrumbs={[{ label: 'Blog' }]}
        bgImage="/images/kedarnath/kedarnath-5.jpg"
      />

      {/* Featured Post */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center" data-aos="fade-up">
            <div className="relative rounded-2xl overflow-hidden shadow-card group">
              <OptimizedImage
                src={featured.image}
                alt={featured.title}
                className="w-full h-72 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {featured.category}
              </div>
            </div>
            <div>
              <span className="text-accent-500 font-semibold text-sm uppercase tracking-wider">Featured Article</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mt-2 mb-4">
                {featured.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1"><FiCalendar /> {featured.date}</span>
                <span className="flex items-center gap-1"><FiUser /> {featured.author}</span>
                <span className="flex items-center gap-1"><FiClock /> {featured.readTime}</span>
              </div>
              <Link
                to={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-2 bg-primary-800 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-colors font-medium"
              >
                Read Article <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-primary-900 text-center mb-10" data-aos="fade-up">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post, i) => (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative overflow-hidden">
                    <OptimizedImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><FiCalendar /> {post.date}</span>
                    <span className="flex items-center gap-1"><FiClock /> {post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-display font-bold text-primary-900 mb-2 group-hover:text-accent-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-sm font-medium text-primary-800 hover:text-accent-500 transition-colors inline-flex items-center gap-1"
                  >
                    Read More <FiArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-3xl mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-primary-200 mb-8">Get the latest trekking tips, season updates, and exclusive offers delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-full border-0 focus:ring-2 focus:ring-accent-500 text-sm"
            />
            <button type="submit" className="bg-accent-500 text-white px-6 py-3 rounded-full hover:bg-accent-600 transition-colors font-medium text-sm whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
