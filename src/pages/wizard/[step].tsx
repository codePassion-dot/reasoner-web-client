import type { NextPage } from "next";
import WizardBoxDetail from "../../components/WizardBoxDetail";
import StepOne from "../../components/WizardStepOne";
import WizardLayout from "../../layouts/WizardLayout";
import WithAuthentication from "../../components/WithAuthentication";
import { STEP_NAMES } from "../../constants/wizard";
import { useRouter } from "next/router";
import { useState } from "react";

const Step: NextPage = () => {
  const router = useRouter();
  const { step } = router.query;
  const stepKey = typeof step === "string" ? step.toUpperCase() : "SOURCE";
  const [steps, setSteps] = useState([
    {
      key: "SOURCE",
      label: STEP_NAMES.SOURCE,
      isDone: false,
      component: <StepOne />,
      idx: 0,
    },
    {
      key: "SCHEMA_AND_TABLE",
      label: STEP_NAMES.SCHEMA_AND_TABLE,
      isDone: false,
      component: <StepOne />,
      idx: 1,
    },
    {
      key: "COLUMNS",
      label: STEP_NAMES.COLUMNS,
      isDone: false,
      component: <StepOne />,
      idx: 2,
    },
    {
      key: "ALGORITHM",
      label: STEP_NAMES.ALGORITHM,
      isDone: false,
      component: <StepOne />,
      idx: 3,
    },
  ]);

  const setInitialActiveStep = () => {
    return steps.find((step) => step.key === stepKey)?.idx;
  };

  const [activeStepIdx, setActiveStepIdx] = useState(
    setInitialActiveStep() ?? 0
  );

  const updateIsDone = (action: string) => {
    steps[activeStepIdx].isDone = action === "next" ? true : false;
    setSteps(steps);
  };

  const handleNext = () => {
    updateIsDone("next");
    if (activeStepIdx < steps.length - 1) {
      setActiveStepIdx(activeStepIdx + 1);
    }
    router.push(`/wizard/${steps[activeStepIdx + 1].key.toLowerCase()}`);
  };

  const handlePrev = () => {
    updateIsDone("prev");
    if (activeStepIdx > 0) {
      setActiveStepIdx(activeStepIdx - 1);
    }
    router.push(`/wizard/${steps[activeStepIdx - 1].key.toLowerCase()}`);
  };

  return (
    <WizardLayout
      step={stepKey}
      idxActiveStep={activeStepIdx}
      handleNext={handleNext}
      handlePrev={handlePrev}
    >
      <div className="flex flex-row gap-4">
        <WizardBoxDetail step={stepKey} />
        {steps[activeStepIdx].component}
      </div>
    </WizardLayout>
  );
};

export default WithAuthentication(Step);
