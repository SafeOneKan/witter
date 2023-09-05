import { ReactElement, useState } from "react";

const useMultiForm = (steps: ReactElement[]) => {
  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };
  const back = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goTo = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length) return false;
    setCurrentStepIndex(stepIndex);
    return true;
  };

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    next,
    back,
    goTo,
    steps,
  };
};

export default useMultiForm;
