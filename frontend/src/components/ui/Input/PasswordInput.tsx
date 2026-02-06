import { forwardRef, useState } from "react";
import { BaseInput } from "./BaseInput";
import type { BaseInputProps } from "./BaseInput";

export const PasswordInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <BaseInput
        ref={ref}
        {...props}
        type={visible ? "text" : "password"}
        rightIcon={
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {visible ? "🙈" : "👁️"}
          </button>
        }
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";
