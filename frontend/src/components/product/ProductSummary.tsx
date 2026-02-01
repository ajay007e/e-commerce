import { useState } from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";

interface Variant {
  id: string;
  label: string;
  value: string; // color hex or text
  disabled?: boolean;
}

interface SizeOption {
  id: string;
  label: string;
  disabled?: boolean;
}

interface Offer {
  id: string;
  text: string;
}

interface DeliveryInfo {
  id: string;
  text: string;
}

interface ProductSummaryProps {
  title: string;
  description?: string;

  rating?: {
    value: number;
    count: number;
  };

  price: number;
  originalPrice?: number;
  discountRate?: number;

  variants?: Variant[];
  sizes?: SizeOption[];

  isWishlisted?: boolean;

  deliveryInfo?: DeliveryInfo[];
  offers?: Offer[];

  onAddToCart: (payload: { variantId?: string; sizeId: string }) => void;

  onToggleWishlist: () => void;

  onOpenSizeChart?: () => void;
  onReviewLinkClick?: () => void;
}

export function ProductSummary({
  title,
  description,
  rating,
  price,
  originalPrice,
  discountRate,
  variants = [],
  sizes = [],
  isWishlisted = false,
  deliveryInfo = [],
  offers = [],
  onAddToCart,
  onToggleWishlist,
  onOpenSizeChart,
  onReviewLinkClick,
}: ProductSummaryProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >();

  const [selectedSizeId, setSelectedSizeId] = useState<string | undefined>();

  const isAddToCartDisabled = sizes.length > 0 && !selectedSizeId;

  return (
    <div className="space-y-6">
      {/* ================= Title ================= */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        )}
      </div>

      {/* ================= Rating ================= */}
      {rating && (
        <button
          type="button"
          onClick={onReviewLinkClick}
          className="flex items-center gap-2 text-sm text-gray-700"
        >
          <FaStar className="text-yellow-500" />
          <span className="font-medium">{rating.value.toFixed(1)}</span>
          <span className="text-gray-500">({rating.count} reviews)</span>
          <span className="underline text-gray-600">View reviews</span>
        </button>
      )}

      {/* ================= Price ================= */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-gray-900">
            ₹{price.toFixed(2)}
          </span>

          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{originalPrice.toFixed(2)}
            </span>
          )}

          {discountRate && (
            <span className="text-sm font-medium text-green-600">
              {discountRate}% off
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500">Inclusive of all taxes</p>
      </div>

      {/* ================= Variants ================= */}
      {variants.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Variants</p>

          <div className="flex gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                disabled={variant.disabled}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`h-8 w-8 rounded-full border ${
                  selectedVariantId === variant.id
                    ? "border-gray-900"
                    : "border-gray-300"
                } ${variant.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                style={{
                  backgroundColor: variant.value,
                }}
                aria-label={variant.label}
              />
            ))}
          </div>
        </div>
      )}

      {/* ================= Size Selector ================= */}
      {sizes.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Select Size</p>

            {onOpenSizeChart && (
              <button
                type="button"
                onClick={onOpenSizeChart}
                className="text-xs text-gray-600 underline"
              >
                Size chart
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.id}
                type="button"
                disabled={size.disabled}
                onClick={() => setSelectedSizeId(size.id)}
                className={`rounded-md border px-3 py-1 text-sm ${
                  selectedSizeId === size.id
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 text-gray-700"
                } ${size.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= CTAs ================= */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled={isAddToCartDisabled}
          onClick={() =>
            selectedSizeId &&
            onAddToCart({
              variantId: selectedVariantId,
              sizeId: selectedSizeId,
            })
          }
          className="flex-1 rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          Add to Cart
        </button>

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

      {/* ================= Delivery Info ================= */}
      {deliveryInfo.length > 0 && (
        <div className="space-y-2">
          {deliveryInfo.map((item) => (
            <p key={item.id} className="text-sm text-gray-600">
              {item.text}
            </p>
          ))}
        </div>
      )}

      {/* ================= Best Offers ================= */}
      {offers.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Best Offers</p>
          <ul className="space-y-1">
            {offers.map((offer) => (
              <li key={offer.id} className="text-sm text-gray-600">
                • {offer.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
