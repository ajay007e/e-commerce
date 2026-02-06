import React, {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useState,
} from "react";

type Validator = (value: any, values: any) => string | null;

interface FormContextType {
  values: Record<string, any>;
  errors: Record<string, string>;

  setValue: (name: string, value: any) => void;
  setError: (name: string, error: string | null) => void;

  register: (name: string) => {
    value: any;
    onChange: (e: any) => void;
  };
}

const FormContext = createContext<FormContextType | null>(null);

export function useFormContext() {
  const ctx = useContext(FormContext);

  if (!ctx) {
    throw new Error("Form components must be used inside <Form>");
  }

  return ctx;
}

interface FormProps {
  initialValues?: Record<string, any>;

  validation?: Record<string, Validator>;

  onSubmit: (values: Record<string, any>) => void;

  children: ReactNode;
}

export function Form({
  initialValues = {},
  validation = {},
  onSubmit,
  children,
}: FormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ---------------- Core Logic ---------------- */

  const setValue = (name: string, value: any) => {
    setValues((v) => ({ ...v, [name]: value }));
  };

  const setError = (name: string, error: string | null) => {
    setErrors((e) => {
      if (!error) {
        const copy = { ...e };
        delete copy[name];
        return copy;
      }

      return { ...e, [name]: error };
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    for (const key in validation) {
      const validator = validation[key];
      const result = validator(values[key], values);

      if (result) {
        newErrors[key] = result;
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const register = (name: string) => {
    return {
      value: values[name] ?? "",
      onChange: (valueOrEvent: any) => {
        let val: any;

        /* ✅ Case 1: Native input */
        if (valueOrEvent?.target) {
          const target = valueOrEvent.target;

          if (target.type === "checkbox") {
            val = target.checked;
          } else {
            val = target.value;
          }
        } else {
          /* ✅ Case 2: Custom component */
          val = valueOrEvent;
        }

        setValue(name, val);

        if (errors[name]) {
          setError(name, null);
        }
      },
    };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(values);
  };

  /* ---------------- Provider ---------------- */

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        setValue,
        setError,
        register,
      }}
    >
      <form onSubmit={handleSubmit} className="h-full flex flex-col">
        {children}
      </form>
    </FormContext.Provider>
  );
}
