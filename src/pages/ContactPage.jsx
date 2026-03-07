import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle, FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import PageBanner from '../components/PageBanner';
import SEO from '../components/SEO';

const contactInfo = [
  { icon: FiMapPin, title: 'Our Office', lines: ['809, 8th Floor, Infinity Greens', 'Dehradun, Uttarakhand 248001, India'] },
  { icon: FiPhone, title: 'Phone', lines: ['+91 74550 62107'] },
  { icon: FiMail, title: 'Email', lines: ['info@panchkedaryatra.com', 'bookings@panchkedaryatra.com'] },
  { icon: FiClock, title: 'Working Hours', lines: ['Mon \u2013 Sat: 8:00 AM \u2013 8:00 PM', 'Sunday: 10:00 AM \u2013 4:00 PM'] },
];

const faqs = [
  {
    q: 'What is the best time to visit the Panch Kedar temples?',
    a: 'The ideal trekking season is May\u2013June and September\u2013October. Temples open in late April and close by November. Monsoon months (July\u2013August) carry landslide and leech risks and are best avoided. Kalpeshwar is the only Panch Kedar accessible year-round due to its lower altitude (2,200 m).',
  },
  {
    q: 'How physically fit do I need to be for these treks?',
    a: 'Moderate fitness is required for Tungnath and Kalpeshwar (easy to moderate trails). Kedarnath and Madmaheshwar need good stamina for 16\u201324 km trails. Rudranath is the most challenging and is recommended for experienced trekkers. We suggest starting a fitness routine 6\u20138 weeks before your trek.',
  },
  {
    q: 'Are your treks suitable for families with children?',
    a: 'Yes! Our Tungnath\u2013Chandrashila (3.5 km trail) and Kalpeshwar packages are family-friendly and suitable for children above 10 years. Kedarnath offers pony and helicopter options for those who cannot walk the full trail.',
  },
  {
    q: 'What is included in your trek packages?',
    a: 'All our packages include transport from Dehradun/Haridwar, accommodation (hotels + camping where applicable), all meals during the trek, experienced local guides, porters, trekking permits, and first-aid support. You only need to carry personal clothing and gear.',
  },
  {
    q: 'How do I book a Panch Kedar Yatra package?',
    a: 'You can book directly through our website by visiting the Packages page, or contact us via WhatsApp at +91-7455062107, email at info@panchkedaryatra.com, or call us during working hours. A 30% advance is required to confirm your booking.',
  },
  {
    q: 'Do you provide trekking equipment like sleeping bags and tents?',
    a: 'Yes, we provide high-quality tents, sleeping bags, and camping mats on all treks that involve camping. You do not need to carry your own sleeping or cooking gear. We recommend bringing your own trekking boots and personal clothing layers.',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Panch Kedar Yatra for bookings, inquiries & custom pilgrimage packages. Call +91-7455062107 or visit us at Infinity Greens, Dehradun, Uttarakhand."
        canonical="/contact"
        image="/images/madhyamaheshwar/madhya-3.webp"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        }}
      />
      <PageBanner
        title="Contact Us"
        subtitle="Have questions about your next Himalayan adventure? We'd love to hear from you"
        breadcrumbs={[{ label: 'Contact' }]}
        bgImage="/images/madhyamaheshwar/madhya-3.jpg"
      />

      {/* Info Cards */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-card text-center hover:shadow-card-hover transition-shadow"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="w-14 h-14 bg-primary-800 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-primary-900 mb-2">{item.title}</h4>
                {item.lines.map((l, j) => (
                  <p key={j} className="text-sm text-gray-600">{l}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-display font-bold text-primary-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-700 mb-2">Thank You!</h3>
                  <p className="text-green-600">Your message has been sent successfully. We'll get back to you soon.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm text-primary-800 underline hover:text-accent-500"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-primary-900 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-primary-800 focus:border-transparent text-sm transition`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-900 mb-1">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-primary-800 focus:border-transparent text-sm transition`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-primary-900 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-800 focus:border-transparent text-sm transition"
                        placeholder="+91 12345 67890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-900 mb-1">Subject</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-800 focus:border-transparent text-sm transition"
                        placeholder="Subject of your inquiry"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-1">Message *</label>
                    <textarea
                      rows="5"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-primary-800 focus:border-transparent text-sm transition resize-none`}
                      placeholder="Tell us about your travel plans..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-3 rounded-full hover:bg-accent-600 transition-colors font-medium shadow-lg hover:shadow-xl"
                  >
                    <FiSend /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div data-aos="fade-left">
              <h2 className="text-3xl font-display font-bold text-primary-900 mb-2">Find Us</h2>
              <p className="text-gray-600 mb-8">Visit our office in the heart of the Garhwal Himalayas.</p>
              <div className="rounded-xl overflow-hidden shadow-card h-96">
                <iframe
                  title="Panch Kedar Yatra Office"
                  src="https://www.google.com/maps?q=93MF%2BJQ+Dehradun,+Uttarakhand&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Socials */}
              <div className="mt-8">
                <h4 className="font-bold text-primary-900 mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: FaFacebookF, href: '#', color: 'hover:bg-blue-600' },
                    { icon: FaInstagram, href: '#', color: 'hover:bg-pink-600' },
                    { icon: FaYoutube, href: '#', color: 'hover:bg-red-600' },
                    { icon: FaTwitter, href: '#', color: 'hover:bg-sky-500' },
                    { icon: FaWhatsapp, href: '#', color: 'hover:bg-green-600' },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 ${s.color} hover:text-white transition-all`}
                    >
                      <s.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-primary-900 text-center mb-10" data-aos="fade-up">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-white rounded-xl shadow-card overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={index * 80}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-primary-900 pr-4">{question}</span>
        <FiChevronDown className={`w-5 h-5 text-accent-500 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">
          {answer}
        </div>
      )}
    </div>
  );
}
