interface ResultsOffsetProps {
  currentPage: number;
  pageSize: number;
  totalResults: number;
}

export function ResultsOffset({
  currentPage,
  pageSize,
  totalResults,
}: ResultsOffsetProps) {
  if (totalResults === 0) return null;

  const start = (currentPage - 1) * pageSize + 1;

  const end = Math.min(currentPage * pageSize, totalResults);

  return (
    <p className="text-sm text-gray-600">
      Showing{" "}
      <span className="font-medium text-gray-900">
        {start}–{end}
      </span>{" "}
      of <span className="font-medium text-gray-900">{totalResults}</span>{" "}
      results
    </p>
  );
}
