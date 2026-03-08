/**
 * Updates API Service — Frontend data-fetching layer.
 *
 * Connects to the backend API server for live data.
 * Falls back to curated data if the API is unreachable.
 */

// In production, set this to your deployed API URL
// e.g., https://api.panchkedaryatra.in or your Vercel/Railway URL
const API_BASE = import.meta.env.VITE_UPDATES_API_URL || 'http://localhost:4000';

/**
 * Generic fetch wrapper with timeout and error handling.
 */
async function apiFetch(endpoint, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });
    clearTimeout(timer);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    console.warn(`[UpdatesAPI] ${endpoint} failed:`, err.message);
    return null;
  }
}

/**
 * Fetch all updates (weather + road + travel).
 */
export async function fetchAllUpdates() {
  return apiFetch('/api/updates');
}

/**
 * Fetch weather data only.
 */
export async function fetchWeather() {
  return apiFetch('/api/updates/weather');
}

/**
 * Fetch road updates only.
 */
export async function fetchRoadUpdates() {
  return apiFetch('/api/updates/road');
}

/**
 * Fetch travel updates only.
 */
export async function fetchTravelUpdates() {
  return apiFetch('/api/updates/travel');
}

/**
 * Fetch kapaat (temple door) schedules.
 */
export async function fetchKapaatUpdates() {
  return apiFetch('/api/updates/kapaat');
}

/**
 * Open-Meteo direct client-side call (backup for weather).
 * Free, no API key needed.
 */
export async function fetchWeatherDirect(lat, lon) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
