/**
 * Panch Kedar Yatra — Real-Time Updates API Server
 *
 * Provides aggregated weather, road, and travel updates for the Panch Kedar region.
 *
 * Endpoints:
 *   GET /api/updates          — All updates (weather + road + travel combined)
 *   GET /api/updates/weather  — Weather data for all Panch Kedar locations
 *   GET /api/updates/road     — Road condition updates
 *   GET /api/updates/travel   — Travel advisories, permits, closures
 *   GET /api/health           — Health check
 *
 * Deployment options:
 *   - Vercel (serverless)
 *   - Railway / Render (free tier)
 *   - Any VPS / Hostinger VPS
 *   - Docker
 */
import express from 'express';
import cors from 'cors';
import config from './config.js';
import { getWeatherUpdates } from './services/weatherService.js';
import { getRoadUpdates } from './services/roadService.js';
import { getTravelUpdates } from './services/travelService.js';
import { getKapaatUpdates } from './services/kapaatService.js';
import cache from './utils/cache.js';

const app = express();

// ─── Middleware ─────────────────────────────────────────────────
app.use(cors({
  origin: [
    config.corsOrigin,
    'https://panchkedaryatra.in',
    'https://www.panchkedaryatra.in',
    /\.panchkedaryatra\.in$/,
  ],
  methods: ['GET'],
  maxAge: 86400,
}));

app.use(express.json());

// Request logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ─── API Routes ────────────────────────────────────────────────

/**
 * GET /api/health — Health check
 */
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    cache: cache.stats(),
    uptime: Math.round(process.uptime()),
  });
});

/**
 * GET /api/updates — All updates combined
 */
app.get('/api/updates', async (_req, res) => {
  try {
    const [weather, road, travel, kapaat] = await Promise.all([
      getWeatherUpdates(),
      getRoadUpdates(),
      getTravelUpdates(),
      getKapaatUpdates(),
    ]);

    // Merge all alerts/updates into a unified feed
    const allUpdates = [
      ...(travel.updates || []),
      ...(road.updates || []),
      ...(weather.alerts || []),
      ...(kapaat.updates || []),
    ].sort((a, b) => {
      const severityOrder = { critical: 0, warning: 1, info: 2 };
      const sDiff = (severityOrder[a.severity] || 2) - (severityOrder[b.severity] || 2);
      if (sDiff !== 0) return sDiff;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    res.json({
      updates: allUpdates,
      weather,
      road,
      travel,
      kapaat,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[API] Error fetching updates:', err);
    res.status(500).json({ error: 'Failed to fetch updates', message: err.message });
  }
});

/**
 * GET /api/updates/weather — Weather data only
 */
app.get('/api/updates/weather', async (_req, res) => {
  try {
    const data = await getWeatherUpdates();
    res.json(data);
  } catch (err) {
    console.error('[API] Error fetching weather:', err);
    res.status(500).json({ error: 'Failed to fetch weather data', message: err.message });
  }
});

/**
 * GET /api/updates/road — Road updates only
 */
app.get('/api/updates/road', async (_req, res) => {
  try {
    const data = await getRoadUpdates();
    res.json(data);
  } catch (err) {
    console.error('[API] Error fetching road updates:', err);
    res.status(500).json({ error: 'Failed to fetch road updates', message: err.message });
  }
});

/**
 * GET /api/updates/travel — Travel updates only
 */
app.get('/api/updates/travel', async (_req, res) => {
  try {
    const data = await getTravelUpdates();
    res.json(data);
  } catch (err) {
    console.error('[API] Error fetching travel updates:', err);
    res.status(500).json({ error: 'Failed to fetch travel updates', message: err.message });
  }
});

/**
 * GET /api/updates/kapaat — Kapaat (temple door) schedules
 */
app.get('/api/updates/kapaat', async (_req, res) => {
  try {
    const data = await getKapaatUpdates();
    res.json(data);
  } catch (err) {
    console.error('[API] Error fetching kapaat data:', err);
    res.status(500).json({ error: 'Failed to fetch kapaat data', message: err.message });
  }
});

// ─── 404 handler ───────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Error handler ─────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[API] Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start server ──────────────────────────────────────────────
app.listen(config.port, () => {
  console.log(`\n╔══════════════════════════════════════════════════╗`);
  console.log(`║  Panch Kedar Updates API                         ║`);
  console.log(`║  Running on http://localhost:${config.port}              ║`);
  console.log(`║  Weather API: ✓ Open-Meteo (free, no key)        ║`);
  console.log(`║  Kapaat API:  ✓ Live temple schedules             ║`);
  console.log(`║  CORS Origin: ${config.corsOrigin}           ║`);
  console.log(`╚══════════════════════════════════════════════════╝\n`);
});

export default app;
