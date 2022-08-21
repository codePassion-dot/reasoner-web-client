import { FC } from "react";
import { CONSTANTS } from "../constants";
import { getPasswordResetFields, getPasswordResetValidation, } from "../utils/auth";
import AuthFormGeneric from "./AuthFormGeneric";
import AuthHeader from "./AuthHeader";

const AuthPasswordReset: FC = () => {
  const validationSchemaPasswordReset = getPasswordResetValidation();
  const passwordResetFields = getPasswordResetFields();
  return (
    <AuthHeader
      title="Don't worry"
      description="We'll help you, please enter your new password below"
    >
      <AuthFormGeneric
        fields={passwordResetFields}
        validationSchema={validationSchemaPasswordReset}
        buttonText={CONSTANTS.authButton[3]}
      />
    </AuthHeader>
  );
};

export default AuthPasswordReset;
