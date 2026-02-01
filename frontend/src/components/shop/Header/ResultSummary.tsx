export function ResultSummary({ total }: { total: number }) {
  return (
    <p className="text-sm text-gray-600">
      Showing <span className="font-medium text-gray-900">{total}</span> results
    </p>
  );
}
