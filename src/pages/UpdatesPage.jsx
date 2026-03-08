import { useState, useMemo } from 'react';
import { FiCloud, FiNavigation, FiMap, FiAlertTriangle, FiFilter } from 'react-icons/fi';
import { LuDoorOpen } from 'react-icons/lu';
import PageBanner from '../components/PageBanner';
import SEO from '../components/SEO';
import UpdateCard from '../components/updates/UpdateCard';
import WeatherPanel from '../components/updates/WeatherPanel';
import LiveIndicator from '../components/updates/LiveIndicator';
import RouteCards from '../components/updates/RouteCards';
import KapaatPanel from '../components/updates/KapaatPanel';
import useUpdates from '../hooks/useUpdates';

const TABS = [
  { id: 'all', label: 'All Updates', icon: FiAlertTriangle },
  { id: 'kapaat', label: 'Kapaat', icon: LuDoorOpen },
  { id: 'travel', label: 'Travel', icon: FiMap },
  { id: 'road', label: 'Road', icon: FiNavigation },
  { id: 'weather', label: 'Weather', icon: FiCloud },
];

const SEVERITY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'critical', label: 'Critical', dot: 'bg-red-500' },
  { id: 'warning', label: 'Warning', dot: 'bg-amber-500' },
  { id: 'info', label: 'Info', dot: 'bg-blue-500' },
];

export default function UpdatesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const { data, loading, lastUpdated, isLive, usingFallback, refresh } = useUpdates();

  // Filter updates based on active tab and severity
  const filteredUpdates = useMemo(() => {
    if (!data?.updates) return [];

    let items = data.updates;

    // Tab filter
    if (activeTab === 'travel') {
      items = items.filter((u) => u.type === 'travel');
    } else if (activeTab === 'road') {
      items = items.filter((u) => u.type === 'road');
    } else if (activeTab === 'weather') {
      items = items.filter((u) => u.type === 'weather');
    }

    // Severity filter
    if (severityFilter !== 'all') {
      items = items.filter((u) => u.severity === severityFilter);
    }

    return items;
  }, [data, activeTab, severityFilter]);

  // Count critical updates for badge
  const criticalCount = useMemo(() => {
    return data?.updates?.filter((u) => u.severity === 'critical').length || 0;
  }, [data]);

  return (
    <>
      <SEO
        title="Live Updates — Weather, Road & Travel"
        description="Real-time updates for Panch Kedar Yatra region — live weather forecasts, road conditions, travel advisories, temple status, and safety alerts for Kedarnath, Tungnath, Rudranath, Madhyamaheshwar & Kalpeshwar."
        canonical="/updates"
      />

      <PageBanner
        title="Live Updates"
        subtitle="Real-time weather, road conditions & travel advisories for the Panch Kedar region"
        breadcrumbs={[{ label: 'Updates' }]}
        bgImage="/images/kedarnath/kedarnath-1.jpg"
      />

      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Live indicator bar */}
          <div className="mb-6 bg-white rounded-xl border border-primary-100 px-4 py-3 shadow-sm">
            <LiveIndicator
              isLive={isLive}
              lastUpdated={lastUpdated}
              usingFallback={usingFallback}
              onRefresh={refresh}
            />
          </div>

          {/* Critical alerts banner */}
          {criticalCount > 0 && (
            <div
              className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
              data-aos="fade-down"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <FiAlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-heading font-semibold text-red-800 text-sm">
                  {criticalCount} Critical Alert{criticalCount > 1 ? 's' : ''}
                </p>
                <p className="text-red-600 text-xs mt-0.5">
                  Important advisories requiring immediate attention
                </p>
              </div>
            </div>
          )}

          {/* Tab navigation */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-800 text-white shadow-md'
                        : 'bg-white text-primary-700 border border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-primary-600 text-sm">Loading updates...</p>
            </div>
          )}

          {/* Content based on active tab */}
          {!loading && data && (
            <>
              {/* Weather tab shows the weather panel */}
              {activeTab === 'weather' && (
                <div className="mb-8" data-aos="fade-up">
                  <WeatherPanel weatherData={data.weather} />
                </div>
              )}

              {/* Kapaat tab shows temple door schedules */}
              {activeTab === 'kapaat' && (
                <div className="mb-8" data-aos="fade-up">
                  <KapaatPanel kapaatData={data.kapaat} />
                </div>
              )}

              {/* All / Travel / Road tabs show update cards */}
              {activeTab !== 'weather' && activeTab !== 'kapaat' && (
                <>
                  {/* Severity filter */}
                  <div className="mb-4 flex items-center gap-2 flex-wrap">
                    <FiFilter className="w-4 h-4 text-primary-400" />
                    {SEVERITY_FILTERS.map((sf) => (
                      <button
                        key={sf.id}
                        onClick={() => setSeverityFilter(sf.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          severityFilter === sf.id
                            ? 'bg-primary-800 text-white'
                            : 'bg-white text-primary-600 border border-primary-200 hover:border-primary-300'
                        }`}
                      >
                        {sf.dot && <span className={`w-2 h-2 rounded-full ${sf.dot}`} />}
                        {sf.label}
                      </button>
                    ))}
                  </div>

                  {/* Update cards */}
                  <div className="space-y-3">
                    {filteredUpdates.length > 0 ? (
                      filteredUpdates.map((update) => (
                        <UpdateCard key={update.id} update={update} />
                      ))
                    ) : (
                      <div className="text-center py-12 text-primary-500">
                        <FiMap className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No updates match this filter</p>
                        <button
                          onClick={() => {
                            setActiveTab('all');
                            setSeverityFilter('all');
                          }}
                          className="text-accent-600 hover:text-accent-700 text-sm mt-2"
                        >
                          Clear filters
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Route cards on Road tab */}
                  {activeTab === 'road' && data.road?.routes && (
                    <RouteCards routes={data.road.routes} />
                  )}
                </>
              )}

              {/* Data sources attribution */}
              <div className="mt-10 pt-6 border-t border-primary-100">
                <h3 className="font-heading font-semibold text-primary-800 text-sm mb-3">
                  Data Sources & Attribution
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    ...(data.travel?.sources || []),
                    { name: 'Open-Meteo', url: 'https://open-meteo.com', type: 'api' },
                    ...(data.road?.sources || []),
                    ...(data.kapaat?.sources || []),
                  ]
                    // Deduplicate by name
                    .filter((s, i, arr) => arr.findIndex((x) => x.name === s.name) === i)
                    .map((source) => (
                      <a
                        key={source.name}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-primary-100 rounded-full text-xs text-primary-600 hover:border-accent-300 hover:text-accent-600 transition-all"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            source.type === 'official' ? 'bg-green-500' : 'bg-blue-400'
                          }`}
                        />
                        {source.name}
                      </a>
                    ))}
                </div>
                <p className="text-xs text-primary-400 mt-3">
                  Updates are refreshed every 5 minutes. Weather data provided by Open-Meteo. Kapaat timings based on
                  historical patterns — exact dates announced by temple committees. Always verify with local authorities before
                  travel.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
