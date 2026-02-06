import { ReactNode } from "react";

interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      {title && (
        <div>
          <h3 className="text-sm font-medium">{title}</h3>

          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
