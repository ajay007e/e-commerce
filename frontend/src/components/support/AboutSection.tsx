export function AboutSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
      <div className="text-neutral-700 leading-relaxed">{children}</div>
    </section>
  );
}
