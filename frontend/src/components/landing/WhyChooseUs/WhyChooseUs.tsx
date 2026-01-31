import { FiTruck, FiShield, FiCheckCircle, FiRefreshCw } from "react-icons/fi";

import { WHY_CHOOSE_US_CONFIG } from "@/config/why-choose-us.config";
import type { WhyChooseUsItem } from "@/config/config.types";

/**
 * Icon mapping
 * Add new icons here without touching config
 */
const ICON_MAP: Record<string, JSX.Element> = {
  quality: <FiCheckCircle size={28} />,
  delivery: <FiTruck size={28} />,
  secure: <FiShield size={28} />,
  returns: <FiRefreshCw size={28} />,
};

export default function WhyChooseUs() {
  const { enabled, title, subtitle, items } = WHY_CHOOSE_US_CONFIG;

  if (!enabled) return null;

  const visibleItems = items.filter((item: WhyChooseUsItem) => item.enabled);

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-3 text-sm text-gray-600">{subtitle}</p>}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm"
            >
              {/* Icon */}
              <div className="mb-4 text-gray-900">
                {ICON_MAP[item.icon] ?? <FiCheckCircle size={28} />}
              </div>

              {/* Title */}
              <h3 className="text-base font-medium">{item.title}</h3>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
