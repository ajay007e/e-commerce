import { CONTACT_US_CONFIG } from "@/config/contact-us.config";
import type { ContactInfoItem } from "@/config/config.types";

export default function ContactUs() {
  const { enabled, title, subtitle, contactInfo, formEnabled } =
    CONTACT_US_CONFIG;

  if (!enabled) return null;

  const visibleInfo = contactInfo.filter(
    (item: ContactInfoItem) => item.enabled,
  );

  return (
    <section className="px-4 py-8 bg-gray-100">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-3 text-sm text-gray-600">{subtitle}</p>}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left: Contact Info */}
          <div>
            <ul className="space-y-6">
              {visibleInfo.map((item) => (
                <li key={item.id}>
                  <p className="text-sm font-medium text-gray-700">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{item.value}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact Form */}
          {formEnabled && (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-900 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-900 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-900 focus:outline-none"
                  placeholder="How can we help you?"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
