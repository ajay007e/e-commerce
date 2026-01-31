import { Outlet } from "react-router-dom";
import TopBanner from "@/components/common/TopBanner";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top banner (configurable) */}
      <TopBanner />

      {/* App navbar (auth-aware later) */}
      <Navbar />

      {/* App pages */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
