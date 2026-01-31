import { Link } from "react-router-dom";
import { MINIMAL_FOOTER_LINKS } from "@/config/footer.config";

export default function MinimalFooter() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} SimpleShop
        </p>

        <div className="flex gap-4">
          {MINIMAL_FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-sm text-gray-600 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
