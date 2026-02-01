import { useState } from "react";
import type { SearchProductItem } from "@/config/business.types";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { SellingInfoIcon } from "@/components/shop/Grid/SellingInfoIcon";

interface ProductCardProps {
  product: SearchProductItem;
  onToggleWishlist?: (productId: string) => void;
}

export function ProductCard({ product, onToggleWishlist }: ProductCardProps) {
  const {
    id,
    name,
    imageUrl,
    price,
    originalPrice,
    discountRate,
    rating,
    imageTags,
    isAvailable = true,
    sellingInfo,
  } = product;

  const [isWishlisted, setIsWishlisted] = useState<boolean>(
    product?.isWishlisted,
  );

  const handleWishListClick = (e) => {
    e.preventDefault(); // prevents link navigation
    e.stopPropagation(); // prevents bubbling
    onToggleWishlist?.(id);
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link
      to={`/p/${id}`}
      className="group block space-y-3 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-md"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="
            h-full w-full object-cover
            transition-transform duration-300
            group-hover:scale-105
            motion-reduce:transition-none
          "
        />

        {/* Top-left tags */}
        {imageTags && imageTags.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-col gap-1 z-10">
            {imageTags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded px-2 py-0.5 text-xs font-medium text-white ${
                  tag.variant === "secondary" ? "bg-gray-700" : "bg-blue-600"
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishListClick}
          className="absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow-sm z-10 cursor-pointer"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-700" />
          )}
        </button>

        {/* Bottom-left rating */}
        {rating && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs text-white z-10">
            <FaStar className="text-yellow-400" />
            <span>{rating.value.toFixed(1)}</span>
            {rating.count && (
              <span className="opacity-80">({rating.count})</span>
            )}
          </div>
        )}

        {/* Out of stock */}
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white z-5">
            Out of stock
          </div>
        )}
      </div>

      {/* Name */}
      <p className="line-clamp-2 text-sm text-gray-900">{name}</p>

      {/* Price */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-gray-900">
          ₹{price.toFixed(2)}
        </span>

        {originalPrice && (
          <span className="text-xs text-gray-500 line-through">
            ₹{originalPrice.toFixed(2)}
          </span>
        )}

        {discountRate && (
          <span className="text-xs font-medium text-green-600">
            {discountRate}% off
          </span>
        )}
      </div>

      {/* Selling Info */}
      {sellingInfo && (
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <SellingInfoIcon type={sellingInfo.icon} />
          <span>{sellingInfo.text}</span>
        </div>
      )}
    </Link>
  );
}
