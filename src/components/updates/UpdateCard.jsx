import { FiAlertTriangle, FiAlertCircle, FiInfo, FiExternalLink, FiCheckCircle, FiClock, FiMapPin } from 'react-icons/fi';
import { CATEGORY_LABELS } from '../../data/updatesData';

const severityConfig = {
  critical: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-800',
    icon: FiAlertTriangle,
    iconColor: 'text-red-500',
    dot: 'bg-red-500',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    icon: FiAlertCircle,
    iconColor: 'text-amber-500',
    dot: 'bg-amber-500',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
    icon: FiInfo,
    iconColor: 'text-blue-500',
    dot: 'bg-blue-500',
  },
};

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 30) return `${diffDay}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function UpdateCard({ update }) {
  const config = severityConfig[update.severity] || severityConfig.info;
  const Icon = config.icon;

  return (
    <div
      className={`${config.bg} border ${config.border} rounded-xl p-4 md:p-5 transition-all duration-300 hover:shadow-md group`}
      data-aos="fade-up"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Severity icon */}
        <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-heading font-semibold text-primary-900 text-sm md:text-base leading-snug">
              {update.title}
            </h3>
            <span className="flex-shrink-0 text-xs text-primary-500 whitespace-nowrap flex items-center gap-1">
              <FiClock className="w-3 h-3" />
              {timeAgo(update.timestamp)}
            </span>
          </div>

          {/* Description */}
          <p className="text-primary-700 text-sm leading-relaxed mb-3">
            {update.description}
          </p>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Severity badge */}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              {update.severity.charAt(0).toUpperCase() + update.severity.slice(1)}
            </span>

            {/* Category badge */}
            {update.category && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                {CATEGORY_LABELS[update.category] || update.category}
              </span>
            )}

            {/* Location */}
            {update.location && (
              <span className="inline-flex items-center gap-1 text-xs text-primary-600">
                <FiMapPin className="w-3 h-3" />
                {update.location}
              </span>
            )}

            {/* Source */}
            {update.source && (
              <span className="inline-flex items-center gap-1 text-xs text-primary-500">
                {update.verified && <FiCheckCircle className="w-3 h-3 text-green-500" />}
                {update.sourceUrl ? (
                  <a
                    href={update.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-600 transition-colors inline-flex items-center gap-0.5"
                  >
                    {update.source}
                    <FiExternalLink className="w-2.5 h-2.5" />
                  </a>
                ) : (
                  update.source
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
