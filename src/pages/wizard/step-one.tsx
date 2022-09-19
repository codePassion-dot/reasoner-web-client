import type { NextPage } from "next";
import WizardBoxDetail from "../../components/WizardBoxDetail";
import StepOne from "../../components/WizardStepOne";
import WizardLayout from "../../layouts/WizardLayout";

const PasswordRecovery: NextPage = () => {
  const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod?';
  return (
    <WizardLayout title="Database">
      <div className="flex flex-row gap-4">
        <WizardBoxDetail title="my custom title" description={description} />
        <StepOne />
      </div>
    </WizardLayout>
  );
};

export default PasswordRecovery;
