import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { toWebP } from '../utils/image';

const BASE_URL = 'https://panchkedaryatra.in';

export default function PageBanner({ title, subtitle, breadcrumbs = [], bgImage }) {
  // BreadcrumbList structured data for Google rich snippets
  const breadcrumbJsonLd = breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      ...breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: crumb.label,
        ...(crumb.href ? { item: `${BASE_URL}${crumb.href}` } : {}),
      })),
    ],
  } : null;

  return (
    <>
      {breadcrumbJsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        </Helmet>
      )}
      <section className="relative min-h-[340px] md:min-h-[400px] flex items-end overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: bgImage
            ? `url(${toWebP(bgImage)})`
            : 'url(/images/kedarnath/kedarnath-1.webp)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/60 to-primary-800/30" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-32">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center flex-wrap gap-1 text-sm text-white/60">
              <li>
                <Link to="/" className="hover:text-accent-400 transition-colors">Home</Link>
              </li>
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <FiChevronRight className="w-3.5 h-3.5" />
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-accent-400 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-accent-400">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-base md:text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
    </>
  );
}
