import { forwardRef } from "react";
import { BaseInput } from "./BaseInput";
import type { BaseInputProps } from "./BaseInput";

export const Input = forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    return <BaseInput ref={ref} {...props} />;
  },
);

Input.displayName = "Input";
