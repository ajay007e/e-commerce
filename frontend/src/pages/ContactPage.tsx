import { CONTACT_US_CONFIG } from "@/config/contact-us.config";
import type { ContactInfoItem } from "@/config/config.types";
import FaqSection from "@/components/support/FaqSection";

export default function ContactPage() {
  const { enabled, title, subtitle, contactInfo, formEnabled } =
    CONTACT_US_CONFIG;

  if (!enabled) return null;

  const visibleInfo = contactInfo.filter(
    (item: ContactInfoItem) => item.enabled,
  );

  return (
    <main className="bg-white">
      {/* Page Header */}
      <section className="px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="mt-3 max-w-xl mx-auto text-sm text-gray-600">
            {subtitle}
          </p>
        )}
      </section>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left: Contact Info */}
          <div>
            <ul className="space-y-6">
              {visibleInfo.map((item) => (
                <li key={item.id}>
                  <p className="text-sm font-medium text-gray-800">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{item.value}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact Form */}
          {formEnabled && (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled
                className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Send message
              </button>

              {/* Privacy Note */}
              <p className="text-center text-xs text-gray-500">
                We’ll only use your information to respond to your message. See
                our{" "}
                <a href="/privacy" className="underline hover:text-gray-700">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </section>
      <FaqSection />
    </main>
  );
}
