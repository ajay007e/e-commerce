import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineBars3,
  HiOutlineUserCircle,
  HiOutlineChevronDown,
} from "react-icons/hi2";

import { NAV_LINKS, NAVBAR_ICONS } from "@/config/navigation.config";
import { useAuth } from "@/context/auth.context";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const isAdmin = user?.isAdmin;
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={isAdmin ? "/admin" : "/"} className="text-xl font-semibold">
            SimpleShop
          </Link>

          {/* ===== ADMIN NAVBAR ===== */}
          {isAdmin && user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <HiOutlineUserCircle className="w-8 h-8 text-gray-600" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border shadow-sm">
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ===== NORMAL / GUEST NAVBAR ===== */}
          {!isAdmin && (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map((link) =>
                  link.children ? (
                    <div
                      key={link.label}
                      className="relative z-5"
                      onMouseEnter={() => setShopOpen(true)}
                      onMouseLeave={() => setShopOpen(false)}
                    >
                      <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-black">
                        {link.label}
                        <HiOutlineChevronDown className="w-4 h-4" />
                      </button>

                      {shopOpen && (
                        <div className="absolute top-full left-0 mt-2 w-44 bg-white border shadow-sm">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.path}
                              className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.path}
                      className="text-sm text-gray-700 hover:text-black"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                {NAVBAR_ICONS.filter((icon) => icon.enabled).map(
                  ({ key, Icon, path, label }) =>
                    path ? (
                      <Link key={key} to={path} aria-label={label}>
                        <Icon />
                      </Link>
                    ) : (
                      <button
                        className="cursor-pointer"
                        key={key}
                        aria-label={label}
                      >
                        <Icon />
                      </button>
                    ),
                )}

                {/* Guest Login */}
                {!user && (
                  <Link
                    to="/login"
                    className="hidden sm:inline-block text-sm font-medium text-gray-700 hover:text-black ml-2"
                  >
                    Login
                  </Link>
                )}

                {/* User Avatar */}
                {user && (
                  <div className="relative z-5">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <HiOutlineUserCircle className="w-8 h-8 text-gray-600" />
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border shadow-sm">
                        <Link
                          to="/app/account"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Account
                        </Link>
                        <Link
                          to="/app/settings"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  className="md:hidden p-2 hover:bg-gray-100 rounded"
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  <HiOutlineBars3 className="w-6 h-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu (NON-ADMIN ONLY) */}
      {!isAdmin && mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-2">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    className="w-full flex justify-between items-center text-sm font-medium"
                    onClick={() => setShopOpen(!shopOpen)}
                  >
                    {link.label}
                    <HiOutlineChevronDown className="w-4 h-4" />
                  </button>

                  {shopOpen &&
                    link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        className="block pl-4 py-1 text-sm text-gray-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                </div>
              ) : (
                <Link key={link.label} to={link.path} className="block text-sm">
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
