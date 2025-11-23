import { CheckIcon } from "lucide-react";
import "@/app/(dashboard)/add-property/components/css/add-property-progress.css";

import React from "react";

interface UpdatePropertyProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}
const UpdatePropertyProgress = ({
  currentStep,
  totalSteps,
  steps,
}: UpdatePropertyProgressProps) => {
  return (
    <ul className="progress_container_wrapper">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;

        // Determine classes based on step status
        const buttonClass = isCompleted
          ? "progress_button_completed"
          : isCurrent
          ? "progress_button_current"
          : "progress_button_upcoming";

        const listClass = isCompleted
          ? "step_list_completed"
          : isCurrent
          ? "step_list_current"
          : "step_list_upcoming";

        return (
          <li key={step} className={listClass}>
            <button className={buttonClass}>
              {isCompleted ? <CheckIcon size={20} /> : stepNumber + ". "} {step}
            </button>
            {/* <button className={buttonClass}>
              {isCompleted ? <CheckIcon size={20} /> : stepNumber + ". " + step}
            </button> */}
          </li>
        );
      })}
    </ul>
  );
};

export default UpdatePropertyProgress;
