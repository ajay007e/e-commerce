import { Link } from "react-router-dom";
export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">
          Terms & Conditions
        </h1>
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
              These Terms and Conditions govern your use of our website and
              services. By accessing or using our platform, you agree to be
              bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              2. Eligibility
            </h2>
            <p className="mt-2">
              You must be at least 18 years old or have legal parental consent
              to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              3. Account Responsibilities
            </h2>
            <p className="mt-2">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              4. Use of Services
            </h2>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>You agree to use the platform for lawful purposes only</li>
              <li>You must not misuse or interfere with the service</li>
              <li>You must not attempt unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              5. Orders & Payments
            </h2>
            <p className="mt-2">
              All purchases are subject to availability and confirmation.
              Prices, payment methods, and billing details are provided at
              checkout.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              6. Returns & Refunds
            </h2>
            <p className="mt-2">
              Returns and refunds are handled according to our return policy,
              which may vary by product. Please review the relevant policy
              before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              7. Intellectual Property
            </h2>
            <p className="mt-2">
              All content on this website, including text, images, and
              trademarks, is owned by us or our licensors and may not be used
              without permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              8. Limitation of Liability
            </h2>
            <p className="mt-2">
              To the fullest extent permitted by law, we shall not be liable for
              any indirect, incidental, or consequential damages arising from
              your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              9. Termination
            </h2>
            <p className="mt-2">
              We reserve the right to suspend or terminate access to our
              services if these Terms are violated.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              10. Changes to These Terms
            </h2>
            <p className="mt-2">
              We may update these Terms from time to time. Continued use of the
              service after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              11. Contact Us
            </h2>
            <p className="mt-2">
              If you have questions about these Terms, please contact us through
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
