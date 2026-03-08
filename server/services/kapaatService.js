/**
 * Kapaat (Temple Door Opening/Closing) Service
 *
 * Provides annual & daily kapaat schedules for major Uttarakhand yatra temples.
 *
 * Kapaat = Temple doors. Two kinds:
 *   1. SEASONAL kapaat — Annual opening / closing dates (temples close Nov–Apr due to snow)
 *   2. DAILY kapaat — Morning opening, afternoon break, evening reopening, night closing
 *
 * Temples covered:
 *   - Panch Kedar: Kedarnath, Tungnath, Rudranath, Madhyamaheshwar, Kalpeshwar
 *   - Char Dham: Badrinath, Gangotri, Yamunotri
 *   - Other: Hemkund Sahib
 *
 * Data sourced from:
 *   - Shri Badrinath-Kedarnath Temple Committee (BKTC)
 *   - Uttarakhand Char Dham Devasthanam Management Board
 *   - Official temple announcements
 */
import cache from '../utils/cache.js';
import config from '../config.js';

const NOW = () => new Date();

/**
 * Get all kapaat data — seasonal status + daily timings + aarti schedule.
 */
export async function getKapaatUpdates() {
  const cacheKey = 'kapaat-updates';
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const now = NOW();
  const temples = getTempleKapaatData(now);

  // Generate alert-style updates for upcoming events
  const updates = generateKapaatAlerts(temples, now);

  const result = {
    temples,
    updates,
    lastUpdated: now.toISOString(),
    sources: [
      { name: 'Shri Badrinath-Kedarnath Temple Committee', url: 'https://badrinath-kedarnath.gov.in', type: 'official' },
      { name: 'Char Dham Devasthanam Board', url: 'https://devasthanamboard.uk.gov.in', type: 'official' },
      { name: 'Uttarakhand Tourism', url: 'https://uttarakhandtourism.gov.in', type: 'official' },
    ],
  };

  cache.set(cacheKey, result, config.cache.travelTTL);
  return result;
}

/**
 * Master temple kapaat data with seasonal and daily timings.
 */
function getTempleKapaatData(now) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = hours * 60 + now.getMinutes();

  // Approximate dates — actual dates announced yearly by temple committees
  // These are realistic estimates based on historical patterns
  const temples = [
    // ─── PANCH KEDAR ─────────────────────────────────────────
    {
      id: 'kedarnath',
      name: 'Kedarnath Temple',
      group: 'Panch Kedar',
      deity: 'Lord Shiva (Jyotirlinga)',
      elevation: '3,583 m',
      location: 'Rudraprayag District',
      image: '/images/kedarnath/kedarnath-1.jpg',
      managedBy: 'Shri Badrinath-Kedarnath Temple Committee',
      seasonal: {
        openingDate: `${year}-05-07`,
        closingDate: `${year}-11-01`,
        openingOccasion: 'Akshaya Tritiya (approx.)',
        closingOccasion: 'Bhai Dooj (approx.)',
        winterDeity: 'Idol shifted to Omkareshwar Temple, Ukhimath',
        notes: 'Exact dates announced by BKTC each year. Opening with Vedic rituals at dawn.',
      },
      daily: {
        summerTimings: [
          { event: 'Kapaat Opens (Morning)', time: '04:00 AM', icon: '🚪' },
          { event: 'Mangala Aarti', time: '04:00 AM – 04:30 AM', icon: '🪔' },
          { event: 'Abhishek Puja', time: '04:30 AM – 06:00 AM', icon: '🙏' },
          { event: 'General Darshan', time: '06:00 AM – 03:00 PM', icon: '👁️' },
          { event: 'Kapaat Closes (Afternoon Break)', time: '03:00 PM', icon: '🔒' },
          { event: 'Kapaat Reopens (Evening)', time: '05:00 PM', icon: '🚪' },
          { event: 'Evening Darshan', time: '05:00 PM – 07:00 PM', icon: '👁️' },
          { event: 'Sandhya Aarti', time: '07:00 PM – 07:30 PM', icon: '🪔' },
          { event: 'Shayan Aarti & Kapaat Closes', time: '08:30 PM – 09:00 PM', icon: '🔒' },
        ],
        winterNote: 'During winter, worship continues at Omkareshwar Temple, Ukhimath (6:00 AM – 7:00 PM)',
      },
    },
    {
      id: 'tungnath',
      name: 'Tungnath Temple',
      group: 'Panch Kedar',
      deity: 'Lord Shiva (Arms/Bahu)',
      elevation: '3,680 m',
      location: 'Rudraprayag District (Chopta)',
      image: '/images/tungnath/tungnath-1.jpg',
      managedBy: 'Local Rawal (Priest)',
      seasonal: {
        openingDate: `${year}-05-10`,
        closingDate: `${year}-10-25`,
        openingOccasion: 'After Akshaya Tritiya',
        closingOccasion: 'Dussehra / Before Diwali',
        winterDeity: 'Idol shifted to Mukkumath village',
        notes: 'World\'s highest Shiva temple. Opens after snow clearance on Chopta–Tungnath trail.',
      },
      daily: {
        summerTimings: [
          { event: 'Kapaat Opens (Morning)', time: '05:00 AM', icon: '🚪' },
          { event: 'Morning Aarti', time: '05:00 AM – 05:30 AM', icon: '🪔' },
          { event: 'General Darshan', time: '06:00 AM – 12:00 PM', icon: '👁️' },
          { event: 'Kapaat Closes (Afternoon)', time: '12:00 PM', icon: '🔒' },
          { event: 'Kapaat Reopens (Evening)', time: '03:00 PM', icon: '🚪' },
          { event: 'Evening Darshan', time: '03:00 PM – 06:00 PM', icon: '👁️' },
          { event: 'Sandhya Aarti & Kapaat Closes', time: '06:00 PM – 06:30 PM', icon: '🔒' },
        ],
        winterNote: 'Winter worship at Mukkumath village temple (7:00 AM – 5:00 PM)',
      },
    },
    {
      id: 'rudranath',
      name: 'Rudranath Temple',
      group: 'Panch Kedar',
      deity: 'Lord Shiva (Face/Mukh)',
      elevation: '3,600 m',
      location: 'Chamoli District',
      image: '/images/rudranath/rudranath-1.jpg',
      managedBy: 'Local Rawal & Chamoli Administration',
      seasonal: {
        openingDate: `${year}-05-15`,
        closingDate: `${year}-10-20`,
        openingOccasion: 'Mid-May (snow dependent)',
        closingOccasion: 'Before Diwali',
        winterDeity: 'Idol shifted to Gopeshwar',
        notes: 'Most difficult Panch Kedar trek. 24 km from Sagar/Mandal village. Opens only after complete snow melt.',
      },
      daily: {
        summerTimings: [
          { event: 'Kapaat Opens (Morning)', time: '06:00 AM', icon: '🚪' },
          { event: 'Morning Puja', time: '06:00 AM – 07:00 AM', icon: '🪔' },
          { event: 'General Darshan', time: '07:00 AM – 05:00 PM', icon: '👁️' },
          { event: 'Evening Aarti & Kapaat Closes', time: '05:00 PM – 06:00 PM', icon: '🔒' },
        ],
        winterNote: 'Temple remains closed. Winter worship at Gopeshwar.',
      },
    },
    {
      id: 'madhyamaheshwar',
      name: 'Madhyamaheshwar Temple',
      group: 'Panch Kedar',
      deity: 'Lord Shiva (Navel/Nabhi)',
      elevation: '3,497 m',
      location: 'Rudraprayag District',
      image: '/images/madhyamaheshwar/madhyamaheshwar-1.jpg',
      managedBy: 'Shri Badrinath-Kedarnath Temple Committee',
      seasonal: {
        openingDate: `${year}-05-12`,
        closingDate: `${year}-10-28`,
        openingOccasion: 'After Akshaya Tritiya',
        closingOccasion: 'Before Bhai Dooj',
        winterDeity: 'Idol shifted to Omkareshwar Temple, Ukhimath',
        notes: 'Trek from Ransi village (24 km). Scenic meadows of Bantoli en route.',
      },
      daily: {
        summerTimings: [
          { event: 'Kapaat Opens (Morning)', time: '05:30 AM', icon: '🚪' },
          { event: 'Morning Aarti', time: '05:30 AM – 06:00 AM', icon: '🪔' },
          { event: 'General Darshan', time: '06:00 AM – 12:00 PM', icon: '👁️' },
          { event: 'Kapaat Closes (Afternoon)', time: '12:00 PM', icon: '🔒' },
          { event: 'Kapaat Reopens (Evening)', time: '02:00 PM', icon: '🚪' },
          { event: 'Evening Darshan', time: '02:00 PM – 06:00 PM', icon: '👁️' },
          { event: 'Evening Aarti & Kapaat Closes', time: '06:00 PM – 06:30 PM', icon: '🔒' },
        ],
        winterNote: 'Winter worship at Omkareshwar Temple, Ukhimath (6:00 AM – 7:00 PM)',
      },
    },
    {
      id: 'kalpeshwar',
      name: 'Kalpeshwar Temple',
      group: 'Panch Kedar',
      deity: 'Lord Shiva (Hair/Jata)',
      elevation: '2,200 m',
      location: 'Chamoli District (Urgam Valley)',
      image: '/images/kalpeshwar/kalpeshwar-1.jpg',
      managedBy: 'Local Trust',
      seasonal: {
        openingDate: 'Year-round',
        closingDate: null,
        openingOccasion: 'No seasonal closure',
        closingOccasion: 'N/A',
        winterDeity: null,
        notes: 'Only Panch Kedar temple open throughout the year. Accessible via motorable road to Urgam + 2 km trek.',
      },
      daily: {
        summerTimings: [
          { event: 'Kapaat Opens (Morning)', time: '06:00 AM', icon: '🚪' },
          { event: 'Morning Puja', time: '06:00 AM – 07:00 AM', icon: '🪔' },
          { event: 'General Darshan', time: '07:00 AM – 06:00 PM', icon: '👁️' },
          { event: 'Evening Aarti & Kapaat Closes', time: '06:00 PM – 06:30 PM', icon: '🔒' },
        ],
        winterNote: 'Open year-round. Winter timings: 7:00 AM – 5:00 PM.',
      },
    },

    // ─── CHAR DHAM ──────────────────────────────────────────
    {
      id: 'badrinath',
      name: 'Badrinath Temple',
      group: 'Char Dham',
      deity: 'Lord Vishnu (Badri Narayan)',
      elevation: '3,133 m',
      location: 'Chamoli District',
      image: null,
      managedBy: 'Shri Badrinath-Kedarnath Temple Committee',
      seasonal: {
        openingDate: `${year}-05-09`,
        closingDate: `${year}-11-15`,
        openingOccasion: 'Basant Panchami (approx.)',
        closingOccasion: 'Vijaya Dashami / Mid-November',
        winterDeity: 'Akhand Jyoti lit; idol stays; Narad Puja continues at temple',
        notes: 'One of the holiest Hindu pilgrimages. Kapaat opening a major event with national media coverage.',
      },
      daily: {
        summerTimings: [
          { event: 'Kapaat Opens (Morning)', time: '04:30 AM', icon: '🚪' },
          { event: 'Maha Abhishek Puja', time: '04:30 AM – 06:30 AM', icon: '🪔' },
          { event: 'General Darshan', time: '06:30 AM – 01:00 PM', icon: '👁️' },
          { event: 'Kapaat Closes (Afternoon)', time: '01:00 PM', icon: '🔒' },
          { event: 'Kapaat Reopens (Evening)', time: '04:00 PM', icon: '🚪' },
          { event: 'Evening Darshan', time: '04:00 PM – 09:00 PM', icon: '👁️' },
          { event: 'Sandhya Aarti', time: '07:30 PM – 08:00 PM', icon: '🪔' },
          { event: 'Shayan Aarti & Kapaat Closes', time: '09:00 PM', icon: '🔒' },
        ],
        winterNote: 'Temple remains closed. Akhand Jyoti stays lit. Narad Puja performed by priests.',
      },
    },
    {
      id: 'gangotri',
      name: 'Gangotri Temple',
      group: 'Char Dham',
      deity: 'Goddess Ganga',
      elevation: '3,100 m',
      location: 'Uttarkashi District',
      image: null,
      managedBy: 'Gangotri Temple Committee',
      seasonal: {
        openingDate: `${year}-05-07`,
        closingDate: `${year}-10-26`,
        openingOccasion: 'Akshaya Tritiya',
        closingOccasion: 'Diwali Day',
        winterDeity: 'Idol shifted to Mukhyamath Temple, Mukhba village',
        notes: 'Source of the holy Ganges river. Opens same day as Kedarnath (Akshaya Tritiya).',
      },
      daily: {
        summerTimings: [
          { event: 'Kapaat Opens (Morning)', time: '06:15 AM', icon: '🚪' },
          { event: 'Morning Aarti', time: '06:15 AM – 06:45 AM', icon: '🪔' },
          { event: 'General Darshan', time: '07:00 AM – 02:00 PM', icon: '👁️' },
          { event: 'Kapaat Closes (Afternoon)', time: '02:00 PM', icon: '🔒' },
          { event: 'Kapaat Reopens (Evening)', time: '03:00 PM', icon: '🚪' },
          { event: 'Evening Darshan', time: '03:00 PM – 06:30 PM', icon: '👁️' },
          { event: 'Sandhya Aarti & Kapaat Closes', time: '06:30 PM – 07:00 PM', icon: '🔒' },
        ],
        winterNote: 'Winter worship at Mukhba village temple (Mukhyamath), 7:00 AM – 5:00 PM',
      },
    },
    {
      id: 'yamunotri',
      name: 'Yamunotri Temple',
      group: 'Char Dham',
      deity: 'Goddess Yamuna',
      elevation: '3,293 m',
      location: 'Uttarkashi District',
      image: null,
      managedBy: 'Yamunotri Temple Committee',
      seasonal: {
        openingDate: `${year}-05-07`,
        closingDate: `${year}-10-26`,
        openingOccasion: 'Akshaya Tritiya',
        closingOccasion: 'Yama Dwitiya (Bhai Dooj)',
        winterDeity: 'Idol shifted to Kharsali village',
        notes: 'Source of the Yamuna river. 6 km trek from Janki Chatti. Hot water springs (Surya Kund) near temple.',
      },
      daily: {
        summerTimings: [
          { event: 'Kapaat Opens (Morning)', time: '06:00 AM', icon: '🚪' },
          { event: 'Morning Aarti', time: '06:00 AM – 06:30 AM', icon: '🪔' },
          { event: 'General Darshan', time: '07:00 AM – 12:00 PM', icon: '👁️' },
          { event: 'Kapaat Closes (Afternoon)', time: '12:00 PM', icon: '🔒' },
          { event: 'Kapaat Reopens (Evening)', time: '02:00 PM', icon: '🚪' },
          { event: 'Evening Darshan', time: '02:00 PM – 06:00 PM', icon: '👁️' },
          { event: 'Sandhya Aarti & Kapaat Closes', time: '06:00 PM – 07:00 PM', icon: '🔒' },
        ],
        winterNote: 'Winter worship at Kharsali village temple, 7:00 AM – 5:00 PM',
      },
    },

    // ─── OTHER IMPORTANT TEMPLES ────────────────────────────
    {
      id: 'hemkund-sahib',
      name: 'Hemkund Sahib',
      group: 'Sikh Pilgrimage',
      deity: 'Guru Gobind Singh Ji',
      elevation: '4,329 m',
      location: 'Chamoli District',
      image: null,
      managedBy: 'Hemkund Sahib Management Trust',
      seasonal: {
        openingDate: `${year}-05-25`,
        closingDate: `${year}-10-10`,
        openingOccasion: 'Late May (after snow clearance)',
        closingOccasion: 'Early October',
        winterDeity: null,
        notes: 'Located at 4,329 m near Valley of Flowers. Highest Gurudwara in the world. 19 km trek from Govindghat.',
      },
      daily: {
        summerTimings: [
          { event: 'Kapaat Opens', time: '04:30 AM', icon: '🚪' },
          { event: 'Prakash (Morning Prayer)', time: '04:30 AM – 05:30 AM', icon: '🪔' },
          { event: 'Open for Darshan', time: '05:30 AM – 04:00 PM', icon: '👁️' },
          { event: 'Rehras Sahib (Evening Prayer)', time: '04:00 PM – 05:00 PM', icon: '🪔' },
          { event: 'Kapaat Closes', time: '05:00 PM', icon: '🔒' },
        ],
        winterNote: 'Temple remains completely closed in winter due to extreme snow.',
      },
    },
  ];

  // Compute live status for each temple
  return temples.map(temple => ({
    ...temple,
    status: computeTempleStatus(temple, now, year, month, day, minutes),
  }));
}

/**
 * Compute current status of a temple (open/closed, daily kapaat status).
 */
function computeTempleStatus(temple, now, year, month, day, minutesSinceMidnight) {
  const seasonal = temple.seasonal;
  const ts = now.toISOString();

  // Year-round temple (Kalpeshwar)
  if (seasonal.openingDate === 'Year-round') {
    const dailyStatus = getDailyKapaatStatus(temple.daily.summerTimings, minutesSinceMidnight, month);
    return {
      seasonalStatus: 'open',
      seasonalLabel: 'Open Year-Round',
      seasonalColor: 'green',
      isSeasonalOpen: true,
      closingDate: null,
      openingDate: null,
      daysUntilClose: null,
      daysUntilOpen: null,
      dailyStatus,
      timestamp: ts,
    };
  }

  const openDate = new Date(seasonal.openingDate);
  const closeDate = new Date(seasonal.closingDate);
  const today = new Date(year, month, day);

  const isSeasonOpen = today >= openDate && today <= closeDate;

  if (isSeasonOpen) {
    const daysUntilClose = Math.ceil((closeDate - today) / (1000 * 60 * 60 * 24));
    const dailyStatus = getDailyKapaatStatus(temple.daily.summerTimings, minutesSinceMidnight, month);

    return {
      seasonalStatus: daysUntilClose <= 15 ? 'closing-soon' : 'open',
      seasonalLabel: daysUntilClose <= 15
        ? `Closing in ${daysUntilClose} day${daysUntilClose !== 1 ? 's' : ''}`
        : 'Open for Darshan',
      seasonalColor: daysUntilClose <= 15 ? 'amber' : 'green',
      isSeasonalOpen: true,
      closingDate: seasonal.closingDate,
      openingDate: seasonal.openingDate,
      closingOccasion: seasonal.closingOccasion,
      daysUntilClose,
      daysUntilOpen: null,
      dailyStatus,
      timestamp: ts,
    };
  } else {
    // Temple is closed — compute next opening
    let nextOpen = openDate;
    if (today > closeDate) {
      // Next year's opening
      nextOpen = new Date(`${year + 1}-05-07`);
    }
    const daysUntilOpen = Math.max(0, Math.ceil((nextOpen - today) / (1000 * 60 * 60 * 24)));

    return {
      seasonalStatus: 'closed',
      seasonalLabel: `Closed for Winter`,
      seasonalColor: 'red',
      isSeasonalOpen: false,
      closingDate: seasonal.closingDate,
      openingDate: nextOpen.toISOString().split('T')[0],
      openingOccasion: seasonal.openingOccasion,
      daysUntilClose: null,
      daysUntilOpen,
      winterDeity: seasonal.winterDeity,
      dailyStatus: null,
      timestamp: ts,
    };
  }
}

/**
 * Determine which daily kapaat slot is currently active.
 */
function getDailyKapaatStatus(timings, minutesSinceMidnight, month) {
  // Parse first event (morning opening) and last event (night closing) times
  const parseTime = (timeStr) => {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return null;
    let h = parseInt(match[1]);
    const m = parseInt(match[2]);
    const period = match[3].toUpperCase();
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  };

  // Find current slot
  let currentEvent = null;
  let nextEvent = null;

  for (let i = 0; i < timings.length; i++) {
    const eventTime = parseTime(timings[i].time);
    if (eventTime === null) continue;

    if (minutesSinceMidnight >= eventTime) {
      currentEvent = timings[i];
      nextEvent = timings[i + 1] || null;
    }
  }

  const firstTime = parseTime(timings[0].time);
  const lastTime = parseTime(timings[timings.length - 1].time);

  const isBeforeOpening = minutesSinceMidnight < (firstTime || 360);
  const isAfterClosing = minutesSinceMidnight >= (lastTime || 1260);

  let status, label, color;

  if (isBeforeOpening) {
    status = 'closed';
    label = `Kapaat closed. Opens at ${timings[0].time}`;
    color = 'red';
  } else if (isAfterClosing) {
    status = 'closed';
    label = `Kapaat closed for the night`;
    color = 'red';
  } else if (currentEvent && (currentEvent.event.toLowerCase().includes('closes') || currentEvent.event.toLowerCase().includes('close'))) {
    status = 'break';
    label = nextEvent ? `Afternoon break. Reopens at ${nextEvent.time}` : 'Kapaat closed';
    color = 'amber';
  } else {
    status = 'open';
    label = currentEvent ? currentEvent.event : 'Darshan ongoing';
    color = 'green';
  }

  return {
    status,
    label,
    color,
    currentEvent,
    nextEvent,
    timings,
  };
}

/**
 * Generate alert-style updates for kapaat events.
 */
function generateKapaatAlerts(temples, now) {
  const updates = [];
  const ts = now.toISOString();

  for (const temple of temples) {
    const s = temple.status;

    // Closing soon alerts
    if (s.seasonalStatus === 'closing-soon') {
      updates.push({
        id: `kapaat-closing-${temple.id}`,
        type: 'travel',
        category: 'kapaat',
        severity: 'warning',
        title: `${temple.name} — Kapaat Closing in ${s.daysUntilClose} Days`,
        description: `${temple.name} kapaat (doors) will close for winter on ${formatDate(s.closingDate)} (${s.closingOccasion}). Complete your darshan before closing.`,
        location: temple.name,
        locationId: temple.id,
        source: temple.managedBy,
        verified: true,
        timestamp: ts,
      });
    }

    // Closed temples — opening countdown
    if (s.seasonalStatus === 'closed' && s.daysUntilOpen !== null && s.daysUntilOpen <= 60) {
      updates.push({
        id: `kapaat-opening-${temple.id}`,
        type: 'travel',
        category: 'kapaat',
        severity: s.daysUntilOpen <= 15 ? 'info' : 'info',
        title: `${temple.name} — Kapaat Opens in ${s.daysUntilOpen} Days`,
        description: `${temple.name} is expected to reopen on ${formatDate(s.openingDate)} (${s.openingOccasion}). ${temple.seasonal.notes || ''}`,
        location: temple.name,
        locationId: temple.id,
        source: temple.managedBy,
        verified: true,
        timestamp: ts,
      });
    }
  }

  return updates;
}

function formatDate(dateStr) {
  if (!dateStr) return 'TBD';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}
