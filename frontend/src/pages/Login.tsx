import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";
import type { AuthMode, AuthFormState } from "@/components/auth/types";

import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [values, setValues] = useState<AuthFormState>({
    email: "",
    password: "",
  });

  return (
    <AuthLayout>
      <AuthCard>
        <AuthForm
          mode={mode}
          values={values}
          errors={[]}
          isValid={false}
          isLoading={false}
          onChange={(field, value) =>
            setValues((v) => ({ ...v, [field]: value }))
          }
          onSubmit={() => {}}
          onModeSwitch={setMode}
          onForgotPassword={() => {
            navigate("/reset-password");
          }}
        />
      </AuthCard>
    </AuthLayout>
  );
}
