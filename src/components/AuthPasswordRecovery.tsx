import { FC } from "react";
import { REQUEST_TYPE } from "../constants/auth";
import { UI_BUTTON_TYPE } from "../ui/fields/auth";

import { getPasswordRecoveryFields, getPasswordRecoveryValidation, } from "../utils/auth";
import AuthFormGeneric from "./AuthFormGeneric";
import AuthHeader from "./AuthHeader";

const AuthPasswordRecovery: FC = () => {
  const validationSchemaPasswordRecovery = getPasswordRecoveryValidation();
  const passwordRecoveryFields = getPasswordRecoveryFields();


  return (
    <AuthHeader
      title="Forgot Password?"
      description="Please enter your email to recover your password"
    >
      <AuthFormGeneric
        fields={passwordRecoveryFields}
        validationSchema={validationSchemaPasswordRecovery}
        buttonText={UI_BUTTON_TYPE[2]}
        requestType={REQUEST_TYPE.PASSWORD_RECOVERY}
        initialValues={{
          email: "",
        }}
      />
    </AuthHeader>
  );
};

export default AuthPasswordRecovery;
