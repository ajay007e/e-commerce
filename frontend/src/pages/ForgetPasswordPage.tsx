import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthField } from "@/components/auth/AuthField";
import { AuthNote } from "@/components/auth/AuthNote";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const isValid = email.length > 0; // real validation later
  const isLoading = false;

  return (
    <AuthLayout>
      <AuthCard>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-4"
        >
          {/* Header */}
          <div className="space-y-1 text-center">
            <h1 className="text-xl font-semibold text-neutral-900">
              Forgot your password?
            </h1>
            <p className="text-sm text-neutral-600">
              Enter your email and we’ll send you a reset link.
            </p>
          </div>

          {/* Email */}
          <AuthField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Sending…" : "Send reset link"}
          </button>

          {/* Privacy */}
          <AuthNote />

          {/* Back to login */}
          <p className="text-center text-sm text-neutral-600">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="font-medium text-neutral-900 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
