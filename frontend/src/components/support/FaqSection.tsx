import { FAQ_CONFIG } from "@/config/faq.config";

export default function FaqSection() {
  const { enabled, title, subtitle, items } = FAQ_CONFIG;

  if (!enabled) return null;

  const visibleItems = items.filter((item) => item.enabled);

  if (visibleItems.length === 0) return null;

  return (
    <section className="my-8">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
        </div>

        {/* FAQ Items */}
        <ul className="space-y-6">
          {visibleItems.map((item) => (
            <li key={item.id} className="space-y-1">
              <p className="font-medium text-gray-800">{item.question}</p>
              <p className="text-sm text-gray-600">{item.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
