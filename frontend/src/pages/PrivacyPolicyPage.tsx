import { Link } from "react-router-dom";
export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: January 2026</p>
      </section>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-gray-700">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              1. Introduction
            </h2>
            <p className="mt-2">
              We value your privacy and are committed to protecting your
              personal information. This Privacy Policy explains how we collect,
              use, and safeguard your data when you use our website and
              services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              2. Information We Collect
            </h2>
            <p className="mt-2">
              We may collect personal information such as your name, email
              address, and any details you provide when creating an account or
              contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              3. How We Use Your Information
            </h2>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>To provide and maintain our services</li>
              <li>To communicate with you and respond to inquiries</li>
              <li>To improve our products and user experience</li>
              <li>To ensure security and prevent misuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">4. Cookies</h2>
            <p className="mt-2">
              We may use cookies or similar technologies to enhance your
              browsing experience. You can control cookie preferences through
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              5. Data Sharing
            </h2>
            <p className="mt-2">
              We do not sell or rent your personal information. We may share
              data only when required to operate our services or comply with
              legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              6. Data Security
            </h2>
            <p className="mt-2">
              We implement appropriate technical and organizational measures to
              protect your information against unauthorized access, alteration,
              or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              7. Your Rights
            </h2>
            <p className="mt-2">
              Depending on your location, you may have rights to access,
              correct, or delete your personal data. You may contact us at any
              time regarding these requests.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              8. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              9. Contact Us
            </h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy or how we handle
              your data, please contact us via our{" "}
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
