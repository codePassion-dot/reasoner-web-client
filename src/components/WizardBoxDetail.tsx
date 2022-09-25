import React, { FC } from "react";
import { STEP_DETAILS } from "../constants/wizard";

interface Props {
  step: string;
}

const WizardBoxDetail: FC<Props> = ({ step }) => {
  return (
    <div className="w-80 h-60 flex flex-col gap-1 text-white font-light text-lg items-center p-3 rounded-lg bg-cloud-burst shadow-lg shadow-cloud-burst/50">
      <h2>{STEP_DETAILS[step].title}</h2>
      <p>{STEP_DETAILS[step].description}</p>
    </div>
  );
};

export default WizardBoxDetail;
