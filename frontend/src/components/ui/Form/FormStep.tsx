import { ReactNode } from "react";

interface FormStepProps {
  children: ReactNode;
}

export function FormStep({ children }: FormStepProps) {
  return <div className="space-y-6">{children}</div>;
}
