import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip', threshold: 1024 }),
    viteCompression({ algorithm: 'brotliCompress', threshold: 1024 }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules/react')) return 'react-vendor';
          if (id.includes('node_modules/react-router')) return 'router-vendor';
          if (id.includes('node_modules/framer-motion')) return 'animation-vendor';
          if (id.includes('node_modules/swiper')) return 'swiper-vendor';
          if (id.includes('node_modules/aos')) return 'aos-vendor';
          if (id.includes('node_modules')) return 'other-vendor';
          // Page-specific chunks for route-based code splitting
          if (id.includes('pages/')) return 'pages';
          if (id.includes('components/')) return 'components';
        },
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'images/[name].[hash][extname]';
          } else if (/\.css$/.test(name ?? '')) {
            return 'css/[name].[hash][extname]';
          }
          return '[name].[hash][extname]';
        },
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
});
