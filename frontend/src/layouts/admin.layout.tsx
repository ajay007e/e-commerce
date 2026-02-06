import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaChevronDown,
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

          <CatalogNavGroup />

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
          <div className="flex items-center justify-center gap-2 mb-3 text-sm">
            <span>{user?.email}</span>
          </div>

          <button
            onClick={logout}
            className="w-full text-sm px-3 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}

        <div className="sticky top-6 z-20 bg-gray-100 px-6">
          <AdminBreadcrumb />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ============================= */
/* Navigation Components         */
/* ============================= */

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

function AdminSubNavLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded text-sm transition
        ${
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function CatalogNavGroup() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {/* Catalog Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm rounded
        text-gray-300 hover:bg-gray-800 hover:text-white transition"
      >
        <div className="flex items-center gap-3">
          <FaBoxOpen />
          <span>Catalog</span>
        </div>

        <FaChevronDown
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Catalog Items */}
      {open && (
        <div className="ml-8 mt-1 space-y-1">
          <AdminSubNavLink to="/admin/products">Products</AdminSubNavLink>

          {/*<AdminSubNavLink to="/admin/categories">Categories</AdminSubNavLink>*/}

          {/*<AdminSubNavLink to="/admin/sizes">Sizes</AdminSubNavLink>*/}
        </div>
      )}
    </div>
  );
}
