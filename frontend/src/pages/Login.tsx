import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";
import type { AuthMode, AuthFormState } from "@/components/auth/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth.context";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [values, setValues] = useState<AuthFormState>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErrors([]);
    setLoading(true);

    try {
      if (mode === "login") {
        await login(values.email, values.password);
      } else {
        // 🔑 Map signup payload explicitly
        await signup({
          name: values.name,
          email: values.email,
          password: values.password,
        });
      }

      navigate("/");
    } catch (err: any) {
      setErrors([err?.response?.data?.message || "Authentication failed"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthForm
          mode={mode}
          values={values}
          errors={errors}
          isValid={true}
          isLoading={loading}
          onChange={(field, value) =>
            setValues((v) => ({ ...v, [field]: value }))
          }
          onSubmit={handleSubmit}
          onModeSwitch={setMode}
          onForgotPassword={() => navigate("/reset-password")}
        />
      </AuthCard>
    </AuthLayout>
  );
}
