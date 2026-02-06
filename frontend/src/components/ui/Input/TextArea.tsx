import { forwardRef, TextareaHTMLAttributes, useId } from "react";
import { cn } from "../utils/cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, fullWidth, className, id, ...props }, ref) => {
    const areaId = id ?? useId();

    return (
      <div className={cn("flex flex-col", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={areaId}
            className="mb-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={areaId}
          className={cn(
            "min-h-[80px] rounded-md border border-gray-300 px-3 py-2 text-sm",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
            "transition-all outline-none",

            error && "border-red-500 focus:border-red-500 focus:ring-red-500",

            className,
          )}
          {...props}
        />

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

TextArea.displayName = "TextArea";
