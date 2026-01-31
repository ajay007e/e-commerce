import type { ModeSwitchProps } from "./types.ts";

export function ModeSwitch({ mode, onSwitch }: ModeSwitchProps) {
  return (
    <p className="text-center text-sm text-neutral-600">
      {mode === "login" ? (
        <>
          Don’t have an account?{" "}
          <button
            onClick={() => onSwitch("signup")}
            className="font-medium text-neutral-900 hover:underline cursor-pointer"
          >
            Sign up
          </button>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <button
            onClick={() => onSwitch("login")}
            className="font-medium text-neutral-900 hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </>
      )}
    </p>
  );
}
