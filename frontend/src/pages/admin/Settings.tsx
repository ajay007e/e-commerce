import { Link } from "react-router-dom";
import { FaHome, FaFileAlt, FaCog } from "react-icons/fa";

export default function AdminSettings() {
  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="text-gray-600 mt-1">
          Manage homepage content, static pages, and global configuration.
        </p>
      </div>

      {/* Settings cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Homepage */}
        <SettingsCard
          icon={<FaHome />}
          title="Homepage"
          description="Control banners, featured sections, and homepage visibility."
          to="/admin/settings/homepage"
        />

        {/* Pages */}
        <SettingsCard
          icon={<FaFileAlt />}
          title="Pages"
          description="Edit static pages like About, Privacy, and Policies."
          to="/admin/settings/pages"
        />

        {/* Global Config */}
        <SettingsCard
          icon={<FaCog />}
          title="Global Configuration"
          description="Manage store identity, defaults, and feature toggles."
          to="/admin/settings/config"
        />
      </div>
    </div>
  );
}

/* ---------- Reusable card ---------- */
function SettingsCard({
  icon,
  title,
  description,
  to,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="bg-white border rounded-lg p-6 hover:shadow-md transition block"
    >
      <div className="flex items-center gap-3 mb-3 text-gray-800">
        <span className="text-xl">{icon}</span>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <span className="text-sm font-medium text-blue-600">Manage →</span>
    </Link>
  );
}
