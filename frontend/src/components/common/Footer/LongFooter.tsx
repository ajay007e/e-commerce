import { Link } from "react-router-dom";
import { LONG_FOOTER_SECTIONS } from "@/config/footer.config";

export default function LongFooter() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-semibold mb-2">SimpleShop</h2>
            <p className="text-sm text-gray-600">
              Quality products. Simple experience.
            </p>
          </div>

          {/* Dynamic Sections */}
          {LONG_FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SimpleShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
