import type { Product } from "./types";

/* ---------------------------------------------
   Types
--------------------------------------------- */

interface Props {
  products: Product[];
  loading?: boolean;

  onRowClick: (product: Product) => void;
}

/* ---------------------------------------------
   Helpers
--------------------------------------------- */

const getPrimaryImage = (product: any) => {
  if (product.primaryImage) return product.primaryImage;

  if (product.images?.length) {
    return product.images[0]?.url || product.images[0];
  }

  return null;
};

/* ---------------------------------------------
   Component
--------------------------------------------- */

export default function ProductTable({
  products,
  loading = false,
  onRowClick,
}: Props) {
  /* ---------------------------------------------
     Loading
  --------------------------------------------- */

  if (loading) {
    return (
      <div className="rounded-md border bg-white p-4">
        <p className="text-sm text-gray-500">Loading products...</p>
      </div>
    );
  }

  /* ---------------------------------------------
     Empty
  --------------------------------------------- */

  if (!products.length) {
    return (
      <div className="rounded-md border bg-white p-4">
        <p className="text-sm text-gray-500">No products found.</p>
      </div>
    );
  }

  /* ---------------------------------------------
     Table
  --------------------------------------------- */

  return (
    <div className="overflow-x-auto rounded-md border bg-white">
      <table className="w-full border-collapse text-sm">
        {/* Header */}
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3 w-16">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {products.map((product) => {
            const image = getPrimaryImage(product);

            return (
              <tr
                key={product._id}
                onClick={() => onRowClick(product)}
                className="
                  border-t
                  cursor-pointer
                  hover:bg-gray-50
                  transition-colors
                "
              >
                {/* Image */}
                <td className="p-3">
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      className="
                        h-10 w-10
                        rounded
                        object-cover
                        border
                      "
                    />
                  ) : (
                    <div
                      className="
                        h-10 w-10
                        rounded
                        bg-gray-200
                        flex items-center justify-center
                        text-xs text-gray-500
                      "
                    >
                      N/A
                    </div>
                  )}
                </td>

                {/* Name */}
                <td className="p-3 font-medium text-gray-900">
                  {product.name}
                </td>

                {/* Category */}
                <td className="p-3 text-gray-600">
                  {product.category?.name || "-"}
                </td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`
                      inline-flex items-center rounded-full
                      px-2 py-0.5 text-xs font-medium
                      ${
                        product.availability?.status === "AVAILABLE"
                          ? "bg-green-100 text-green-700"
                          : product.availability?.status === "OUT_OF_STOCK"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {product.availability?.status || "N/A"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
