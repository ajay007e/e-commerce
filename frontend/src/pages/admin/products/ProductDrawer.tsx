import Drawer from "@/components/ui/Drawer/Drawer";

import { MultiStepForm, FormStep, FormField } from "@/components/ui/Form";

import { Input, TextArea, Select } from "@/components/ui/Input";

import DiscountEditor from "./DiscountEditor";
import AvailabilityEditor from "./AvailabilityEditor";
import VariantEditor from "./VariantEditor";
import CategoryTreeDropdown from "./CategoryTreeDropdown";
import BulletEditor from "./BulletEditor";
import ProductImages from "./ProductImages";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function ProductDrawer({ open, onClose, onSaved }: Props) {
  return (
    <Drawer open={open} onClose={onClose} title="Add Product" width="45%">
      <div className="flex h-full flex-col">
        <MultiStepForm
          initialValues={{
            /* Step 1 */
            name: "",
            shortDescription: "",
            categoryId: "",
            tags: "",

            /* Step 2 */
            originalPrice: "",
            salePrice: "",
            discount: {
              enabled: false,
              type: "PERCENT",
              value: "",
              startAt: "",
              endAt: "",
            },

            /* Step 3 */
            longDescription: "",
            details: [],
            sizeAndFit: [],
            materialAndCare: [],

            availability: {
              status: "AVAILABLE",
              reason: "",
            },

            variants: [],

            /* Step 4 */
            images: [],
            seoTitle: "",
            seoDescription: "",
          }}
          validation={{
            /* Step 1 */
            name: (v) => (!v ? "Product name required" : null),

            shortDescription: (v) => (!v ? "Short description required" : null),

            categoryId: (v) => (!v ? "Select category" : null),

            /* Step 2 */
            originalPrice: (v) => (!v ? "Price required" : null),

            availability: (v) => {
              if (!v?.status) return "Select status";

              if (
                (v.status === "OUT_OF_STOCK" || v.status === "PREORDER") &&
                !v.reason
              ) {
                return "Reason is required";
              }

              return null;
            },

            variants: (v) => {
              if (!v || v.length === 0) {
                return "Add at least one variant";
              }

              const invalid = v.some(
                (item: any) => !item.sku || !item.color || !item.size,
              );

              if (invalid) {
                return "All variant fields are required";
              }

              return null;
            },

            /* Step 3 */
            longDescription: (v) => (!v ? "Description required" : null),
          }}
          steps={[
            {
              title: "Basic",
              fields: ["name", "shortDescription", "categoryId"],
            },
            {
              title: "Pricing",
              fields: ["originalPrice"],
            },
            {
              title: "Content",
              fields: ["longDescription"],
            },
            {
              title: "Stock",
              fields: ["availability"],
            },
            {
              title: "Variants",
              fields: ["variants"], // 👈 NEW
            },
            {
              title: "Media & SEO",
              fields: ["images"],
            },
          ]}
          onSubmit={(data) => {
            /* Transform tags */
            const payload = {
              ...data,

              tags: data.tags
                .split(",")
                .map((t: string) => t.trim())
                .filter(Boolean),
              pricing: {
                originalPrice: Number(data.originalPrice),
                salePrice: Number(data.salePrice),

                discount: data.discount.enabled
                  ? {
                      type: data.discount.type,
                      value: Number(data.discount.value),
                      startAt: data.discount.startAt,
                      endAt: data.discount.endAt,
                    }
                  : null,
              },
              availability: {
                status: data.availability.status,
                reason: data.availability.reason || undefined,
              },
              variants: data.variants.map((v: any) => ({
                sku: v.sku,

                attributes: {
                  color: v.color,
                  size: v.size,
                },

                availability: {
                  status: v.availability.status,
                  reason: v.availability.reason || undefined,
                },
              })),

              media: {
                images: data.images.map((img: any) => ({
                  url: img.isExisting ? img.url : "UPLOAD_LATER", // backend replaces

                  alt: img.alt,
                  isPrimary: img.isPrimary,
                })),
              },
            };

            console.log("PHASE 1 PAYLOAD:", payload);

            // TODO: API

            onSaved();
            onClose();
          }}
        >
          {/* =====================================================
              STEP 1 — BASIC INFO
          ===================================================== */}
          <FormStep>
            <FormField name="name">
              <Input label="Product Name" placeholder="Premium Cotton Hoodie" />
            </FormField>

            <FormField name="shortDescription">
              <TextArea
                label="Short Description"
                placeholder="One-line summary..."
              />
            </FormField>

            {/* Category */}
            <FormField name="categoryId">
              <CategoryTreeDropdown />
            </FormField>

            {/* Tags */}
            <FormField name="tags">
              <Input
                label="Tags"
                placeholder="hoodie, winter, unisex"
                helperText="Comma separated"
              />
            </FormField>
          </FormStep>

          {/* =====================================================
              STEP 2 — PRICING
          ===================================================== */}
          <FormStep>
            <FormField name="originalPrice">
              <Input type="number" label="Original Price" />
            </FormField>

            <FormField name="salePrice">
              <Input type="number" label="Sale Price" />
            </FormField>

            <FormField name="discount">
              <DiscountEditor />
            </FormField>
          </FormStep>

          {/* =====================================================
              STEP 3 — CONTENT
          ===================================================== */}
          <FormStep>
            <FormField name="longDescription">
              <TextArea
                label="Long Description (Markdown)"
                placeholder="## Features..."
              />
            </FormField>

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

          {/* =====================================================
              STEP — STOCK / AVAILABILITY
          ===================================================== */}
          <FormStep>
            <FormField name="availability">
              <AvailabilityEditor />
            </FormField>
          </FormStep>

          {/* =====================================================
              STEP — VARIANTS
          ===================================================== */}
          <FormStep>
            <FormField name="variants">
              <VariantEditor />
            </FormField>
          </FormStep>
          {/* =====================================================
              STEP 4 — MEDIA + SEO
          ===================================================== */}
          <FormStep>
            <FormField name="images">
              <ProductImages />
            </FormField>

            <FormField name="seoTitle">
              <Input
                label="SEO Title"
                placeholder="Premium Hoodie | Winter Collection"
              />
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
