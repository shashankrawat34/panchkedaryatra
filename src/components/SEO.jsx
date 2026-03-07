import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Panch Kedar Yatra';
const BASE_URL = 'https://panchkedaryatra.in';
const DEFAULT_IMAGE = '/images/kedarnath/kedarnath-1.webp';

/**
 * SEO component using react-helmet-async.
 * Place at the top of each page component for unique meta per route.
 *
 * @param {string} title        – Page title (appended with site name)
 * @param {string} description  – Meta description (150-160 chars ideal)
 * @param {string} canonical    – Path e.g. "/about" (auto-prepended with BASE_URL)
 * @param {string} image        – OG/Twitter image path
 * @param {string} type         – og:type (default "website")
 * @param {object} jsonLd       – Additional JSON-LD structured data
 */
export default function SEO({
  title,
  description,
  canonical = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `Panch Kedar 2026: Sacred Temples, Detailed Itinerary & Map`;
  const fullUrl = `${BASE_URL}${canonical}`;
  const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
