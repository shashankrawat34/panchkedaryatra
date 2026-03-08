import { FiNavigation, FiMap, FiTruck } from 'react-icons/fi';

/**
 * Displays the monitored route cards from road updates.
 */
export default function RouteCards({ routes }) {
  if (!routes || routes.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="font-heading font-semibold text-primary-800 text-base mb-3 flex items-center gap-2">
        <FiMap className="w-4 h-4 text-accent-500" />
        Key Routes We Monitor
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white border border-primary-100 rounded-lg p-3.5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <FiNavigation className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-primary-800 text-sm leading-snug mb-1">
                  {route.name}
                </h4>
                <div className="flex items-center gap-3 text-xs text-primary-500">
                  <span className="flex items-center gap-1">
                    <FiMap className="w-3 h-3" />
                    {route.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiTruck className="w-3 h-3" />
                    {route.estimatedTime}
                  </span>
                </div>
                {route.description && (
                  <p className="text-xs text-primary-500 mt-1.5 leading-relaxed">
                    {route.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
