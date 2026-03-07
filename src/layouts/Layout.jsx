import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100, easing: 'ease-out-cubic' });
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    AOS.refresh();
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
