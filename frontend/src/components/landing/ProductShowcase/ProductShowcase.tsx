import CategoryCarousel from "./CategoryCarousel";
import CuratedCarousel from "./CuratedCarousel";
import ProductGrid from "./ProductGrid";

import { SHOWCASE_CONFIG } from "@/config/showcase.config";
import type {
  ShowcaseBlock,
  CategoryShowcaseBlock,
  CuratedShowcaseBlock,
  ProductShowcaseBlock,
} from "@/config/config.types";

export default function ProductShowcase() {
  return (
    <>
      {SHOWCASE_CONFIG.map((block: ShowcaseBlock) => {
        if (!block.enabled) return null;

        switch (block.type) {
          case "category":
            return (
              <CategoryCarousel
                key={block.id}
                block={block as CategoryShowcaseBlock}
              />
            );

          case "curated":
            return (
              <CuratedCarousel
                key={block.id}
                block={block as CuratedShowcaseBlock}
              />
            );

          case "product":
            return (
              <ProductGrid
                key={block.id}
                block={block as ProductShowcaseBlock}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
