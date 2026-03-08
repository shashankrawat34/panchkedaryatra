/**
 * Fallback / curated data for the Updates page.
 * Used when the backend API is unreachable.
 *
 * All timestamps use new Date().toISOString() so data always appears fresh.
 */

const now = new Date();
const month = now.getMonth();
const year = now.getFullYear();
const ts = () => new Date().toISOString(); // always "Just now"

// ─── Severity helpers ──────────────────────────────────────────
export const SEVERITY = {
  CRITICAL: 'critical',
  WARNING: 'warning',
  INFO: 'info',
};

export const CATEGORY_LABELS = {
  permit: 'Permit',
  closure: 'Closure',
  accessibility: 'Access',
  event: 'Event',
  advisory: 'Advisory',
  disaster: 'Disaster',
  highway: 'Highway',
  mountain_road: 'Mountain Road',
  construction: 'Construction',
  landslide: 'Landslide',
  snow: 'Snow',
  flood: 'Flood',
  maintenance: 'Maintenance',
  weather: 'Weather',
};

// ─── Fallback Travel Updates ───────────────────────────────────
export const fallbackTravelUpdates = [
  {
    id: 'ft-1',
    type: 'travel',
    category: 'permit',
    severity: 'info',
    title: 'Kedarnath Yatra Registration Mandatory',
    description: 'All pilgrims visiting Kedarnath must register on the official Devasthanam Board portal. Biometric registration is required at Sonprayag check post.',
    location: 'Kedarnath',
    locationId: 'kedarnath',
    source: 'Badrinath-Kedarnath Temple Committee',
    sourceUrl: 'https://badrinath-kedarnath.gov.in',
    verified: true,
    timestamp: ts(),
  },
  {
    id: 'ft-2',
    type: 'travel',
    category: 'accessibility',
    severity: 'info',
    title: 'Kalpeshwar Temple — Open Year-Round',
    description: 'Kalpeshwar is the only Panch Kedar shrine accessible throughout the year. Located in the Urgam Valley, it is reachable by a motorable road followed by a short 2 km trek.',
    location: 'Kalpeshwar',
    locationId: 'kalpeshwar',
    source: 'Uttarakhand Tourism',
    sourceUrl: 'https://uttarakhandtourism.gov.in',
    verified: true,
    timestamp: ts(),
  },
  ...(month >= 10 || month <= 3 ? [
    {
      id: 'ft-3',
      type: 'travel',
      category: 'closure',
      severity: 'critical',
      title: 'Kedarnath Temple — Closed for Winter',
      description: `Kedarnath temple is closed for winter due to heavy snowfall. Reopens on Akshaya Tritiya (April/May ${year + (month >= 10 ? 1 : 0)}).`,
      location: 'Kedarnath',
      locationId: 'kedarnath',
      source: 'Badrinath-Kedarnath Temple Committee',
      verified: true,
      timestamp: ts(),
    },
    {
      id: 'ft-4',
      type: 'travel',
      category: 'closure',
      severity: 'critical',
      title: 'Tungnath Temple — Closed for Winter',
      description: 'Tungnath temple and Chandrashila trek are closed due to heavy snow. The deity is shifted to Mukkumath village.',
      location: 'Tungnath',
      locationId: 'tungnath',
      source: 'DM Office Rudraprayag',
      verified: true,
      timestamp: ts(),
    },
    {
      id: 'ft-5',
      type: 'travel',
      category: 'closure',
      severity: 'critical',
      title: 'Rudranath Temple — Closed for Winter',
      description: 'Rudranath trek route is closed due to extreme snow cover. No trekking allowed. Reopens May.',
      location: 'Rudranath',
      locationId: 'rudranath',
      source: 'DM Office Chamoli',
      verified: true,
      timestamp: ts(),
    },
    {
      id: 'ft-6',
      type: 'travel',
      category: 'event',
      severity: 'info',
      title: 'Winter Worship at Ukhimath',
      description: 'During winter, idols of Kedarnath and Madhyamaheshwar are worshipped at Omkareshwar Temple in Ukhimath. Open for darshan daily.',
      location: 'Ukhimath',
      locationId: 'ukhimath',
      source: 'Badrinath-Kedarnath Temple Committee',
      verified: true,
      timestamp: ts(),
    },
  ] : []),
  ...(month >= 6 && month <= 8 ? [
    {
      id: 'ft-7',
      type: 'travel',
      category: 'advisory',
      severity: 'warning',
      title: 'Monsoon Season — Trek with Caution',
      description: 'Monsoon brings heavy rainfall and landslide risk. Check route status before departure. Carry waterproof gear.',
      location: 'All Locations',
      source: 'SDRF Uttarakhand',
      verified: true,
      timestamp: ts(),
    },
  ] : []),
];

// ─── Fallback Road Updates ─────────────────────────────────────
export const fallbackRoadUpdates = [
  {
    id: 'fr-1',
    type: 'road',
    category: 'highway',
    severity: 'info',
    title: 'NH-7 (Rishikesh–Rudraprayag) — Open',
    description: 'National Highway 7 open for all vehicles. Night driving not recommended beyond Srinagar (Garhwal).',
    location: 'Rishikesh to Rudraprayag',
    locationId: 'rishikesh',
    source: 'MORTH',
    verified: true,
    timestamp: ts(),
  },
  {
    id: 'fr-2',
    type: 'road',
    category: 'mountain_road',
    severity: 'info',
    title: 'Chopta Road — Condition Check Required',
    description: 'Chopta road is narrow and winding. Only small vehicles advised. Check conditions in monsoon/winter.',
    location: 'Chopta',
    locationId: 'tungnath',
    source: 'PWD Uttarakhand',
    verified: true,
    timestamp: ts(),
  },
  {
    id: 'fr-3',
    type: 'road',
    category: 'advisory',
    severity: 'info',
    title: 'Fuel Advisory — Fill Up in Major Towns',
    description: 'No fuel stations beyond Rudraprayag & Gopeshwar. Fill at Rishikesh, Srinagar, Rudraprayag, or Gopeshwar.',
    location: 'All Routes',
    source: 'Uttarakhand Tourism',
    verified: true,
    timestamp: ts(),
  },
  ...(month >= 10 || month <= 2 ? [
    {
      id: 'fr-4',
      type: 'road',
      category: 'closure',
      severity: 'critical',
      title: 'Gaurikund Road — Closed Beyond Sonprayag',
      description: 'Road to Gaurikund and trek route to Kedarnath closed due to heavy snowfall. Inaccessible until April/May.',
      location: 'Sonprayag–Gaurikund',
      locationId: 'kedarnath',
      source: 'DM Office Rudraprayag',
      verified: true,
      timestamp: ts(),
    },
  ] : []),
];

// ─── Fallback Weather (static estimates by season) ─────────────
export const fallbackWeatherLocations = [
  {
    location: { id: 'kedarnath', name: 'Kedarnath', elevation: 3583 },
    current: {
      locationId: 'kedarnath',
      locationName: 'Kedarnath',
      elevation: 3583,
      temperature: month >= 5 && month <= 8 ? 12 : month >= 9 && month <= 10 ? 5 : -8,
      feelsLike: month >= 5 && month <= 8 ? 9 : month >= 9 && month <= 10 ? 1 : -15,
      humidity: 70,
      condition: month >= 6 && month <= 8 ? 'Rain' : month >= 10 || month <= 3 ? 'Snow' : 'Clouds',
      description: month >= 6 && month <= 8 ? 'monsoon rains' : month >= 10 || month <= 3 ? 'heavy snow' : 'partly cloudy',
      icon: month >= 6 && month <= 8 ? '10d' : month >= 10 || month <= 3 ? '13d' : '03d',
      windSpeed: 25,
      timestamp: new Date().toISOString(),
    },
    forecast: null,
  },
  {
    location: { id: 'tungnath', name: 'Tungnath (Chopta)', elevation: 3680 },
    current: {
      locationId: 'tungnath',
      locationName: 'Tungnath (Chopta)',
      elevation: 3680,
      temperature: month >= 5 && month <= 8 ? 10 : month >= 9 && month <= 10 ? 3 : -10,
      feelsLike: month >= 5 && month <= 8 ? 7 : month >= 9 && month <= 10 ? -1 : -18,
      humidity: 75,
      condition: month >= 6 && month <= 8 ? 'Rain' : month >= 10 || month <= 3 ? 'Snow' : 'Clear',
      description: month >= 6 && month <= 8 ? 'heavy rainfall' : month >= 10 || month <= 3 ? 'snowfall' : 'clear sky',
      icon: month >= 6 && month <= 8 ? '10d' : month >= 10 || month <= 3 ? '13d' : '01d',
      windSpeed: 30,
      timestamp: new Date().toISOString(),
    },
    forecast: null,
  },
  {
    location: { id: 'rudranath', name: 'Rudranath', elevation: 3600 },
    current: {
      locationId: 'rudranath',
      locationName: 'Rudranath',
      elevation: 3600,
      temperature: month >= 5 && month <= 8 ? 11 : month >= 9 && month <= 10 ? 4 : -9,
      feelsLike: month >= 5 && month <= 8 ? 8 : month >= 9 && month <= 10 ? 0 : -16,
      humidity: 72,
      condition: month >= 6 && month <= 8 ? 'Rain' : month >= 10 || month <= 3 ? 'Snow' : 'Clouds',
      description: month >= 6 && month <= 8 ? 'moderate rain' : month >= 10 || month <= 3 ? 'snow cover' : 'overcast clouds',
      icon: month >= 6 && month <= 8 ? '09d' : month >= 10 || month <= 3 ? '13d' : '04d',
      windSpeed: 28,
      timestamp: new Date().toISOString(),
    },
    forecast: null,
  },
  {
    location: { id: 'madhyamaheshwar', name: 'Madhyamaheshwar', elevation: 3497 },
    current: {
      locationId: 'madhyamaheshwar',
      locationName: 'Madhyamaheshwar',
      elevation: 3497,
      temperature: month >= 5 && month <= 8 ? 13 : month >= 9 && month <= 10 ? 6 : -7,
      feelsLike: month >= 5 && month <= 8 ? 10 : month >= 9 && month <= 10 ? 2 : -14,
      humidity: 68,
      condition: month >= 6 && month <= 8 ? 'Rain' : month >= 10 || month <= 3 ? 'Snow' : 'Clouds',
      description: month >= 6 && month <= 8 ? 'light rain' : month >= 10 || month <= 3 ? 'snow showers' : 'scattered clouds',
      icon: month >= 6 && month <= 8 ? '10d' : month >= 10 || month <= 3 ? '13d' : '03d',
      windSpeed: 22,
      timestamp: new Date().toISOString(),
    },
    forecast: null,
  },
  {
    location: { id: 'kalpeshwar', name: 'Kalpeshwar (Urgam)', elevation: 2200 },
    current: {
      locationId: 'kalpeshwar',
      locationName: 'Kalpeshwar (Urgam)',
      elevation: 2200,
      temperature: month >= 5 && month <= 8 ? 20 : month >= 9 && month <= 10 ? 14 : 2,
      feelsLike: month >= 5 && month <= 8 ? 18 : month >= 9 && month <= 10 ? 11 : -2,
      humidity: 60,
      condition: month >= 6 && month <= 8 ? 'Rain' : month >= 10 || month <= 3 ? 'Clouds' : 'Clear',
      description: month >= 6 && month <= 8 ? 'drizzle' : month >= 10 || month <= 3 ? 'partly cloudy' : 'clear sky',
      icon: month >= 6 && month <= 8 ? '09d' : month >= 10 || month <= 3 ? '03d' : '01d',
      windSpeed: 15,
      timestamp: new Date().toISOString(),
    },
    forecast: null,
  },
];

// ─── Monitored routes (always available) ───────────────────────
export const monitoredRoutes = [
  { id: 'nh7', name: 'NH-7 (Rishikesh–Rudraprayag)', distance: '165 km', estimatedTime: '5–6 hours' },
  { id: 'nh107', name: 'NH-107 (Rudraprayag–Gaurikund)', distance: '74 km', estimatedTime: '3–4 hours' },
  { id: 'chopta-road', name: 'Chopta Road (Ukhimath–Chopta–Gopeshwar)', distance: '60 km', estimatedTime: '2.5–3 hours' },
  { id: 'urgam-road', name: 'Urgam Valley Road (Helang–Urgam)', distance: '17 km', estimatedTime: '45 min' },
  { id: 'ransi-road', name: 'Ransi Village Road (Ukhimath–Ransi)', distance: '24 km', estimatedTime: '1.5 hours' },
  { id: 'mandal-road', name: 'Mandal Village Road (Gopeshwar–Mandal)', distance: '14 km', estimatedTime: '40 min' },
];
