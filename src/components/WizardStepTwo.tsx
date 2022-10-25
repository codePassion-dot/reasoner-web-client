import WizardFormGeneric from "./WizardFormGeneric";
import { FC, useEffect, useState } from "react";
import { getSchemaFields, getSchemaValidation } from "../utils/wizard";
import { REQUEST_TYPE } from "../constants/wizard";
import { useAppSelector } from "../hooks/redux";
import { selectUser } from "../store/selectors/users";
import { WizardField } from "../types/wizard";

const StepTwo: FC = () => {
  const user = useAppSelector(selectUser);
  const [fields, setFields] = useState<WizardField[]>([]);
  const validationSchema = getSchemaValidation();

  useEffect(() => {
    const fetchFields = async () => {
      const fields = await getSchemaFields(user.accessToken);
      setFields(fields);
    };
    fetchFields();
  }, [user.accessToken]);

  return (
    <WizardFormGeneric
      fields={fields}
      validationSchema={validationSchema}
      requestType={REQUEST_TYPE.SCHEMA}
      apiVerb="patch"
      initialValues={{
        schema: "",
        table: "",
      }}
    />
  );
};

export default StepTwo;
