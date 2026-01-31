import { Link } from "react-router-dom";
import { AboutSection } from "@/components/support/AboutSection";
import { AboutValueGrid } from "@/components/support/AboutValueGrid";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold text-neutral-900">About Us</h1>
        <p className="mt-2 text-neutral-600 max-w-xl mx-auto">
          We’re building a simpler, more transparent way to shop online.
        </p>
      </section>

      {/* Story */}
      <AboutSection title="Our Story">
        <p>
          We started with a simple idea: online shopping should feel
          trustworthy, clear, and human. No hidden costs, no confusing
          experiences—just quality products and honest service.
        </p>
        <p className="mt-3">Everything we build is guided by that belief.</p>
      </AboutSection>

      {/* Mission & Values */}
      <AboutSection title="Our Values">
        <AboutValueGrid
          items={[
            {
              title: "Customer First",
              description:
                "Every decision starts with what’s best for our customers.",
            },
            {
              title: "Transparency",
              description:
                "Clear pricing, clear policies, and clear communication.",
            },
            {
              title: "Quality",
              description:
                "We focus on products we’d confidently use ourselves.",
            },
            {
              title: "Security",
              description:
                "Your data and privacy are treated with the highest care.",
            },
          ]}
        />
      </AboutSection>

      {/* Trust */}
      <AboutSection title="Why People Trust Us">
        <ul className="list-disc pl-5 space-y-2 text-neutral-700">
          <li>Secure payments and encrypted data</li>
          <li>Clear return and support policies</li>
          <li>Responsive and human customer support</li>
          <li>No dark patterns or hidden conditions</li>
        </ul>
      </AboutSection>

      {/* Closing */}
      <section className="px-4 py-12 text-center text-sm text-neutral-600">
        If you have questions, feel free to reach out via our{" "}
        <Link to="/contact" className="underline hover:text-neutral-700">
          Contact page
        </Link>
        .
      </section>
    </main>
  );
}
