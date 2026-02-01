import { ResultsOffset } from "./ResultsOffset";
import { PageSizeSelect } from "./PageSizeSelect";
import { PaginationControls } from "./Controls";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalResults: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function Pagination({
  currentPage,
  pageSize,
  totalResults,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalResults / pageSize);

  if (totalResults === 0) return null;

  return (
    <div className="mt-8 space-y-4">
      {/* Offset + Page Size */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ResultsOffset
          currentPage={currentPage}
          pageSize={pageSize}
          totalResults={totalResults}
        />

        <PageSizeSelect
          value={pageSize}
          options={pageSizeOptions}
          onChange={onPageSizeChange}
        />
      </div>

      {/* Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
