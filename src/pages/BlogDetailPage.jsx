import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiUser, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import PageBanner from '../components/PageBanner';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import blogPosts, { getBlogPostBySlug } from '../data/blogPosts';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center pt-24">
        <h1 className="font-heading text-6xl md:text-8xl font-bold text-primary-800 mb-4">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-2">Article Not Found</p>
        <p className="text-gray-400 mb-8 max-w-md">
          The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  // Related posts: same category first, then others, excluding current
  const related = blogPosts
    .filter((p) => p.id !== post.id)
    .sort((a, b) => (a.category === post.category ? -1 : 1) - (b.category === post.category ? -1 : 1))
    .slice(0, 3);

  // Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt.substring(0, 160),
    image: `https://panchkedaryatra.in${post.image}`,
    datePublished: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Panch Kedar Yatra',
      url: 'https://panchkedaryatra.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://panchkedaryatra.in/favicon.svg',
      },
    },
  };

  // Split excerpt into paragraphs for readable rendering
  const paragraphs = post.excerpt.split('\n\n').filter(Boolean);

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt.substring(0, 155) + '...'}
        canonical={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        jsonLd={articleJsonLd}
      />
      <PageBanner
        title={post.title}
        subtitle={`By ${post.author} · ${post.readTime}`}
        breadcrumbs={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
        bgImage={post.image}
      />

      {/* Article Body */}
      <article className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
            <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1"><FiCalendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><FiUser className="w-4 h-4" /> {post.author}</span>
            <span className="flex items-center gap-1"><FiClock className="w-4 h-4" /> {post.readTime}</span>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-card mb-10">
            <OptimizedImage
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {paragraphs.map((para, i) => {
              // Handle markdown-style bold (**text**) for the packing checklist post
              const parts = para.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i} className="mb-6">
                  {parts.map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="text-primary-900 font-semibold">{part}</strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 text-center">
            <h3 className="font-heading text-2xl font-bold text-primary-900 mb-3">
              Ready to Experience This Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Our expert team is ready to plan your perfect Panch Kedar adventure. Get in touch today for a customised itinerary.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/packages" className="btn-primary">
                View Packages
              </Link>
              <a
                href="https://wa.me/917455062107?text=Hi%2C%20I%20read%20your%20blog%20and%20I%27m%20interested%20in%20Panch%20Kedar%20Yatra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors font-medium"
              >
                <FaWhatsapp className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-primary-900 text-center mb-10">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((relPost) => (
                <Link
                  key={relPost.id}
                  to={`/blog/${relPost.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <OptimizedImage
                      src={relPost.image}
                      alt={relPost.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {relPost.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1"><FiCalendar /> {relPost.date}</span>
                      <span className="flex items-center gap-1"><FiClock /> {relPost.readTime}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-primary-900 group-hover:text-accent-500 transition-colors line-clamp-2">
                      {relPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary-800 font-semibold hover:text-accent-500 transition-colors">
                <FiArrowLeft className="w-4 h-4" /> Back to All Articles
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
