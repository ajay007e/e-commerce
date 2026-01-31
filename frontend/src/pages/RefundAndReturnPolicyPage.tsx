import { Link } from "react-router-dom";
export default function RefundAndReturnPolicyPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">
          Refund & Return Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: January 2026</p>
      </section>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-gray-700">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">1. Overview</h2>
            <p className="mt-2">
              We want you to be completely satisfied with your purchase. This
              Refund and Return Policy explains how returns, exchanges, and
              refunds are handled.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              2. Eligibility for Returns
            </h2>
            <p className="mt-2">
              Items may be eligible for return within a specified period after
              delivery, provided they are unused, in original condition, and in
              original packaging.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              3. Non-Returnable Items
            </h2>
            <p className="mt-2">
              Certain items may not be eligible for return due to hygiene,
              customization, or regulatory reasons. Such exclusions will be
              clearly communicated at the time of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              4. Return Process
            </h2>
            <p className="mt-2">
              To initiate a return, please contact our support team with your
              order details. We will provide instructions on how to proceed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">5. Refunds</h2>
            <p className="mt-2">
              Once your return is received and inspected, we will notify you of
              the approval or rejection of your refund. Approved refunds will be
              processed to the original payment method within a reasonable
              timeframe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              6. Exchanges
            </h2>
            <p className="mt-2">
              Exchanges may be offered depending on product availability. If an
              exchange is not possible, a refund may be issued instead.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              7. Shipping Costs
            </h2>
            <p className="mt-2">
              Shipping costs for returns may be the responsibility of the
              customer unless the return is due to a defective or incorrect
              item.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              8. Contact Us
            </h2>
            <p className="mt-2">
              If you have questions about returns or refunds, please contact us
              through our{" "}
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
