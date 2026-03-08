/**
 * Configuration for the Updates API server.
 * Uses environment variables with sensible defaults.
 */
import 'dotenv/config';

const config = {
  port: process.env.PORT || 4000,

  // Frontend origin for CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // OpenWeatherMap — free tier: 60 calls/min, 1M calls/month
  // Sign up at https://openweathermap.org/api  →  get an API key
  openWeatherMapKey: process.env.OPENWEATHERMAP_API_KEY || '',

  // Cache TTL in milliseconds
  cache: {
    weatherTTL: 30 * 60 * 1000,   // 30 minutes
    travelTTL: 15 * 60 * 1000,    // 15 minutes
    roadTTL: 15 * 60 * 1000,      // 15 minutes
  },

  // Panch Kedar region locations (lat/lon)
  locations: [
    { id: 'kedarnath',       name: 'Kedarnath',             lat: 30.7352, lon: 79.0669, elevation: 3583 },
    { id: 'tungnath',        name: 'Tungnath (Chopta)',     lat: 30.4890, lon: 79.2180, elevation: 3680 },
    { id: 'rudranath',       name: 'Rudranath',             lat: 30.5200, lon: 79.3300, elevation: 3600 },
    { id: 'madhyamaheshwar', name: 'Madhyamaheshwar',       lat: 30.6218, lon: 79.2218, elevation: 3497 },
    { id: 'kalpeshwar',      name: 'Kalpeshwar (Urgam)',    lat: 30.5600, lon: 79.4500, elevation: 2200 },
    { id: 'rishikesh',       name: 'Rishikesh',             lat: 30.0869, lon: 78.2676, elevation: 372  },
    { id: 'rudraprayag',     name: 'Rudraprayag',           lat: 30.2876, lon: 78.9840, elevation: 610  },
    { id: 'ukhimath',        name: 'Ukhimath',              lat: 30.5253, lon: 79.1456, elevation: 1317 },
    { id: 'joshimath',       name: 'Joshimath',             lat: 30.5568, lon: 79.5667, elevation: 1890 },
    { id: 'gopeshwar',       name: 'Gopeshwar',             lat: 30.4100, lon: 79.3200, elevation: 1524 },
  ],
};

export default config;
