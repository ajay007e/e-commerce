import { Link } from "react-router-dom";
import {
  FaImage,
  FaThLarge,
  FaBars,
  FaQuoteRight,
  FaPhoneAlt,
  FaQuestionCircle,
  FaHandsHelping,
  FaColumns,
} from "react-icons/fa";

export default function HomepageSettings() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Homepage Settings</h2>
        <p className="text-gray-600 mt-1">
          Manage all sections and content displayed on the homepage.
        </p>
      </div>

      <div className="space-y-8">
        {/* Primary Content */}
        <SectionGroup title="Primary Content">
          <SettingCard
            icon={<FaImage />}
            title="Hero Section"
            description="Main banner slider and call-to-action content."
            to="/admin/settings/homepage/hero"
          />

          <SettingCard
            icon={<FaThLarge />}
            title="Showcase Sections"
            description="Categories, curated blocks, and featured products."
            to="/admin/settings/homepage/showcase"
          />
        </SectionGroup>

        {/* Navigation & Layout */}
        <SectionGroup title="Navigation & Layout">
          <SettingCard
            icon={<FaBars />}
            title="Navigation"
            description="Homepage navigation links and structure."
            to="/admin/settings/homepage/navigation"
          />

          <SettingCard
            icon={<FaColumns />}
            title="Footer"
            description="Footer links, content, and branding."
            to="/admin/settings/homepage/footer"
          />
        </SectionGroup>

        {/* Trust & Conversion */}
        <SectionGroup title="Trust & Conversion">
          <SettingCard
            icon={<FaQuoteRight />}
            title="Testimonials"
            description="Customer testimonials and reviews."
            to="/admin/settings/homepage/testimonials"
          />

          <SettingCard
            icon={<FaHandsHelping />}
            title="Why Choose Us"
            description="Highlight store strengths and benefits."
            to="/admin/settings/homepage/why-choose-us"
          />
        </SectionGroup>

        {/* Support Content */}
        <SectionGroup title="Support Content">
          <SettingCard
            icon={<FaPhoneAlt />}
            title="Contact Us"
            description="Contact information and inquiry details."
            to="/admin/settings/homepage/contact"
          />

          <SettingCard
            icon={<FaQuestionCircle />}
            title="FAQ"
            description="Frequently asked questions shown on homepage."
            to="/admin/settings/homepage/faq"
          />
        </SectionGroup>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function SectionGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}

function SettingCard({
  icon,
  title,
  description,
  to,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="bg-white border rounded-lg p-6 hover:shadow-md transition block"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl text-gray-700">{icon}</span>
        <h4 className="text-lg font-medium">{title}</h4>
      </div>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <span className="text-sm font-medium text-blue-600">Manage →</span>
    </Link>
  );
}
