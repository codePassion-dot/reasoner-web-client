import WizardFormGeneric from "./WizardFormGeneric";
import { FC } from "react";
import { getDatabaseFields, getDatabaseValidation } from "../utils/wizard";
import { UI_BUTTON_TYPE } from "../ui/fields/auth";
import { REQUEST_TYPE } from "../constants/wizard";

const StepOne: FC = () => {
  const validationSchema = getDatabaseValidation();
  const Fields = getDatabaseFields();

  return (
    <WizardFormGeneric
      fields={Fields}
      validationSchema={validationSchema}
      buttonText={UI_BUTTON_TYPE[0]}
      requestType={REQUEST_TYPE.DATABASE}
      initialValues={{
        host: "",
        port: "",
        database: "",
        username: "",
        password: "",
        ssl: false,
      }}
    />
  );
};

export default StepOne;
