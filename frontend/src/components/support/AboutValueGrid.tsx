export function AboutValueGrid({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="space-y-1">
          <h3 className="font-medium text-neutral-900">{item.title}</h3>
          <p className="text-sm text-neutral-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
