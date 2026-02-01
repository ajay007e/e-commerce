import { FaHeart, FaRegHeart } from "react-icons/fa";

interface MobileStickyCTAProps {
  isAddToCartDisabled?: boolean;
  isWishlisted?: boolean;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}

export function MobileStickyCTA({
  isAddToCartDisabled = false,
  isWishlisted = false,
  onAddToCart,
  onToggleWishlist,
}: MobileStickyCTAProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-white px-4 py-3 md:hidden">
      {/* iOS safe-area support */}
      <div className="pb-safe">
        <div className="flex items-center gap-3">
          {/* Add to Cart */}
          <button
            type="button"
            disabled={isAddToCartDisabled}
            onClick={onAddToCart}
            className="flex-1 rounded-md bg-gray-900 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            Add to Cart
          </button>

          {/* Wishlist */}
          <button
            type="button"
            aria-pressed={isWishlisted}
            onClick={onToggleWishlist}
            className="rounded-md border p-3"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
