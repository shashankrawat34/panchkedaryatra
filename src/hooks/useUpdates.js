/**
 * Custom hook for fetching and auto-refreshing updates data.
 * Connects to the backend API with polling and fallback to curated data.
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchAllUpdates } from '../services/updatesApi';
import {
  fallbackTravelUpdates,
  fallbackRoadUpdates,
  fallbackWeatherLocations,
  monitoredRoutes,
} from '../data/updatesData';

const POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function useUpdates() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const intervalRef = useRef(null);

  const loadUpdates = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);

    try {
      const result = await fetchAllUpdates();

      if (result) {
        setData(result);
        setLastUpdated(new Date());
        setIsLive(true);
        setUsingFallback(false);
        setError(null);
      } else {
        // API unreachable — use fallback data
        setData(buildFallbackData());
        setLastUpdated(new Date());
        setIsLive(false);
        setUsingFallback(true);
        setError(null);
      }
    } catch (err) {
      setData(buildFallbackData());
      setLastUpdated(new Date());
      setIsLive(false);
      setUsingFallback(true);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load + polling
  useEffect(() => {
    loadUpdates(true);

    intervalRef.current = setInterval(() => loadUpdates(false), POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loadUpdates]);

  // Manual refresh
  const refresh = useCallback(() => {
    loadUpdates(false);
  }, [loadUpdates]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    isLive,
    usingFallback,
    refresh,
  };
}

/**
 * Build a fallback data object that matches the API response shape.
 */
function buildFallbackData() {
  const allUpdates = [
    ...fallbackTravelUpdates,
    ...fallbackRoadUpdates,
  ].sort((a, b) => {
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    const sDiff = (severityOrder[a.severity] || 2) - (severityOrder[b.severity] || 2);
    if (sDiff !== 0) return sDiff;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return {
    updates: allUpdates,
    weather: {
      locations: fallbackWeatherLocations,
      alerts: [],
      lastUpdated: new Date().toISOString(),
      source: 'Estimated (Seasonal Average)',
    },
    road: {
      updates: fallbackRoadUpdates,
      routes: monitoredRoutes,
      lastUpdated: new Date().toISOString(),
    },
    travel: {
      updates: fallbackTravelUpdates,
      lastUpdated: new Date().toISOString(),
    },
    kapaat: {
      temples: [],
      updates: [],
      lastUpdated: new Date().toISOString(),
      sources: [],
    },
  };
}
