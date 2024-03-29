import type { NextPage } from "next";
import WizardBoxDetail from "../../components/WizardBoxDetail";
import StepOne from "../../components/WizardStepOne";
import StepTwo from "../../components/WizardStepTwo";
import WizardLayout from "../../layouts/WizardLayout";
import WithAuthentication from "../../components/WithAuthentication";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { makeRequest } from "../../services/wizard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectActiveStepIdx, selectSteps } from "../../store/selectors/wizard";
import {
  handleBack,
  setActiveStepIdx,
  setInitialActiveStep,
} from "../../store/slices/wizard";
import StepThree from "../../components/WizardStepThree";
import StepFour from "../../components/WizardStepFour";
import StepFive from "../../components/WizardStepFive";
import StepSix from "../../components/WizardStepSix";
import StepSeven from "../../components/WizardStepSeven";
import StepEight from "../../components/WizardStepEight";

const Step: NextPage = () => {
  const router = useRouter();
  const { step } = router.query;
  const stepKey = typeof step === "string" ? step.toUpperCase() : "SOURCE";
  const steps = useAppSelector(selectSteps);
  const activeStepIdx = useAppSelector(selectActiveStepIdx);

  const dispatch = useAppDispatch();

  const components: { [key: string]: JSX.Element } = {
    stepOne: <StepOne />,
    stepTwo: <StepTwo />,
    stepThree: <StepThree />,
    stepFour: <StepFour />,
    stepFive: <StepFive />,
    stepSix: <StepSix />,
    stepSeven: <StepSeven />,
    stepEight: <StepEight />,
  }; //disgusting

  useEffect(() => {
    dispatch(setInitialActiveStep({ stepKey }));
  }, [dispatch, stepKey]);

  const handlePrev = () => {
    dispatch(handleBack);
    router.push(`/wizard/${steps[activeStepIdx - 1].key.toLowerCase()}`);
  };

  return (
    <WizardLayout
      handlePrev={handlePrev}
      step={stepKey}
      idxActiveStep={activeStepIdx}
    >
      {activeStepIdx !== 7 ? (
        <div className="flex flex-row gap-4">
          <>
            <WizardBoxDetail step={stepKey} />
            {components[steps[activeStepIdx].component]}
          </>
        </div>
      ) : (
        <>{components[steps[activeStepIdx].component]}</>
      )}
    </WizardLayout>
  );
};

export default WithAuthentication(Step);
