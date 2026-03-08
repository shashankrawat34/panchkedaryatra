import { FiRefreshCw } from 'react-icons/fi';

/**
 * Live indicator dot + "Last updated" display + manual refresh button.
 */
export default function LiveIndicator({ isLive, lastUpdated, usingFallback, onRefresh }) {
  const formatTime = (date) => {
    if (!date) return '--';
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      {/* Live / Offline indicator */}
      <div className="flex items-center gap-1.5">
        <span
          className={`relative flex h-2.5 w-2.5 ${isLive ? '' : ''}`}
        >
          {isLive && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isLive ? 'bg-green-500' : 'bg-amber-400'
            }`}
          />
        </span>
        <span className={`font-medium ${isLive ? 'text-green-700' : 'text-amber-700'}`}>
          {isLive ? 'Live' : 'Offline'}
        </span>
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <span className="text-primary-500">
          Updated {formatTime(lastUpdated)}
        </span>
      )}

      {/* Fallback notice */}
      {usingFallback && (
        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
          Showing cached data
        </span>
      )}

      {/* Refresh button */}
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="ml-auto flex items-center gap-1 text-primary-500 hover:text-accent-600 transition-colors"
          title="Refresh updates"
        >
          <FiRefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      )}
    </div>
  );
}
