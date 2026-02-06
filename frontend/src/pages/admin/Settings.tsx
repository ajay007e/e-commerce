import { FaHome, FaFileAlt, FaCog } from "react-icons/fa";

export default function AdminSettings() {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* Header (Dashboard Style) */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>

        <p className="text-sm text-gray-500">
          Manage content, pages, and global configuration
        </p>
      </div>

      {/* Placeholder Content (Optional) */}
      {/* Remove later when real UI is ready */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <p className="text-sm text-gray-500">Settings will appear here.</p>
      </div>
    </div>
  );
}

/* ---------- Reusable card ---------- */
function SettingsCard({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        bg-white border rounded-lg p-6
        shadow-sm
        hover:shadow-md
        transition
        relative
      "
    >
      {/* Badge */}
      <span
        className="
          absolute top-3 right-3
          text-xs font-medium
          px-2 py-0.5
          rounded-full
          bg-gray-100 text-gray-600
        "
      >
        Coming Soon
      </span>

      <div className="flex items-center gap-3 mb-3 text-gray-800">
        <span className="text-xl">{icon}</span>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <span className="text-sm font-medium text-gray-400">
        Not available yet
      </span>
    </div>
  );
}
