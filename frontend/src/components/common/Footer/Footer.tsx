import LongFooter from "./LongFooter";
import MinimalFooter from "./MinimalFooter";
import { FOOTER_VARIANT } from "@/config/footer.config";

export default function Footer() {
  if (FOOTER_VARIANT === "minimal") {
    return <MinimalFooter />;
  }

  return <LongFooter />;
}
