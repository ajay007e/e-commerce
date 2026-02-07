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
  ({ label, error, id, disabled, ...props }, ref) => {
    const switchId = id ?? useId();

    return (
      <div className="flex flex-col">
        <label
          htmlFor={switchId}
          className={cn(
            "flex items-center gap-3 cursor-pointer text-sm text-gray-700 select-none",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {/* Hidden Checkbox */}
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />

          {/* Track (GROUP) */}
          <div
            className={cn(
              "relative h-6 w-11 rounded-full",
              "bg-gray-300 transition-colors duration-200",

              "peer-checked:bg-blue-600",
              "peer-focus:ring-2 peer-focus:ring-blue-500",

              error && "bg-red-500",

              // 👇 Make this a group
              "group",
            )}
          >
            {/* Thumb (uses GROUP) */}
            <div
              className={cn(
                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow",

                "transition-all duration-200 ease-in-out",

                // ✅ Move using group
                "group-peer-checked:left-[22px]",
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
