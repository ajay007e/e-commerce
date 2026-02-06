import { ReactNode, useState, Children, isValidElement } from "react";

import { Form, useFormContext } from "./Form";
import { cn } from "../utils/cn";

interface StepConfig {
  title: string;
  fields?: string[];
}

interface MultiStepFormProps {
  initialValues?: Record<string, any>;

  validation?: Record<string, (value: any, values: any) => string | null>;

  steps: StepConfig[];

  onSubmit: (values: Record<string, any>) => void;

  children: ReactNode;
}

/* --------------------------------------------- */
/* Internal Navigation Component */
/* --------------------------------------------- */

function StepNavigation({
  steps,
  currentStep,
  setCurrentStep,
  onFinish,
}: {
  steps: StepConfig[];
  currentStep: number;
  setCurrentStep: (n: number) => void;
  onFinish: () => void;
}) {
  const { errors, values } = useFormContext();

  const isLast = currentStep === steps.length - 1;

  const canGoNext = () => {
    const fields = steps[currentStep]?.fields;

    if (!fields) return true;

    return fields.every((f) => !errors[f]);
  };

  return (
    <div className="flex items-center justify-between pt-4">
      <button
        type="button"
        onClick={() => setCurrentStep((s) => Math.max(s - 1, 0))}
        disabled={currentStep === 0}
        className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
      >
        Back
      </button>

      {isLast ? (
        <button
          type="submit"
          onClick={onFinish}
          className="rounded-md bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          disabled={!canGoNext()}
          onClick={() =>
            setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
          }
          className="rounded-md bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      )}
    </div>
  );
}

/* --------------------------------------------- */
/* Progress Bar */
/* --------------------------------------------- */

function Stepper({ steps, current }: { steps: StepConfig[]; current: number }) {
  return (
    <div className="mb-6 flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",

              i <= current
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600",
            )}
          >
            {i + 1}
          </div>

          <span className="text-xs text-gray-600">{s.title}</span>

          {i < steps.length - 1 && <div className="h-px w-6 bg-gray-300" />}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------- */
/* Main Component */
/* --------------------------------------------- */

export function MultiStepForm({
  initialValues,
  validation,
  steps,
  onSubmit,
  children,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const stepElements = Children.toArray(children);

  return (
    <Form
      initialValues={initialValues}
      validation={validation}
      onSubmit={onSubmit}
    >
      {/* Root Layout */}
      <div className="flex h-full flex-col">
        {/* ================= Sticky Stepper ================= */}
        <div
          className="
            sticky top-0 z-20
            bg-white
            border-b
            px-2 pt-2
          "
        >
          <Stepper steps={steps} current={currentStep} />
        </div>

        {/* ================= Scroll Area ================= */}
        <div
          className="
            flex-1 overflow-y-auto
            px-2 py-4
            pb-28
          "
        >
          {stepElements[currentStep]}
        </div>

        {/* ================= Fixed Footer ================= */}
        <div
          className="
            sticky bottom-0 z-30
            bg-white
            border-t
            px-2 py-3
          "
        >
          <StepNavigation
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onFinish={() => {}}
          />
        </div>
      </div>
    </Form>
  );
}
