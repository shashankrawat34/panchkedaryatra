/**
 * Weather Service — fetches LIVE weather data from Open-Meteo API.
 *
 * Open-Meteo: 100% free, NO API key needed, 10,000 calls/day
 * Docs: https://open-meteo.com/en/docs
 *
 * For each Panch Kedar location we fetch:
 *  - Current weather (temperature, conditions, wind, humidity)
 *  - 7-day daily forecast
 *  - Derived safety alerts (cold, rain, snow, wind, fog, storms)
 */
import config from '../config.js';
import cache from '../utils/cache.js';

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';

/**
 * WMO weather code → condition name mapping.
 */
const WMO_CODES = {
  0: { condition: 'Clear', description: 'clear sky', icon: '01d' },
  1: { condition: 'Clear', description: 'mainly clear', icon: '01d' },
  2: { condition: 'Clouds', description: 'partly cloudy', icon: '02d' },
  3: { condition: 'Clouds', description: 'overcast', icon: '04d' },
  45: { condition: 'Fog', description: 'fog', icon: '50d' },
  48: { condition: 'Fog', description: 'depositing rime fog', icon: '50d' },
  51: { condition: 'Drizzle', description: 'light drizzle', icon: '09d' },
  53: { condition: 'Drizzle', description: 'moderate drizzle', icon: '09d' },
  55: { condition: 'Drizzle', description: 'dense drizzle', icon: '09d' },
  56: { condition: 'Drizzle', description: 'freezing drizzle', icon: '09d' },
  57: { condition: 'Drizzle', description: 'heavy freezing drizzle', icon: '09d' },
  61: { condition: 'Rain', description: 'slight rain', icon: '10d' },
  63: { condition: 'Rain', description: 'moderate rain', icon: '10d' },
  65: { condition: 'Rain', description: 'heavy rain', icon: '10d' },
  66: { condition: 'Rain', description: 'light freezing rain', icon: '13d' },
  67: { condition: 'Rain', description: 'heavy freezing rain', icon: '13d' },
  71: { condition: 'Snow', description: 'slight snowfall', icon: '13d' },
  73: { condition: 'Snow', description: 'moderate snowfall', icon: '13d' },
  75: { condition: 'Snow', description: 'heavy snowfall', icon: '13d' },
  77: { condition: 'Snow', description: 'snow grains', icon: '13d' },
  80: { condition: 'Rain', description: 'slight rain showers', icon: '09d' },
  81: { condition: 'Rain', description: 'moderate rain showers', icon: '09d' },
  82: { condition: 'Rain', description: 'violent rain showers', icon: '09d' },
  85: { condition: 'Snow', description: 'slight snow showers', icon: '13d' },
  86: { condition: 'Snow', description: 'heavy snow showers', icon: '13d' },
  95: { condition: 'Thunderstorm', description: 'thunderstorm', icon: '11d' },
  96: { condition: 'Thunderstorm', description: 'thunderstorm with slight hail', icon: '11d' },
  99: { condition: 'Thunderstorm', description: 'thunderstorm with heavy hail', icon: '11d' },
};

function decodeWMO(code) {
  return WMO_CODES[code] || { condition: 'Unknown', description: 'unknown', icon: '01d' };
}

/**
 * Fetch live weather + 7-day forecast from Open-Meteo for a single location.
 */
async function fetchWeatherForLocation(location) {
  const params = new URLSearchParams({
    latitude: location.lat,
    longitude: location.lon,
    current: [
      'temperature_2m', 'relative_humidity_2m', 'apparent_temperature',
      'weather_code', 'wind_speed_10m', 'wind_direction_10m',
      'surface_pressure', 'cloud_cover', 'precipitation', 'snowfall',
    ].join(','),
    daily: [
      'temperature_2m_max', 'temperature_2m_min', 'weather_code',
      'precipitation_sum', 'snowfall_sum', 'wind_speed_10m_max',
      'sunrise', 'sunset',
    ].join(','),
    timezone: 'Asia/Kolkata',
    forecast_days: 7,
  });

  const url = `${OPEN_METEO_BASE}?${params}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Open-Meteo HTTP ${res.status}`);
    const data = await res.json();

    const c = data.current;
    const wmo = decodeWMO(c.weather_code);

    const current = {
      locationId: location.id,
      locationName: location.name,
      elevation: location.elevation,
      temperature: Math.round(c.temperature_2m),
      feelsLike: Math.round(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      pressure: Math.round(c.surface_pressure),
      condition: wmo.condition,
      description: wmo.description,
      icon: wmo.icon,
      windSpeed: Math.round(c.wind_speed_10m),
      windDirection: c.wind_direction_10m,
      clouds: c.cloud_cover,
      precipitation: c.precipitation || 0,
      snowfall: c.snowfall || 0,
      sunrise: data.daily?.sunrise?.[0] ? new Date(data.daily.sunrise[0]).toISOString() : null,
      sunset: data.daily?.sunset?.[0] ? new Date(data.daily.sunset[0]).toISOString() : null,
      timestamp: new Date().toISOString(),
    };

    // Build 7-day forecast
    const forecast = [];
    if (data.daily) {
      const d = data.daily;
      for (let i = 0; i < (d.time?.length || 0); i++) {
        const dayWmo = decodeWMO(d.weather_code[i]);
        forecast.push({
          date: d.time[i],
          tempMin: Math.round(d.temperature_2m_min[i]),
          tempMax: Math.round(d.temperature_2m_max[i]),
          condition: dayWmo.condition,
          description: dayWmo.description,
          totalRain: Math.round((d.precipitation_sum[i] || 0) * 10) / 10,
          totalSnow: Math.round((d.snowfall_sum[i] || 0) * 10) / 10,
          maxWind: Math.round(d.wind_speed_10m_max[i] || 0),
        });
      }
    }

    return { location, current, forecast };
  } catch (err) {
    console.error(`[WeatherService] Error fetching weather for ${location.name}:`, err.message);
    return null;
  }
}

/**
 * Derive safety alerts from live weather data.
 */
function deriveAlerts(locationWeather) {
  const alerts = [];

  for (const lw of locationWeather) {
    if (!lw?.current) continue;
    const w = lw.current;

    if (w.precipitation > 10) {
      alerts.push({
        id: `rain-${w.locationId}-${Date.now()}`,
        type: 'weather',
        severity: w.precipitation > 30 ? 'critical' : 'warning',
        title: `Heavy Rainfall at ${w.locationName}`,
        description: `${w.precipitation}mm precipitation recorded. Expect waterlogged trails and possible landslide risk.`,
        location: w.locationName,
        locationId: w.locationId,
        source: 'Open-Meteo (Live)',
        timestamp: w.timestamp,
      });
    }

    if (w.snowfall > 2) {
      alerts.push({
        id: `snow-${w.locationId}-${Date.now()}`,
        type: 'weather',
        severity: w.snowfall > 10 ? 'critical' : 'warning',
        title: `Snowfall at ${w.locationName}`,
        description: `${w.snowfall}cm snowfall recorded. Trail conditions may be hazardous.`,
        location: w.locationName,
        locationId: w.locationId,
        source: 'Open-Meteo (Live)',
        timestamp: w.timestamp,
      });
    }

    if (w.temperature < -5) {
      alerts.push({
        id: `cold-${w.locationId}-${Date.now()}`,
        type: 'weather',
        severity: w.temperature < -15 ? 'critical' : 'warning',
        title: `Extreme Cold at ${w.locationName}`,
        description: `Temperature at ${w.temperature}°C (feels like ${w.feelsLike}°C). Risk of frostbite with prolonged exposure.`,
        location: w.locationName,
        locationId: w.locationId,
        source: 'Open-Meteo (Live)',
        timestamp: w.timestamp,
      });
    }

    if (w.windSpeed > 50) {
      alerts.push({
        id: `wind-${w.locationId}-${Date.now()}`,
        type: 'weather',
        severity: w.windSpeed > 80 ? 'critical' : 'warning',
        title: `Strong Winds at ${w.locationName}`,
        description: `Wind speed at ${w.windSpeed} km/h. Camping may be unsafe.`,
        location: w.locationName,
        locationId: w.locationId,
        source: 'Open-Meteo (Live)',
        timestamp: w.timestamp,
      });
    }

    if (w.condition === 'Thunderstorm') {
      alerts.push({
        id: `storm-${w.locationId}-${Date.now()}`,
        type: 'weather',
        severity: 'critical',
        title: `Thunderstorm at ${w.locationName}`,
        description: `Active thunderstorm detected. Seek shelter immediately. Avoid ridgelines.`,
        location: w.locationName,
        locationId: w.locationId,
        source: 'Open-Meteo (Live)',
        timestamp: w.timestamp,
      });
    }

    if (w.condition === 'Fog') {
      alerts.push({
        id: `fog-${w.locationId}-${Date.now()}`,
        type: 'weather',
        severity: 'warning',
        title: `Fog / Low Visibility at ${w.locationName}`,
        description: `Foggy conditions reported. Trek with caution and stay on marked trails.`,
        location: w.locationName,
        locationId: w.locationId,
        source: 'Open-Meteo (Live)',
        timestamp: w.timestamp,
      });
    }
  }

  return alerts;
}

/**
 * Get all weather data for all Panch Kedar locations — LIVE from Open-Meteo.
 * Cached for 30 minutes.
 */
export async function getWeatherUpdates() {
  const cacheKey = 'weather-all';
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  console.log('[WeatherService] Fetching live weather from Open-Meteo...');

  const results = await Promise.all(
    config.locations.map(loc => fetchWeatherForLocation(loc))
  );

  const locationWeather = results.filter(Boolean);
  const alerts = deriveAlerts(locationWeather);

  const result = {
    locations: locationWeather,
    alerts,
    lastUpdated: new Date().toISOString(),
    source: 'Open-Meteo (Live)',
    sourceUrl: 'https://open-meteo.com',
  };

  if (locationWeather.length > 0) {
    cache.set(cacheKey, result, config.cache.weatherTTL);
    console.log(`[WeatherService] ✓ Live weather for ${locationWeather.length} locations`);
  }

  return result;
}
