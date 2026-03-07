import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/917455062107?text=Hello!%20I%20am%20interested%20in%20Panch%20Kedar%20Yatra%20packages."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 md:right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 
                 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-all duration-300 group"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className="w-6 h-6" />
      <span className="hidden sm:inline text-sm">Chat with us</span>
      {/* Pulse ring */}
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full" />
    </motion.a>
  );
}
