import { forwardRef, InputHTMLAttributes, useId } from "react";
import { cn } from "../utils/cn";

interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, error, className, id, disabled, ...props }, ref) => {
    const switchId = id ?? useId();

    return (
      <div className="flex flex-col">
        <label
          htmlFor={switchId}
          className={cn(
            "flex items-center gap-3 cursor-pointer text-sm text-gray-700",

            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {/* Hidden Input */}
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />

          {/* Track */}
          <div
            className={cn(
              "relative h-6 w-11 rounded-full bg-gray-300 transition-colors",

              "peer-checked:bg-blue-600",
              "peer-focus:ring-2 peer-focus:ring-blue-500",

              error && "bg-red-500",
            )}
          >
            {/* Thumb */}
            <div
              className={cn(
                "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",

                "peer-checked:translate-x-5",
              )}
            />
          </div>

          {label && <span>{label}</span>}
        </label>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Switch.displayName = "Switch";
