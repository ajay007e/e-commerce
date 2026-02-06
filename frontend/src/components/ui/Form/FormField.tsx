import { cloneElement, ReactElement } from "react";
import { useFormContext } from "./Form";

interface FormFieldProps {
  name: string;
  children: ReactElement;
}

export function FormField({ name, children }: FormFieldProps) {
  const { register, errors } = useFormContext();

  return cloneElement(children, {
    ...register(name),
    error: errors[name],
  });
}
