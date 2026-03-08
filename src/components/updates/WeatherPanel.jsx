import {
  FiCloud,
  FiDroplet,
  FiWind,
  FiSunrise,
  FiSunset,
  FiThermometer,
  FiEye,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { useState } from 'react';

const weatherIcons = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Fog: '🌫️',
  Haze: '🌫️',
  Smoke: '🌫️',
  Unknown: '🌡️',
};

function getWeatherEmoji(condition) {
  return weatherIcons[condition] || weatherIcons.Unknown;
}

function formatTime(isoStr) {
  if (!isoStr) return '--';
  return new Date(isoStr).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function WeatherLocationCard({ data }) {
  const [expanded, setExpanded] = useState(false);
  const { current, forecast, location } = data;
  if (!current) return null;

  return (
    <div
      className="bg-white rounded-xl border border-primary-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      data-aos="fade-up"
    >
      {/* Main info */}
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-heading font-semibold text-primary-900 text-base">
              {current.locationName || location?.name}
            </h3>
            {(current.elevation || location?.elevation) && (
              <span className="text-xs text-primary-500">
                {current.elevation || location?.elevation}m elevation
              </span>
            )}
          </div>
          <span className="text-3xl" title={current.condition}>
            {getWeatherEmoji(current.condition)}
          </span>
        </div>

        {/* Temperature */}
        <div className="flex items-end gap-2 mb-1">
          <span className="text-4xl font-bold text-primary-900 leading-none">
            {current.temperature}°
          </span>
          <span className="text-sm text-primary-500 mb-1">C</span>
        </div>
        <p className="text-sm text-primary-600 capitalize mb-4">{current.description}</p>

        {/* Quick stats grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          {current.feelsLike !== undefined && (
            <div className="flex items-center gap-1.5 text-primary-600">
              <FiThermometer className="w-3.5 h-3.5 text-primary-400" />
              <span>Feels {current.feelsLike}°</span>
            </div>
          )}
          {current.humidity !== undefined && (
            <div className="flex items-center gap-1.5 text-primary-600">
              <FiDroplet className="w-3.5 h-3.5 text-blue-400" />
              <span>{current.humidity}%</span>
            </div>
          )}
          {current.windSpeed !== undefined && (
            <div className="flex items-center gap-1.5 text-primary-600">
              <FiWind className="w-3.5 h-3.5 text-primary-400" />
              <span>{current.windSpeed} km/h</span>
            </div>
          )}
          {current.visibility !== undefined && current.visibility !== null && (
            <div className="flex items-center gap-1.5 text-primary-600">
              <FiEye className="w-3.5 h-3.5 text-primary-400" />
              <span>{current.visibility} km</span>
            </div>
          )}
        </div>

        {/* Expand button */}
        {(forecast || current.sunrise) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-primary-500 hover:text-accent-600 transition-colors py-1"
          >
            {expanded ? 'Less details' : 'More details'}
            {expanded ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-primary-100 bg-primary-50/50 px-4 md:px-5 py-3 space-y-3">
          {/* Sunrise/Sunset */}
          {current.sunrise && (
            <div className="flex justify-between text-sm text-primary-600">
              <span className="flex items-center gap-1.5">
                <FiSunrise className="w-3.5 h-3.5 text-amber-500" />
                {formatTime(current.sunrise)}
              </span>
              <span className="flex items-center gap-1.5">
                <FiSunset className="w-3.5 h-3.5 text-orange-500" />
                {formatTime(current.sunset)}
              </span>
            </div>
          )}

          {/* 5-day forecast */}
          {forecast && forecast.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-primary-700 uppercase tracking-wider mb-2">
                5-Day Forecast
              </h4>
              <div className="space-y-1.5">
                {forecast.map((day) => (
                  <div key={day.date} className="flex items-center justify-between text-sm">
                    <span className="text-primary-600 w-20">
                      {new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })}
                    </span>
                    <span>{getWeatherEmoji(day.condition)}</span>
                    <span className="text-primary-800 font-medium w-14 text-right">
                      {day.tempMax}° / {day.tempMin}°
                    </span>
                    {day.totalRain > 0 && (
                      <span className="text-blue-500 text-xs w-12 text-right">
                        {day.totalRain}mm
                      </span>
                    )}
                    {day.totalSnow > 0 && (
                      <span className="text-blue-300 text-xs w-12 text-right">
                        {day.totalSnow}cm ❄
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function WeatherPanel({ weatherData }) {
  if (!weatherData || !weatherData.locations || weatherData.locations.length === 0) {
    return (
      <div className="text-center py-12 text-primary-500">
        <FiCloud className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Weather data unavailable</p>
        <p className="text-sm mt-1">Enable the backend API for live weather</p>
      </div>
    );
  }

  return (
    <div>
      {/* Source attribution */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-primary-500">
          Source: {weatherData.source || 'OpenWeatherMap'}
          {weatherData.source === 'Estimated (Seasonal Average)' && (
            <span className="ml-2 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Estimated
            </span>
          )}
        </p>
      </div>

      {/* Weather alerts */}
      {weatherData.alerts && weatherData.alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {weatherData.alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${
                alert.severity === 'critical'
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-sm opacity-80 mt-0.5">{alert.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Weather cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherData.locations.map((locData) => (
          <WeatherLocationCard key={locData.location?.id || locData.current?.locationId} data={locData} />
        ))}
      </div>
    </div>
  );
}
