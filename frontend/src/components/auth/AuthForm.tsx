import type { AuthFormProps } from "./types";
import { AuthField } from "./AuthField";
import { AuthNote } from "./AuthNote";
import { PasswordField } from "./PasswordField";
import { ModeSwitch } from "./ModeSwitch";

export function AuthForm({
  mode,
  values,
  errors,
  isValid,
  isLoading,
  onChange,
  onSubmit,
  onModeSwitch,
  onForgotPassword,
}: AuthFormProps) {
  const getError = (field: string) =>
    errors.find((e) => e.field === field)?.message;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4 transition-opacity duration-150"
    >
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-neutral-600">
          {mode === "login"
            ? "Sign in to your account"
            : "It only takes a minute"}
        </p>
      </div>

      {mode === "signup" && (
        <AuthField
          label="Name"
          value={values.name ?? ""}
          error={getError("name")}
          onChange={(v) => onChange("name", v)}
        />
      )}

      <AuthField
        label="Email"
        type="email"
        value={values.email}
        error={getError("email")}
        onChange={(v) => onChange("email", v)}
      />

      <PasswordField
        value={values.password}
        error={getError("password")}
        onChange={(v) => onChange("password", v)}
      />

      {mode === "login" && (
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-neutral-600 hover:underline cursor-pointer"
        >
          Forgot password?
        </button>
      )}

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={`
          w-full rounded-md py-2 text-sm font-medium text-white
          transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            mode === "login"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
          }
        `}
      >
        {isLoading
          ? "Loading…"
          : mode === "login"
            ? "Sign in"
            : "Create account"}
      </button>

      <AuthNote />
      <ModeSwitch mode={mode} onSwitch={onModeSwitch} />
    </form>
  );
}
