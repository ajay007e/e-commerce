import { Outlet, NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUsers,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useAuth } from "@/context/auth.context";
import AdminBreadcrumb from "@/components/ui/Breadcrumb/AdminBreadcrumb";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}

      <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-700 text-lg font-semibold">
          Admin Panel
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          <AdminNavLink to="/admin" icon={<FaTachometerAlt />}>
            Dashboard
          </AdminNavLink>

          <AdminNavLink to="/admin/products" icon={<FaBoxOpen />}>
            Products
          </AdminNavLink>

          <AdminNavLink to="/admin/orders" icon={<FaClipboardList />}>
            Orders
          </AdminNavLink>

          <AdminNavLink to="/admin/users" icon={<FaUsers />}>
            Users
          </AdminNavLink>

          <AdminNavLink to="/admin/settings" icon={<FaCog />}>
            Settings
          </AdminNavLink>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-700">
          <div className="flex items-center text-center justify-center gap-2 mb-3 text-sm">
            <HiOutlineUserCircle className="w-6 h-6" />
            <span>{user?.name}</span>
          </div>

          <button
            onClick={logout}
            className="w-full text-sm px-3 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <AdminBreadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AdminNavLink({
  to,
  icon,
  children,
}: {
  to: string;
  icon: JSX.Element;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded text-sm transition
        ${
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}
