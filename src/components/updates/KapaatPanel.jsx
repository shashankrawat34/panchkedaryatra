/**
 * KapaatPanel — Temple Door Opening/Closing Schedules
 *
 * Shows a beautiful card grid with:
 *  - Seasonal status (Open / Closed / Closing Soon) with countdown
 *  - Live daily kapaat status (door open / break / closed)
 *  - Full daily darshan & aarti schedule (expandable)
 *  - Temple grouping (Panch Kedar, Char Dham, Others)
 */
import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiClock, FiCalendar, FiMapPin } from 'react-icons/fi';

const GROUP_ORDER = ['Panch Kedar', 'Char Dham', 'Sikh Pilgrimage'];

const STATUS_STYLES = {
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-800',
    dot: 'bg-green-500',
    ring: 'ring-green-400',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    dot: 'bg-amber-500',
    ring: 'ring-amber-400',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-800',
    dot: 'bg-red-500',
    ring: 'ring-red-400',
  },
};

export default function KapaatPanel({ kapaatData }) {
  if (!kapaatData?.temples || kapaatData.temples.length === 0) {
    return (
      <div className="text-center py-12 text-primary-500">
        <FiClock className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Kapaat schedule data unavailable</p>
      </div>
    );
  }

  // Group temples
  const grouped = {};
  for (const temple of kapaatData.temples) {
    const g = temple.group || 'Other';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(temple);
  }

  return (
    <div className="space-y-8">
      {GROUP_ORDER.filter(g => grouped[g]).map(group => (
        <div key={group}>
          <h3 className="font-heading text-lg font-bold text-primary-800 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-accent-500 inline-block" />
            {group}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {grouped[group].map(temple => (
              <TempleKapaatCard key={temple.id} temple={temple} />
            ))}
          </div>
        </div>
      ))}

      {/* Attribution */}
      {kapaatData.sources && (
        <p className="text-xs text-primary-400 mt-4">
          Kapaat timings are approximate and based on historical patterns. Exact dates are announced by temple
          committees each year. Always verify with official sources before planning your visit.
        </p>
      )}
    </div>
  );
}

function TempleKapaatCard({ temple }) {
  const [expanded, setExpanded] = useState(false);
  const status = temple.status || {};
  const styles = STATUS_STYLES[status.seasonalColor] || STATUS_STYLES.green;

  return (
    <div
      className={`rounded-xl border ${styles.border} bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Header with status */}
      <div className={`px-4 py-3 ${styles.bg} border-b ${styles.border}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-heading font-bold text-primary-900 text-sm truncate">
              {temple.name}
            </h4>
            <p className="text-xs text-primary-500 flex items-center gap-1 mt-0.5">
              <FiMapPin className="w-3 h-3 flex-shrink-0" />
              {temple.elevation} · {temple.location}
            </p>
          </div>
          <span
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles.badge}`}
          >
            <span className={`w-2 h-2 rounded-full ${styles.dot} ${status.seasonalStatus === 'open' ? 'animate-pulse' : ''}`} />
            {status.seasonalLabel}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        {/* Deity info */}
        <p className="text-xs text-primary-600 mb-2">
          <span className="font-medium">Deity:</span> {temple.deity}
          <span className="mx-1.5 text-primary-300">·</span>
          <span className="font-medium">By:</span> {temple.managedBy}
        </p>

        {/* Seasonal dates */}
        <div className="flex flex-wrap gap-2 mb-3">
          {status.isSeasonalOpen ? (
            <>
              <DateChip
                icon="🚪"
                label="Opened"
                date={temple.seasonal.openingOccasion}
              />
              {status.daysUntilClose && (
                <DateChip
                  icon="📅"
                  label="Closes in"
                  date={`${status.daysUntilClose} day${status.daysUntilClose !== 1 ? 's' : ''}`}
                  highlight={status.daysUntilClose <= 15}
                />
              )}
            </>
          ) : (
            <>
              <DateChip icon="🔒" label="Closed" date="Winter Season" />
              {status.daysUntilOpen != null && (
                <DateChip
                  icon="📅"
                  label="Opens in"
                  date={`~${status.daysUntilOpen} day${status.daysUntilOpen !== 1 ? 's' : ''}`}
                  highlight
                />
              )}
            </>
          )}
        </div>

        {/* Winter deity info */}
        {!status.isSeasonalOpen && status.winterDeity && (
          <div className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3">
            🕉️ {status.winterDeity}
          </div>
        )}

        {/* Daily Kapaat Status (only show if temple is seasonally open) */}
        {status.isSeasonalOpen && status.dailyStatus && (
          <div
            className={`text-xs rounded-lg px-3 py-2 mb-3 border ${
              status.dailyStatus.color === 'green'
                ? 'bg-green-50 border-green-100 text-green-700'
                : status.dailyStatus.color === 'amber'
                  ? 'bg-amber-50 border-amber-100 text-amber-700'
                  : 'bg-red-50 border-red-100 text-red-700'
            }`}
          >
            <span className="font-semibold">Right Now:</span> {status.dailyStatus.label}
          </div>
        )}

        {/* Expand to see schedule */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs font-medium text-accent-600 hover:text-accent-700 py-1.5 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <FiCalendar className="w-3.5 h-3.5" />
            Daily Kapaat Schedule & Aarti Timings
          </span>
          {expanded ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="mt-2 space-y-1.5 animate-fadeIn">
            {(status.isSeasonalOpen
              ? temple.daily.summerTimings
              : []
            ).map((slot, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md ${
                  slot.event.toLowerCase().includes('close')
                    ? 'bg-red-50 text-red-700'
                    : slot.event.toLowerCase().includes('open') || slot.event.toLowerCase().includes('reopen')
                      ? 'bg-green-50 text-green-700'
                      : slot.event.toLowerCase().includes('aarti') || slot.event.toLowerCase().includes('puja') || slot.event.toLowerCase().includes('prayer')
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-gray-50 text-primary-600'
                }`}
              >
                <span className="text-base flex-shrink-0">{slot.icon}</span>
                <span className="font-medium flex-1">{slot.event}</span>
                <span className="text-primary-500 flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  {slot.time}
                </span>
              </div>
            ))}

            {!status.isSeasonalOpen && temple.daily.winterNote && (
              <div className="text-xs text-amber-700 bg-amber-50 rounded-md px-3 py-2 italic">
                ❄️ {temple.daily.winterNote}
              </div>
            )}

            {temple.seasonal.notes && (
              <p className="text-xs text-primary-400 italic mt-2 px-1">
                ℹ️ {temple.seasonal.notes}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DateChip({ icon, label, date, highlight = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
        highlight
          ? 'bg-accent-50 text-accent-700 border border-accent-200 font-semibold'
          : 'bg-gray-50 text-primary-600 border border-primary-100'
      }`}
    >
      <span>{icon}</span>
      <span className="font-medium">{label}:</span>
      <span>{date}</span>
    </span>
  );
}
