export type AuthMode = "login" | "signup";

export interface AuthFieldError {
  field: "name" | "email" | "password";
  message: string;
}

export interface AuthFormState {
  name: string;
  email: string;
  password: string;
}

export interface AuthFormProps {
  mode: AuthMode;
  values: AuthFormState;
  errors: AuthFieldError[];
  isValid: boolean;
  isLoading: boolean;

  onChange: (field: keyof AuthFormState, value: string) => void;
  onSubmit: () => void;
  onModeSwitch: (mode: AuthMode) => void;
  onForgotPassword?: () => void;
}

export interface AuthFieldProps {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export interface PasswordFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export interface ModeSwitchProps {
  mode: "login" | "signup";
  onSwitch: (mode: "login" | "signup") => void;
}
