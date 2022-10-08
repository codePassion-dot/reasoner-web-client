import WizardFormGeneric from "./WizardFormGeneric";
import { FC } from "react";
import { getDatabaseFields, getDatabaseValidation } from "../utils/wizard";
import { UI_BUTTON_TYPE } from "../ui/fields/auth";
import { REQUEST_TYPE } from "../constants/wizard";

const StepOne: FC = () => {
  const validationSchema = getDatabaseValidation();
  const fields = getDatabaseFields();

  return (
    <WizardFormGeneric
      fields={fields}
      validationSchema={validationSchema}
      requestType={REQUEST_TYPE.DATABASE}
      initialValues={{
        host: "",
        port: "",
        database: "",
        username: "",
        password: "",
        ssl: null,
      }}
    />
  );
};

export default StepOne;
