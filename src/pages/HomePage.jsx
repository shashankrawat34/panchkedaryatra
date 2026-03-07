import Hero from '../components/Hero';
import About from '../components/About';
import Packages from '../components/Packages';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Panch Kedar Yatra',
  url: 'https://panchkedaryatra.in',
  logo: 'https://panchkedaryatra.in/favicon.svg',
  description:
    'Premium trekking and pilgrimage packages to all five sacred Kedar shrines in Uttarakhand – Kedarnath, Tungnath, Rudranath, Madmaheshwar & Kalpeshwar.',
  telephone: '+91-7455062107',
  email: 'info@panchkedaryatra.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '809, 8th floor, Infinity Greens',
    addressLocality: 'Dehradun',
    addressRegion: 'Uttarakhand',
    postalCode: '248001',
    addressCountry: 'IN',
  },
  sameAs: [],
  areaServed: {
    '@type': 'Place',
    name: 'Uttarakhand, India',
  },
};

export default function HomePage() {
  return (
    <>
      <SEO
        description="Panch Kedar Yatra offers premium trekking & pilgrimage packages to all five sacred Kedar shrines – Kedarnath, Tungnath, Rudranath, Madmaheshwar & Kalpeshwar. Expert guides, eco-friendly tours. Book now!"
        canonical="/"
        jsonLd={homeJsonLd}
      />
      <Hero />
      {/* Brief intro on home */}
      <About />
      <Packages />
      <Gallery />
      <Testimonials />
      <Team />
      <Blog />
      <Contact />
    </>
  );
}
