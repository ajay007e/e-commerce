import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useState,
} from "react";
import { cn } from "../utils/cn";

export type LabelVariant = "top" | "floating" | "inline";
export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "outlined" | "filled";

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelVariant?: LabelVariant;

  error?: string;
  helperText?: string;

  size?: InputSize;
  variant?: InputVariant;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  clearable?: boolean;
  fullWidth?: boolean;
}

const sizes: Record<InputSize, string> = {
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const variants: Record<InputVariant, string> = {
  default:
    "border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500",
  outlined:
    "border-2 border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500",
  filled:
    "border border-transparent bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-blue-500",
};

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      label,
      labelVariant = "top",

      error,
      helperText,

      size = "md",
      variant = "default",

      leftIcon,
      rightIcon,

      clearable,
      fullWidth,

      className,

      value,
      defaultValue,
      onChange,

      disabled,

      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? useId();

    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const hasValue = String(currentValue).length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const clearValue = () => {
      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;

      if (!isControlled) {
        setInternalValue("");
      }

      onChange?.(event);
    };

    /* ---------------- Styles ---------------- */

    const baseInputClass = cn(
      "w-full rounded-md outline-none transition-all duration-150",
      "focus:ring-2 focus:ring-offset-0",
      "disabled:opacity-50 disabled:cursor-not-allowed",

      sizes[size],
      variants[variant],

      error && "border-red-500 focus:border-red-500 focus:ring-red-500",

      leftIcon && "pl-9",
      (rightIcon || clearable) && "pr-9",

      labelVariant === "floating" && "pt-4 pb-1",

      className,
    );

    /* ---------------- Label ---------------- */

    const renderLabel = () => {
      if (!label) return null;

      if (labelVariant === "floating") {
        return (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-3 text-gray-500 pointer-events-none transition-all",

              hasValue || props.placeholder
                ? "top-1 text-xs"
                : "top-1/2 -translate-y-1/2 text-sm",

              error && "text-red-500",
            )}
          >
            {label}
          </label>
        );
      }

      if (labelVariant === "inline") {
        return (
          <label
            htmlFor={inputId}
            className="mr-3 text-sm text-gray-700 whitespace-nowrap"
          >
            {label}
          </label>
        );
      }

      return (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      );
    };

    /* ---------------- Layout ---------------- */

    const inputWrapper = (
      <div className="relative w-full">
        {labelVariant === "floating" && renderLabel()}

        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={baseInputClass}
          {...props}
        />

        {/* Clear Button */}
        {clearable && hasValue && !disabled && (
          <button
            type="button"
            onClick={clearValue}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            ✕
          </button>
        )}

        {/* Right Icon */}
        {!clearable && rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
    );

    return (
      <div className={cn("flex flex-col", fullWidth && "w-full")}>
        {labelVariant !== "floating" && renderLabel()}

        {labelVariant === "inline" ? (
          <div className="flex items-center">{inputWrapper}</div>
        ) : (
          inputWrapper
        )}

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

BaseInput.displayName = "BaseInput";
