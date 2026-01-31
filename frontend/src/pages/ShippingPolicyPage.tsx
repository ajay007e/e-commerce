import { Link } from "react-router-dom";
export default function ShippingPolicyPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">
          Shipping Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: January 2026</p>
      </section>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-gray-700">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              1. Shipping Overview
            </h2>
            <p className="mt-2">
              This Shipping Policy outlines how orders are processed, shipped,
              and delivered.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              2. Processing Time
            </h2>
            <p className="mt-2">
              Orders are typically processed within 1–3 business days, excluding
              weekends and holidays.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              3. Shipping Methods & Rates
            </h2>
            <p className="mt-2">
              Available shipping methods and rates will be displayed at
              checkout. Shipping costs may vary based on location and order
              size.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              4. Delivery Time
            </h2>
            <p className="mt-2">
              Estimated delivery times depend on your location and selected
              shipping method. Delivery dates are estimates and not guaranteed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              5. International Shipping
            </h2>
            <p className="mt-2">
              International shipping may be available for certain regions.
              Customers are responsible for any customs duties or taxes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              6. Order Tracking
            </h2>
            <p className="mt-2">
              Once your order has shipped, tracking information will be provided
              where available.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              7. Delays & Issues
            </h2>
            <p className="mt-2">
              We are not responsible for delays caused by carriers, weather, or
              other circumstances beyond our control. If your order is
              significantly delayed, please contact support.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              8. Contact Us
            </h2>
            <p className="mt-2">
              If you have questions about shipping, please contact us through
              our{" "}
              <Link to="/contact" className="underline hover:text-neutral-700">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
