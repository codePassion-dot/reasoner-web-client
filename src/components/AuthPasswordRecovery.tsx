import { FC } from "react";
import { CONSTANTS } from "../constants";
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
        buttonText={CONSTANTS.authButton[2]}
      />
    </AuthHeader>
  );
};

export default AuthPasswordRecovery;
