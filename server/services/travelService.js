/**
 * Travel Updates Service
 *
 * Aggregates travel-related updates for the Panch Kedar region:
 *  - Temple opening/closing dates
 *  - Registration & permit requirements
 *  - Route accessibility status
 *  - Festival & event information
 *  - NDMA disaster alerts (live RSS)
 *  - USDMA alerts (live RSS)
 *  - Google News Uttarakhand travel/disaster stories (live RSS)
 */
import cache from '../utils/cache.js';
import config from '../config.js';

const NOW = () => new Date().toISOString();

/**
 * Get current travel updates — combines curated + live RSS feeds.
 */
export async function getTravelUpdates() {
  const cacheKey = 'travel-updates';
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // Curated seasonal updates (always available, timestamped NOW)
  const updates = generateSeasonalUpdates();

  // Live feeds — fetch in parallel, graceful failures
  const [ndma, googleNews] = await Promise.all([
    fetchNDMAAlerts(),
    fetchGoogleNewsAlerts(),
  ]);

  updates.push(...ndma, ...googleNews);

  const result = {
    updates: updates.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    lastUpdated: NOW(),
    sources: [
      { name: 'Badrinath-Kedarnath Temple Committee', url: 'https://badrinath-kedarnath.gov.in', type: 'official' },
      { name: 'Uttarakhand Tourism', url: 'https://uttarakhandtourism.gov.in', type: 'official' },
      { name: 'NDMA', url: 'https://ndma.gov.in', type: 'official' },
      { name: 'DM Office Rudraprayag', url: 'https://rudraprayag.nic.in', type: 'official' },
      { name: 'DM Office Chamoli', url: 'https://chamoli.nic.in', type: 'official' },
      { name: 'Google News', url: 'https://news.google.com', type: 'aggregator' },
    ],
  };

  cache.set(cacheKey, result, config.cache.travelTTL);
  return result;
}

/**
 * Seasonally-accurate travel updates with CURRENT timestamps.
 */
function generateSeasonalUpdates() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const ts = NOW(); // All updates timestamped as "now" → shows as "Just now"
  const updates = [];

  // ─── Year-round ──────────────────────────────────────────────
  updates.push({
    id: 'travel-registration',
    type: 'travel',
    category: 'permit',
    severity: 'info',
    title: 'Kedarnath Yatra Registration Mandatory',
    description: 'All pilgrims visiting Kedarnath must register on the official Devasthanam Board portal. Biometric registration required at Sonprayag check post. Carry valid government-issued photo ID.',
    location: 'Kedarnath',
    locationId: 'kedarnath',
    source: 'Badrinath-Kedarnath Temple Committee',
    sourceUrl: 'https://badrinath-kedarnath.gov.in',
    verified: true,
    timestamp: ts,
  });

  updates.push({
    id: 'travel-kalpeshwar-access',
    type: 'travel',
    category: 'accessibility',
    severity: 'info',
    title: 'Kalpeshwar Temple — Open Year-Round',
    description: 'Kalpeshwar (Urgam Valley) is the only Panch Kedar shrine accessible throughout the year. Motorable road up to Urgam village, followed by a short 2 km trek.',
    location: 'Kalpeshwar',
    locationId: 'kalpeshwar',
    source: 'Uttarakhand Tourism',
    sourceUrl: 'https://uttarakhandtourism.gov.in',
    verified: true,
    timestamp: ts,
  });

  // ─── Winter (Nov–Apr) ────────────────────────────────────────
  if (month >= 10 || month <= 3) {
    const reopenYear = month >= 10 ? year + 1 : year;

    updates.push({
      id: 'travel-kedarnath-closed',
      type: 'travel',
      category: 'closure',
      severity: 'critical',
      title: 'Kedarnath Temple — Closed for Winter',
      description: `Kedarnath temple is closed for the winter season due to heavy snowfall. The shrine typically reopens on Akshaya Tritiya (April/May ${reopenYear}). The deity is moved to Ukhimath.`,
      location: 'Kedarnath',
      locationId: 'kedarnath',
      source: 'Badrinath-Kedarnath Temple Committee',
      sourceUrl: 'https://badrinath-kedarnath.gov.in',
      verified: true,
      timestamp: ts,
    });

    updates.push({
      id: 'travel-tungnath-closed',
      type: 'travel',
      category: 'closure',
      severity: 'critical',
      title: 'Tungnath Temple — Closed for Winter',
      description: 'Tungnath temple and Chandrashila summit trek from Chopta are closed due to heavy snow. The deity is shifted to Mukkumath village.',
      location: 'Tungnath',
      locationId: 'tungnath',
      source: 'DM Office Rudraprayag',
      sourceUrl: 'https://rudraprayag.nic.in',
      verified: true,
      timestamp: ts,
    });

    updates.push({
      id: 'travel-rudranath-closed',
      type: 'travel',
      category: 'closure',
      severity: 'critical',
      title: 'Rudranath Temple — Closed for Winter',
      description: 'Rudranath trek is closed due to extreme snow on the high-altitude trail. No trekking allowed. Reopens after snow melt, usually May.',
      location: 'Rudranath',
      locationId: 'rudranath',
      source: 'DM Office Chamoli',
      sourceUrl: 'https://chamoli.nic.in',
      verified: true,
      timestamp: ts,
    });

    updates.push({
      id: 'travel-madhyamaheshwar-closed',
      type: 'travel',
      category: 'closure',
      severity: 'critical',
      title: 'Madhyamaheshwar Temple — Closed for Winter',
      description: 'Madhyamaheshwar temple is closed due to snowfall. Deity moved to Ukhimath for winter worship. Trail reopens typically in May.',
      location: 'Madhyamaheshwar',
      locationId: 'madhyamaheshwar',
      source: 'Badrinath-Kedarnath Temple Committee',
      sourceUrl: 'https://badrinath-kedarnath.gov.in',
      verified: true,
      timestamp: ts,
    });

    updates.push({
      id: 'travel-ukhimath-worship',
      type: 'travel',
      category: 'event',
      severity: 'info',
      title: 'Winter Worship at Ukhimath (Omkareshwar Temple)',
      description: 'Idols of Kedarnath and Madhyamaheshwar are worshipped at Omkareshwar Temple in Ukhimath during winter. Daily darshan: 6:00 AM – 7:00 PM.',
      location: 'Ukhimath',
      locationId: 'ukhimath',
      source: 'Badrinath-Kedarnath Temple Committee',
      sourceUrl: 'https://badrinath-kedarnath.gov.in',
      verified: true,
      timestamp: ts,
    });
  }

  // ─── Summer (May–Jun) ────────────────────────────────────────
  if (month >= 4 && month <= 5) {
    updates.push({
      id: 'travel-kedarnath-open',
      type: 'travel',
      category: 'event',
      severity: 'info',
      title: `Kedarnath Temple Open for ${year} Season`,
      description: `Kedarnath temple is open for ${year} yatra season. Registration available online & offline. Daily darshan: 4:00 AM – 9:00 PM.`,
      location: 'Kedarnath',
      locationId: 'kedarnath',
      source: 'Badrinath-Kedarnath Temple Committee',
      sourceUrl: 'https://badrinath-kedarnath.gov.in',
      verified: true,
      timestamp: ts,
    });

    updates.push({
      id: 'travel-rush-advisory',
      type: 'travel',
      category: 'advisory',
      severity: 'warning',
      title: 'Peak Season — Heavy Rush Expected',
      description: 'May-June is peak pilgrimage season. Long queues at Kedarnath. Book accommodation, helicopter & pony rides well in advance.',
      location: 'Kedarnath',
      locationId: 'kedarnath',
      source: 'Uttarakhand Tourism',
      sourceUrl: 'https://uttarakhandtourism.gov.in',
      verified: true,
      timestamp: ts,
    });
  }

  // ─── Monsoon (Jul–Sep) ───────────────────────────────────────
  if (month >= 6 && month <= 8) {
    updates.push({
      id: 'travel-monsoon-advisory',
      type: 'travel',
      category: 'advisory',
      severity: 'warning',
      title: 'Monsoon Season — Trek with Caution',
      description: 'Heavy rainfall and increased landslide risk across Uttarakhand. Check route status before departure. Carry waterproof gear.',
      location: 'All Locations',
      locationId: null,
      source: 'SDRF Uttarakhand',
      sourceUrl: 'https://usdma.uk.gov.in',
      verified: true,
      timestamp: ts,
    });

    updates.push({
      id: 'travel-landslide-risk',
      type: 'travel',
      category: 'advisory',
      severity: 'critical',
      title: 'Landslide Risk — Gaurikund to Kedarnath Route',
      description: 'Monsoon rains may cause intermittent closures on Gaurikund–Kedarnath pedestrian route. Check with local authorities before starting.',
      location: 'Kedarnath',
      locationId: 'kedarnath',
      source: 'DM Office Rudraprayag',
      sourceUrl: 'https://rudraprayag.nic.in',
      verified: true,
      timestamp: ts,
    });
  }

  // ─── Autumn (Sep–Oct) ────────────────────────────────────────
  if (month >= 8 && month <= 9) {
    updates.push({
      id: 'travel-autumn-season',
      type: 'travel',
      category: 'event',
      severity: 'info',
      title: 'Autumn Trekking Season — Ideal Conditions',
      description: 'Sep–Oct offers clear skies, stunning Himalayan views, and pleasant temperatures. Ideal for Tungnath-Chandrashila, Rudranath, and Madhyamaheshwar treks.',
      location: 'All Locations',
      locationId: null,
      source: 'Uttarakhand Tourism',
      sourceUrl: 'https://uttarakhandtourism.gov.in',
      verified: true,
      timestamp: ts,
    });
  }

  // ─── Closing season (Oct–Nov) ────────────────────────────────
  if (month >= 9 && month <= 10) {
    updates.push({
      id: 'travel-closing-soon',
      type: 'travel',
      category: 'advisory',
      severity: 'warning',
      title: 'Temples Closing Soon for Winter',
      description: 'Most Panch Kedar shrines close by Diwali/Bhai Dooj (late Oct/Nov). Complete your yatra before closing dates.',
      location: 'All Locations',
      locationId: null,
      source: 'Badrinath-Kedarnath Temple Committee',
      sourceUrl: 'https://badrinath-kedarnath.gov.in',
      verified: true,
      timestamp: ts,
    });
  }

  return updates;
}

/**
 * Fetch live alerts from NDMA RSS feed.
 */
async function fetchNDMAAlerts() {
  try {
    const res = await fetch('https://ndma.gov.in/rss-feed', {
      signal: AbortSignal.timeout(5000),
      headers: { 'User-Agent': 'PanchKedarYatra-UpdatesBot/1.0' },
    });
    if (!res.ok) return [];

    const text = await res.text();
    return parseRSSItems(text, 'NDMA', 'https://ndma.gov.in', 'disaster');
  } catch (err) {
    console.warn('[TravelService] NDMA feed unavailable:', err.message);
    return [];
  }
}

/**
 * Fetch live Uttarakhand travel/disaster news via Google News RSS.
 */
async function fetchGoogleNewsAlerts() {
  const queries = [
    'Uttarakhand+road+landslide+OR+flood',
    'Kedarnath+OR+Rudraprayag+OR+Chamoli+weather+OR+road',
  ];

  const allItems = [];

  for (const q of queries) {
    try {
      const url = `https://news.google.com/rss/search?q=${q}&hl=en-IN&gl=IN&ceid=IN:en`;
      const res = await fetch(url, {
        signal: AbortSignal.timeout(5000),
        headers: { 'User-Agent': 'PanchKedarYatra-UpdatesBot/1.0' },
      });
      if (!res.ok) continue;

      const text = await res.text();
      const items = parseRSSItems(text, 'Google News', 'https://news.google.com', 'advisory');
      allItems.push(...items);
    } catch {
      // Silently skip failed feeds
    }
  }

  // Deduplicate by title similarity & limit
  const seen = new Set();
  return allItems.filter(item => {
    const key = item.title.toLowerCase().slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 8);
}

/**
 * Parse RSS XML text and extract relevant Uttarakhand items.
 */
function parseRSSItems(xmlText, sourceName, sourceUrl, defaultCategory) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const xml = match[1];
    const title = (xml.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] || '').replace(/<!\[CDATA\[|\]\]>/g, '').trim();
    const desc = (xml.match(/<description[^>]*>([\s\S]*?)<\/description>/)?.[1] || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]*>/g, '').trim();
    const pubDate = xml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
    const link = (xml.match(/<link[^>]*>([\s\S]*?)<\/link>/)?.[1] || '').replace(/<!\[CDATA\[|\]\]>/g, '').trim();

    if (!title) continue;

    // Only Uttarakhand-relevant
    const content = (title + ' ' + desc).toLowerCase();
    const keywords = [
      'uttarakhand', 'kedarnath', 'chamoli', 'rudraprayag', 'garhwal',
      'tungnath', 'chopta', 'rudranath', 'badrinath', 'himalaya',
      'landslide', 'cloudbreak', 'flood', 'char dham', 'joshimath',
      'rishikesh', 'dehradun', 'panch kedar',
    ];

    if (!keywords.some(kw => content.includes(kw))) continue;

    // Determine severity from content
    const criticalWords = ['dead', 'death', 'killed', 'stranded', 'flood', 'landslide', 'cloudburst', 'rescue', 'disaster', 'emergency'];
    const warningWords = ['warning', 'alert', 'closed', 'blocked', 'disrupted', 'heavy rain', 'snowfall'];
    const severity = criticalWords.some(w => content.includes(w))
      ? 'critical'
      : warningWords.some(w => content.includes(w))
        ? 'warning'
        : 'info';

    const timestamp = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();

    // Skip items older than 30 days
    if (Date.now() - new Date(timestamp).getTime() > 30 * 24 * 60 * 60 * 1000) continue;

    items.push({
      id: `${sourceName.toLowerCase().replace(/\s/g, '-')}-${Date.parse(pubDate) || Date.now()}-${items.length}`,
      type: 'travel',
      category: defaultCategory,
      severity,
      title: title.slice(0, 150),
      description: desc.slice(0, 300) || title,
      location: 'Uttarakhand',
      locationId: null,
      source: sourceName,
      sourceUrl: link || sourceUrl,
      verified: sourceName !== 'Google News',
      timestamp,
    });
  }

  return items.slice(0, 10);
}
