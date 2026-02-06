import { forwardRef, SelectHTMLAttributes, useId } from "react";
import { cn } from "../utils/cn";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth,
      options,
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const selectId = id ?? useId();

    return (
      <div className={cn("flex flex-col", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        {/* Select */}
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={cn(
            "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
            "transition-all outline-none",

            "disabled:opacity-50 disabled:cursor-not-allowed",

            error && "border-red-500 focus:border-red-500 focus:ring-red-500",

            className,
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Helper / Error */}
        {(error || helperText) && (
          <p
            className={cn(
              "mt-1 text-xs",
              error ? "text-red-500" : "text-gray-500",
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
