import { useEffect, useRef, useState } from "react";
import { FaStar, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";

/* ---------------------------------------------
   Types
--------------------------------------------- */

interface ImageItem {
  id: string;
  url: string;
  file?: File;

  alt: string;
  isPrimary: boolean;

  isExisting: boolean;
}

interface Props {
  value?: ImageItem[];
  onChange: (val: ImageItem[]) => void;
  error?: string;

  existing?: {
    url: string;
    alt?: string;
    isPrimary?: boolean;
  }[];
}

/* ---------------------------------------------
   Component
--------------------------------------------- */

export default function ProductImages({
  value,
  onChange,
  existing = [],
  error,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const images: ImageItem[] = Array.isArray(value) ? value : [];

  /* ---------------------------------------------
     Init Existing
  --------------------------------------------- */

  useEffect(() => {
    if (!existing.length || images.length) return;

    const mapped: ImageItem[] = existing.map((img, i) => ({
      id: crypto.randomUUID(),

      url: img.url,
      alt: img.alt ?? "",
      isPrimary: img.isPrimary ?? i === 0,

      isExisting: true,
    }));

    onChange(mapped);
  }, [existing]);

  /* ---------------------------------------------
     Helpers
  --------------------------------------------- */

  const sync = (items: ImageItem[]) => {
    // Ensure exactly one primary
    if (!items.some((i) => i.isPrimary) && items.length) {
      items[0].isPrimary = true;
    }

    onChange([...items]);
  };

  /* ---------------------------------------------
     Add Images
  --------------------------------------------- */

  const handleAdd = (files: FileList | null) => {
    if (!files) return;

    const newItems: ImageItem[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),

      url: URL.createObjectURL(file),
      file,

      alt: "",
      isPrimary: false,

      isExisting: false,
    }));

    const updated = [...images, ...newItems];

    // First image primary
    if (!updated.some((i) => i.isPrimary)) {
      updated[0].isPrimary = true;
    }

    sync(updated);
  };

  /* ---------------------------------------------
     Remove
  --------------------------------------------- */

  const remove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);

    sync(updated);
  };

  /* ---------------------------------------------
     Set Primary
  --------------------------------------------- */

  const setPrimary = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));

    sync(updated);
  };

  /* ---------------------------------------------
     Update Alt
  --------------------------------------------- */

  const updateAlt = (index: number, alt: string) => {
    const updated = [...images];

    updated[index] = {
      ...updated[index],
      alt,
    };

    sync(updated);
  };

  /* ---------------------------------------------
     Reorder
  --------------------------------------------- */

  const move = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;

    const updated = [...images];

    const [item] = updated.splice(from, 1);

    updated.splice(to, 0, item);

    sync(updated);
  };

  /* ---------------------------------------------
     Render
  --------------------------------------------- */

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        Product Images
      </label>

      {/* Upload */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
          w-full rounded-md border border-dashed
          border-gray-300 py-3 text-sm
          text-gray-500 hover:bg-gray-50
        "
      >
        + Add Images
      </button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={(e) => handleAdd(e.target.files)}
      />

      {/* Images */}
      {images.length > 0 && (
        <div className="space-y-3">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="
                flex gap-3 rounded-md
                border border-gray-200
                p-2 bg-gray-50
              "
            >
              {/* Preview */}
              <div className="relative h-20 w-20 flex-shrink-0">
                <img
                  src={img.url}
                  className="h-full w-full object-cover rounded"
                />

                {/* Primary Badge */}
                {img.isPrimary && (
                  <span
                    className="
                      absolute left-1 top-1
                      rounded bg-blue-600
                      px-1.5 py-0.5
                      text-[10px] text-white
                    "
                  >
                    Primary
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="flex-1 space-y-2">
                {/* Alt */}
                <input
                  value={img.alt}
                  onChange={(e) => updateAlt(i, e.target.value)}
                  placeholder="Alt text for SEO"
                  className="
                    w-full rounded-md border border-gray-300
                    px-3 py-1.5 text-sm
                    focus:outline-none
                    focus:ring-2 focus:ring-blue-500
                  "
                />

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* Primary */}
                  <button
                    type="button"
                    onClick={() => setPrimary(i)}
                    className="
                      flex items-center gap-1
                      text-xs text-yellow-600
                      hover:text-yellow-700
                    "
                  >
                    <FaStar />
                    Primary
                  </button>

                  {/* Move Left */}
                  <button
                    type="button"
                    onClick={() => move(i, i - 1)}
                    disabled={i === 0}
                    className="
                      text-xs text-gray-500
                      disabled:opacity-30
                    "
                  >
                    <FaArrowLeft />
                  </button>

                  {/* Move Right */}
                  <button
                    type="button"
                    onClick={() => move(i, i + 1)}
                    disabled={i === images.length - 1}
                    className="
                      text-xs text-gray-500
                      disabled:opacity-30
                    "
                  >
                    <FaArrowRight />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="
                      ml-auto text-xs text-red-500
                      hover:text-red-600
                    "
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
