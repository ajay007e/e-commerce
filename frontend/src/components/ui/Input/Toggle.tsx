import { forwardRef, InputHTMLAttributes, useId } from "react";
import { cn } from "../utils/cn";

interface ToggleProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
  onText?: string;
  offText?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      error,
      onText = "On",
      offText = "Off",
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const toggleId = id ?? useId();

    return (
      <div className="flex flex-col">
        {label && (
          <label className="mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <label
          htmlFor={toggleId}
          className={cn(
            "relative inline-flex w-fit cursor-pointer items-center rounded-md border border-gray-300 bg-gray-100",

            "focus-within:ring-2 focus-within:ring-blue-500",

            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {/* Hidden Input */}
          <input
            ref={ref}
            id={toggleId}
            type="checkbox"
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />

          {/* OFF */}
          <span
            className={cn(
              "px-3 py-1.5 text-sm transition-colors",

              "peer-checked:text-gray-400",
              !props.checked && "text-blue-600 font-medium",
            )}
          >
            {offText}
          </span>

          {/* ON */}
          <span
            className={cn(
              "px-3 py-1.5 text-sm transition-colors",

              "peer-checked:text-blue-600 peer-checked:font-medium",
              !props.checked && "text-gray-400",
            )}
          >
            {onText}
          </span>
        </label>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";
