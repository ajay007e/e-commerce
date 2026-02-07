/* ---------------------------------------------
   Types
--------------------------------------------- */

interface Props {
  page: number;
  totalPages: number;

  onPageChange: (page: number) => void;
}

/* ---------------------------------------------
   Helpers
--------------------------------------------- */

const getVisiblePages = (current: number, total: number, range = 2) => {
  const pages: number[] = [];

  const start = Math.max(1, current - range);
  const end = Math.min(total, current + range);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

/* ---------------------------------------------
   Component
--------------------------------------------- */

export default function ProductPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(page, totalPages);

  return (
    <div
      className="
        mt-5
        flex items-center justify-between
        gap-3
      "
    >
      {/* Info */}
      <p className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="
            rounded border px-3 py-1 text-sm
            disabled:opacity-50
            hover:bg-gray-50
          "
        >
          Prev
        </button>

        {/* First */}
        {page > 3 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="
                rounded border px-3 py-1 text-sm
                hover:bg-gray-50
              "
            >
              1
            </button>

            <span className="px-1">…</span>
          </>
        )}

        {/* Pages */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`
              rounded border px-3 py-1 text-sm
              hover:bg-gray-50

              ${p === page ? "bg-gray-900 text-white border-gray-900" : ""}
            `}
          >
            {p}
          </button>
        ))}

        {/* Last */}
        {page < totalPages - 2 && (
          <>
            <span className="px-1">…</span>

            <button
              onClick={() => onPageChange(totalPages)}
              className="
                rounded border px-3 py-1 text-sm
                hover:bg-gray-50
              "
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="
            rounded border px-3 py-1 text-sm
            disabled:opacity-50
            hover:bg-gray-50
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}
