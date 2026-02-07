import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/auth.context";

import ProtectedRoute from "@/routes/protected.routes";
import PublicRoute from "@/routes/public.routes";
import AdminRoute from "@/routes/admin.routes";

// Pages
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import ForgetPasswordPage from "@/pages/ForgetPasswordPage";
import Cart from "@/pages/Cart";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import RefundAndReturnPolicyPage from "@/pages/RefundAndReturnPolicyPage";
import ShippingPolicyPage from "@/pages/ShippingPolicyPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "@/pages/TermsAndConditionsPage";

// Admin pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProducts from "@/pages/admin/Products";
import AdminCategories from "@/pages/admin/Categories";
import AdminAttributes from "@/pages/admin/Attributes";
import AdminOrders from "@/pages/admin/Orders";
import AdminUsers from "@/pages/admin/Users";
import AdminSettings from "@/pages/admin/Settings";

// Layouts
import GuestLayout from "@/layouts/guest.layout";
import AppLayout from "@/layouts/app.layout";
import AdminLayout from "@/layouts/admin.layout";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Guest area */}
          <Route element={<GuestLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsAndConditionsPage />} />
            <Route path="/shipping" element={<ShippingPolicyPage />} />
            <Route path="/refund" element={<RefundAndReturnPolicyPage />} />
            <Route path="/p/:productId" element={<ProductPage />} />
            <Route path="/s" element={<ShopPage />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/reset-password"
              element={
                <PublicRoute>
                  <ForgetPasswordPage />
                </PublicRoute>
              }
            />
          </Route>

          {/* User app */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Admin app */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="attributes" element={<AdminAttributes />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
