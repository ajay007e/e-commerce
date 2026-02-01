import { useState } from "react";

/* ===================== TYPES ===================== */

interface DetailsSectionContent {
  paragraphs?: string[];
  bullets?: string[];
  table?: {
    label: string;
    value: string;
  }[];
}

interface ProductDetailsSectionProps {
  details?: DetailsSectionContent;
  sizeAndFit?: DetailsSectionContent;
  materialAndCare?: DetailsSectionContent;
  specifications?: DetailsSectionContent;
}

/* ===================== CONFIG ===================== */

const SECTIONS = [
  { key: "details", label: "Details" },
  { key: "sizeAndFit", label: "Size & Fit" },
  { key: "materialAndCare", label: "Material & Care" },
  { key: "specifications", label: "Specifications" },
] as const;

/* ===================== COMPONENT ===================== */

export function ProductDetailsSection({
  details,
  sizeAndFit,
  materialAndCare,
  specifications,
}: ProductDetailsSectionProps) {
  const [activeTab, setActiveTab] =
    useState<(typeof SECTIONS)[number]["key"]>("details");

  const contentMap: Record<string, DetailsSectionContent | undefined> = {
    details,
    sizeAndFit,
    materialAndCare,
    specifications,
  };

  const visibleSections = SECTIONS.filter((section) => contentMap[section.key]);

  if (visibleSections.length === 0) return null;

  return (
    <>
      {/* ================= DESKTOP TABS ================= */}
      <div className="hidden md:block">
        <div role="tablist" className="flex gap-6 border-b">
          {visibleSections.map((section) => (
            <button
              key={section.key}
              role="tab"
              aria-selected={activeTab === section.key}
              onClick={() => setActiveTab(section.key)}
              className={`pb-3 text-sm font-medium ${
                activeTab === section.key
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="pt-6">
          <SectionContent content={contentMap[activeTab]} />
        </div>
      </div>

      {/* ================= MOBILE ACCORDION ================= */}
      <div className="md:hidden divide-y">
        {visibleSections.map((section) => (
          <AccordionItem key={section.key} title={section.label}>
            <SectionContent content={contentMap[section.key]} />
          </AccordionItem>
        ))}
      </div>
    </>
  );
}

/* ===================== SUB COMPONENTS ===================== */

function SectionContent({ content }: { content?: DetailsSectionContent }) {
  if (!content) return null;

  return (
    <div className="space-y-4 text-sm text-gray-700">
      {content.paragraphs?.map((text, i) => (
        <p key={i}>{text}</p>
      ))}

      {content.bullets && (
        <ul className="list-disc pl-5 space-y-1">
          {content.bullets.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {content.table && (
        <div className="space-y-2">
          {content.table.map((row) => (
            <div
              key={row.label}
              className="flex justify-between border-b pb-1 text-sm"
            >
              <span className="text-gray-500">{row.label}</span>
              <span className="font-medium text-gray-900">{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-900"
      >
        {title}
        <span className="text-gray-500">{open ? "−" : "+"}</span>
      </button>

      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}
