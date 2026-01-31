import { Link } from "react-router-dom";

import type { CardProps } from "./types";
import { FiHeart } from "react-icons/fi";

export default function Card(props: CardProps) {
  /* ---------- TYPE 1 : Category ---------- */
  if (props.variant === "category") {
    return (
      <Link to={props.link} className="flex flex-col items-center text-center">
        <div className="h-36 w-36 lg:h-40 lg:w-40 overflow-hidden rounded-full bg-gray-100">
          <img
            src={props.imageUrl}
            alt={props.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <span className="mt-2 text-sm font-medium">{props.name}</span>
      </Link>
    );
  }

  /* ---------- TYPE 2 : Curated ---------- */

  if (props.variant === "curated") {
    return (
      <Link
        to={props.link}
        className="group relative block overflow-hidden rounded-lg bg-gray-100"
      >
        {/* Image */}
        <div className="aspect-[4/3]">
          <img
            src={props.imageUrl}
            alt={props.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Black overlay */}
        <div
          className="
          absolute inset-0
          bg-black/30
          transition-colors duration-300
          group-hover:bg-black/55
        "
        />

        {/* Text container */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
          {/* Title (always visible) */}
          <h3 className="text-sm font-semibold">{props.title}</h3>

          {/* Description (reveal on hover) */}
          {props.description && (
            <p
              className="
              mt-1 text-sm opacity-0
              transition-all duration-300
              translate-y-2
              group-hover:translate-y-0
              group-hover:opacity-100
              hidden md:block
            "
            >
              {props.description}
            </p>
          )}
        </div>
      </Link>
    );
  }
  if (props.variant === "v1") {
    return (
      <Link
        to={props.link}
        className="
        flex items-center gap-4 rounded-lg bg-white p-3
        transition-all duration-300
        hover:bg-gray-50 hover:shadow-sm
      "
      >
        {/* Image */}
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
          <img
            src={props.imageUrl}
            alt={props.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-gray-900">
            {props.title}
          </h3>

          {props.description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
              {props.description}
            </p>
          )}
        </div>
      </Link>
    );
  }
  if (props.variant === "v2") {
    return (
      <Link
        to={props.link}
        className="
        relative block overflow-hidden rounded-xl
        bg-gray-900 text-white
        transition-transform duration-300
        hover:-translate-y-1 hover:shadow-lg
      "
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={props.imageUrl}
            alt={props.title}
            className="h-full w-full object-cover opacity-40"
            loading="lazy"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 p-6">
          <h3 className="text-base font-semibold">{props.title}</h3>

          {props.description && (
            <p className="mt-2 max-w-sm text-sm text-white/90">
              {props.description}
            </p>
          )}
        </div>
      </Link>
    );
  }

  if (props.variant === "v3") {
    return (
      <Link
        to={props.link}
        className="
        block overflow-hidden rounded-lg bg-white
        transition-shadow duration-300
        hover:shadow-md
      "
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={props.imageUrl}
            alt={props.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900">{props.title}</h3>

          {props.description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
              {props.description}
            </p>
          )}
        </div>
      </Link>
    );
  }

  /* ---------- TYPE 3 : Product ---------- */

  if (props.variant === "product") {
    return (
      <div
        className="
    group relative h-full rounded-xl bg-white
    border border-gray-200
    transition-all duration-300
    hover:-translate-y-1 hover:shadow-md
  "
      >
        {/* Wishlist */}
        <button
          onClick={props.onWishlistClick}
          className="
      absolute right-3 top-3 z-10
      rounded-full bg-white/90 p-1.5
      text-gray-500 shadow-sm
      transition hover:text-red-500 hover:scale-110
    "
          aria-label="Add to favorites"
        >
          <FiHeart size={16} />
        </button>

        {/* Image */}
        <Link to={props.link}>
          <div className="aspect-square overflow-hidden rounded-t-xl bg-gray-100">
            <img
              src={props.imageUrl}
              alt={props.name}
              className="
          h-full w-full object-cover
          transition-transform duration-300
          group-hover:scale-105
        "
              loading="lazy"
            />
          </div>
        </Link>

        {/* Content */}
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
            {props.name}
          </h3>

          {/* Price row */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              ₹{props.price}
            </span>

            {props.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{props.originalPrice}
              </span>
            )}

            {props.discountLabel && (
              <span
                className="
            rounded bg-green-50 px-1.5 py-0.5
            text-xs font-medium text-green-600
          "
              >
                {props.discountLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (props.type === "testimonial") {
    const { name, quote, avatarUrl } = props;
    return (
      <div className="flex flex-col items-center rounded-lg bg-white px-6 py-8 text-center shadow-sm">
        {/* Avatar */}
        <div className="mb-4 h-16 w-16 overflow-hidden rounded-full bg-gray-200">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-medium text-gray-600">
              {name.charAt(0)}
            </div>
          )}
        </div>

        {/* Quote */}
        <p className="mb-4 text-sm text-gray-700">“{quote}”</p>

        {/* Name */}
        <span className="text-sm font-medium text-gray-900">{name}</span>
      </div>
    );
  }
  return null;
}
