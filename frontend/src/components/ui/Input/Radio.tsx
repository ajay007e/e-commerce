import { forwardRef, InputHTMLAttributes, useId } from "react";
import { cn } from "../utils/cn";

interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className, id, disabled, ...props }, ref) => {
    const radioId = id ?? useId();

    return (
      <div className="flex flex-col">
        <label
          htmlFor={radioId}
          className={cn(
            "flex items-center gap-2 text-sm text-gray-700 cursor-pointer",

            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          <input
            ref={ref}
            id={radioId}
            type="radio"
            disabled={disabled}
            className={cn(
              "h-4 w-4 border-gray-300 text-blue-600",
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

Radio.displayName = "Radio";
