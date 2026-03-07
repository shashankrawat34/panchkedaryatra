import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiPhone, FiMail, FiMapPin, FiCheck } from 'react-icons/fi';

const packageOptions = [
  'Kedarnath Yatra (5D/4N)',
  'Tungnath-Chandrashila Trek (4D/3N)',
  'Rudranath Trek (7D/6N)',
  'Madmaheshwar Trek (6D/5N)',
  'Kalpeshwar Temple Visit (3D/2N)',
  'Complete Panch Kedar Circuit (14D/13N)',
  'Kedarnath + Tungnath Combo (8D/7N)',
  'Rudranath + Madmaheshwar Trek (10D/9N)',
  'Custom Package',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[+]?[\d\s-]{10,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    // Log form data (replace with EmailJS or backend in production)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', package: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
            Contact Us
          </span>
          <h2 className="section-title">
            Start Your <span className="text-accent-500">Sacred Journey</span>
          </h2>
          <p className="section-subtitle">
            Ready to embark on the Panch Kedar Yatra? Get in touch and we'll craft the perfect pilgrimage for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info & Map */}
          <div className="lg:col-span-2 space-y-6" data-aos="fade-right">
            {/* Info cards */}
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-primary-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-primary-800 text-sm mb-1">Our Office</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    809, 8th Floor, Infinity Greens<br />
                    Dehradun, Uttarakhand 248001, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-primary-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiPhone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-primary-800 text-sm mb-1">Call Us</h3>
                  <a href="tel:+917455062107" className="text-gray-500 text-sm hover:text-accent-500 transition-colors">
                    +91-74550 62107
                  </a>
                  <br />
                  <a href="tel:+917455062107" className="text-gray-500 text-sm hover:text-accent-500 transition-colors">
                    +91-74550 62107
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-primary-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-primary-800 text-sm mb-1">Email Us</h3>
                  <a href="mailto:info@panchkedaryatra.in" className="text-gray-500 text-sm hover:text-accent-500 transition-colors">
                    info@panchkedaryatra.in
                  </a>
                  <br />
                  <a href="mailto:bookings@panchkedaryatra.in" className="text-gray-500 text-sm hover:text-accent-500 transition-colors">
                    bookings@panchkedaryatra.in
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-card h-[250px]">
              <iframe
                title="Panch Kedar Yatra Office Location"
                src="https://www.google.com/maps?q=93MF%2BJQ+Dehradun,+Uttarakhand&output=embed"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3" data-aos="fade-left">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 flex items-center gap-3"
                >
                  <FiCheck className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">Thank you! We'll get back to you within 24 hours. Har Har Mahadev! 🙏</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      } focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm`}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      } focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm`}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 block mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91-XXXXX XXXXX"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      } focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm`}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="package" className="text-sm font-medium text-gray-700 block mb-1.5">
                      Select Package
                    </label>
                    <select
                      id="package"
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 
                                 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">Choose a package...</option>
                      {packageOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your travel dates, group size, and any special requirements..."
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    } focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm resize-none`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto text-base"
                >
                  <FiSend className="w-4 h-4" />
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
