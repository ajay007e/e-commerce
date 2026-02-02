import { Link, useLocation } from "react-router-dom";
import { BREADCRUMB_LABELS } from "@/config/constants";

export default function AdminBreadcrumb() {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean); // removes empty strings

  const crumbs = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    const label = BREADCRUMB_LABELS[segment] ?? segment;

    return { label, path };
  });

  return (
    <nav className="mb-4 text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-gray-500">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.path} className="flex items-center gap-1">
              {isLast ? (
                <span className="font-medium text-gray-900">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="hover:text-gray-900">
                  {crumb.label}
                </Link>
              )}

              {!isLast && <span>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
