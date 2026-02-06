import { forwardRef, InputHTMLAttributes, useId } from "react";
import { cn } from "../utils/cn";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, disabled, ...props }, ref) => {
    const checkboxId = id ?? useId();

    return (
      <div className="flex flex-col">
        <label
          htmlFor={checkboxId}
          className={cn(
            "flex items-center gap-2 text-sm text-gray-700 cursor-pointer",

            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            className={cn(
              "h-4 w-4 rounded border-gray-300 text-blue-600",
              "focus:ring-2 focus:ring-blue-500",

              error && "border-red-500 focus:ring-red-500",

              className,
            )}
            {...props}
          />

          {label}
        </label>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
