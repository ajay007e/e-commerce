import { Outlet } from "react-router-dom";

import TopBanner from "@/components/common/TopBanner";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function GuestLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top banner (configurable) */}
      <TopBanner />

      {/* Guest navbar */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
