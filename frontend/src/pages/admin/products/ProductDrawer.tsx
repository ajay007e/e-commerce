import { useCallback, useEffect, useState } from "react";

import Drawer from "@/components/ui/Drawer/Drawer";
import { MultiStepForm, FormStep, FormField } from "@/components/ui/Form";
import { Input, TextArea } from "@/components/ui/Input";

import { createProduct } from "@/api/products.api";
import { getAttributeValuesBySlug } from "@/api/attributes.api";

/* Editors */
import DiscountEditor from "./DiscountEditor";
import AvailabilityEditor from "./AvailabilityEditor";
import VariantEditor from "./VariantEditor";
import CategoryTreeDropdown from "./CategoryTreeDropdown";
import BulletEditor from "./BulletEditor";
import ProductImages from "./ProductImages";
import ProductPriceEditor from "./ProductPriceEditor";
import type { PricingValue } from "./ProductPriceEditor";

import type { Product } from "./types";

/* ---------------------------------------------
   Types
--------------------------------------------- */

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  product?: Product;
}

interface VariantForm {
  size: string;

  availability: {
    status: "AVAILABLE" | "OUT_OF_STOCK" | "PREORDER";
    reason?: string;
  };

  pricing?: PricingValue | null;
}

interface SizeAttribute {
  _id: string;
  value: string;
}

/* ---------------------------------------------
   Defaults
--------------------------------------------- */

const EMPTY_PRICING: PricingValue = {
  originalPrice: "",
  salePrice: "",

  discount: {
    enabled: false,
    type: "PERCENT",
    value: "",
    startAt: "",
    endAt: "",
  },
};

/* ---------------------------------------------
   Component
--------------------------------------------- */

export default function ProductDrawer({
  open,
  onClose,
  onSaved,
  product,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [sizes, setSizes] = useState<SizeAttribute[]>([]);
  const [variants, setVariants] = useState<VariantForm[]>([]);

  const isEditMode = Boolean(product);

  /* ---------------------------------------------
     Fetch Sizes (Create Mode)
  --------------------------------------------- */

  useEffect(() => {
    if (!open || isEditMode) return;

    const loadSizes = async () => {
      try {
        const res = await getAttributeValuesBySlug("sizes");

        setSizes(res || []);
      } catch (err) {
        console.error("Failed to load sizes", err);
      }
    };

    loadSizes();
  }, [open, isEditMode]);

  /* ---------------------------------------------
     Generate / Load Variants
  --------------------------------------------- */

  useEffect(() => {
    if (!open) return;

    /* Edit Mode */
    if (isEditMode && product?.variants) {
      const mapped: VariantForm[] = product.variants.map((v: any) => ({
        size: v.attributes?.size,

        availability: {
          status: v.availability?.status || "AVAILABLE",
          reason: v.availability?.reason,
        },

        pricing: v.pricing
          ? {
              originalPrice: String(v.pricing.originalPrice),
              salePrice: v.pricing.salePrice ? String(v.pricing.salePrice) : "",
              discount: v.pricing.discount || {
                enabled: false,
                type: "PERCENT",
                value: "",
              },
            }
          : null,
      }));

      setVariants(mapped);

      return;
    }

    /* Create Mode */
    if (!isEditMode && sizes.length) {
      const generated: VariantForm[] = sizes.map((s) => ({
        size: s.value,

        availability: {
          status: "AVAILABLE",
          reason: "",
        },

        pricing: null,
      }));

      setVariants(generated);
    }
  }, [open, sizes, isEditMode, product]);

  /* ---------------------------------------------
     Submit
  --------------------------------------------- */

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        setLoading(true);
        setApiError(null);

        /* Main Pricing */

        const mainPricing = data.pricing;

        /* Build Product Object */

        const productData = {
          name: data.name,

          shortDescription: data.shortDescription,

          categoryId: data.categoryId,

          availability: {
            status: data.availability.status,
            reason: data.availability.reason || undefined,
          },

          pricing: {
            originalPrice: Number(mainPricing.originalPrice),

            salePrice: mainPricing.salePrice
              ? Number(mainPricing.salePrice)
              : undefined,

            discount: mainPricing.discount.enabled
              ? {
                  type: mainPricing.discount.type,
                  value: Number(mainPricing.discount.value),
                  startAt: mainPricing.discount.startAt,
                  endAt: mainPricing.discount.endAt,
                }
              : null,
          },

          variants: variants.map((v) => ({
            attributes: {
              size: v.size,
            },

            availability: {
              status: v.availability.status,
              reason: v.availability.reason || undefined,
            },

            pricing: v.pricing
              ? {
                  originalPrice: Number(v.pricing.originalPrice),

                  salePrice: v.pricing.salePrice
                    ? Number(v.pricing.salePrice)
                    : undefined,

                  discount: v.pricing.discount.enabled
                    ? {
                        type: v.pricing.discount.type,
                        value: Number(v.pricing.discount.value),
                        startAt: v.pricing.discount.startAt,
                        endAt: v.pricing.discount.endAt,
                      }
                    : null,
                }
              : undefined,
          })),

          details: {
            bullets: data.details,
          },

          sizeAndFit: {
            bullets: data.sizeAndFit,
          },

          materialAndCare: {
            bullets: data.materialAndCare,
          },

          seo: {
            title: data.seoTitle,
            description: data.seoDescription,
          },
        };

        /* FormData */

        const formData = new FormData();

        formData.append("data", JSON.stringify(productData));

        data.images.forEach((img: any) => {
          if (!img.isExisting && img.file) {
            formData.append("images", img.file);
          }
        });

        if (isEditMode && product?._id) {
          formData.append("id", product._id);
        }

        await createProduct(formData);

        onSaved();
        onClose();
      } catch (err: any) {
        console.error("Save product error:", err);

        setApiError(err?.response?.data?.message || "Failed to save product");
      } finally {
        setLoading(false);
      }
    },
    [variants, isEditMode, product, onClose, onSaved],
  );

  /* ---------------------------------------------
     UI
  --------------------------------------------- */

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={isEditMode ? "Edit Product" : "Add Product"}
      width="45%"
    >
      <div className="flex h-full flex-col">
        {/* API Error */}
        {apiError && (
          <div className="mb-2 rounded-md bg-red-50 p-2 text-sm text-red-600">
            {apiError}
          </div>
        )}

        <MultiStepForm
          initialValues={{
            name: product?.name || "",
            shortDescription: product?.shortDescription || "",
            categoryId: product?.categoryId || "",

            availability: product?.availability || {
              status: "AVAILABLE",
              reason: "",
            },

            /* Main Pricing */
            pricing: product?.pricing
              ? {
                  originalPrice: String(product.pricing.originalPrice),

                  salePrice: product.pricing.salePrice
                    ? String(product.pricing.salePrice)
                    : "",

                  discount: product.pricing.discount || EMPTY_PRICING.discount,
                }
              : EMPTY_PRICING,

            details: product?.details?.bullets || [],
            sizeAndFit: product?.sizeAndFit?.bullets || [],
            materialAndCare: product?.materialAndCare?.bullets || [],

            images: product?.images || [],

            seoTitle: product?.seo?.title || "",
            seoDescription: product?.seo?.description || "",
          }}
          validation={{
            name: (v: string) => (!v ? "Product name required" : null),

            shortDescription: (v: string) =>
              !v ? "Short description required" : null,

            categoryId: (v: string) => (!v ? "Select category" : null),

            availability: (v: any) => {
              if (!v?.status) return "Select status";

              if (
                (v.status === "OUT_OF_STOCK" || v.status === "PREORDER") &&
                !v.reason
              ) {
                return "Reason is required";
              }

              return null;
            },

            pricing: (v: PricingValue) =>
              !v?.originalPrice ? "Price required" : null,

            details: (v: any[]) =>
              !v?.length ? "Product details required" : null,

            sizeAndFit: (v: any[]) =>
              !v?.length ? "Size & fit required" : null,

            materialAndCare: (v: any[]) =>
              !v?.length ? "Material & care required" : null,

            variants: () =>
              !variants.length ? "Variants not generated" : null,
          }}
          steps={[
            {
              title: "Basic",
              fields: [
                "name",
                "shortDescription",
                "categoryId",
                "availability",
              ],
            },
            {
              title: "Pricing",
              fields: ["pricing"],
            },
            {
              title: "Content",
              fields: ["details", "sizeAndFit", "materialAndCare"],
            },
            {
              title: "Variants",
              fields: ["variants"],
            },
            {
              title: "Media & SEO",
              fields: ["images"],
            },
          ]}
          onSubmit={handleSubmit}
          disabled={loading}
        >
          {/* ================= STEP 1 — BASIC ================= */}
          <FormStep>
            <FormField name="name">
              <Input label="Product Name" />
            </FormField>

            <FormField name="shortDescription">
              <TextArea label="Short Description" />
            </FormField>

            <FormField name="categoryId">
              <CategoryTreeDropdown />
            </FormField>

            <FormField name="availability">
              <AvailabilityEditor />
            </FormField>
          </FormStep>

          {/* ================= STEP 2 — PRICING ================= */}
          <FormStep>
            <FormField name="pricing">
              <ProductPriceEditor />
            </FormField>
          </FormStep>

          {/* ================= STEP 3 — CONTENT ================= */}
          <FormStep>
            <FormField name="details">
              <BulletEditor label="Product Details" />
            </FormField>

            <FormField name="sizeAndFit">
              <BulletEditor label="Size & Fit" />
            </FormField>

            <FormField name="materialAndCare">
              <BulletEditor label="Material & Care" />
            </FormField>
          </FormStep>

          {/* ================= STEP — VARIANTS ================= */}
          <FormStep>
            <VariantEditor value={variants} onChange={setVariants} />
          </FormStep>

          {/* ================= STEP — MEDIA & SEO ================= */}
          <FormStep>
            <FormField name="images">
              <ProductImages />
            </FormField>

            <FormField name="seoTitle">
              <Input label="SEO Title" />
            </FormField>

            <FormField name="seoDescription">
              <TextArea label="SEO Description" />
            </FormField>
          </FormStep>
        </MultiStepForm>
      </div>
    </Drawer>
  );
}
