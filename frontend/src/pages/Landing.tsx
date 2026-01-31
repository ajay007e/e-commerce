import {
  HeroSection,
  ProductShowcase,
  WhyChooseUs,
  Testimonials,
  ContactSection,
} from "@/components/landing";

export default function Landing() {
  return (
    <div className=" bg-gray-50">
      <HeroSection />
      <ProductShowcase />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
    </div>
  );
}
