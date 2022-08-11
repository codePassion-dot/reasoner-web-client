import { FC } from "react";
import { CONSTANTS } from "../constants";
import { getSignUpFields, getSignUpValidation } from "../utils/auth";
import AuthFormGeneric from "./AuthFormGeneric";
import AuthHeader from "./AuthHeader";

const AuthSignUp: FC = () => {
  const validationSchemaSignUp = getSignUpValidation();
  const signUpFields = getSignUpFields();
  return (
    <AuthHeader
      title="Get Started"
      description="Join us filling the next form to create your account"
    >
      <AuthFormGeneric
        fields={signUpFields}
        validationSchema={validationSchemaSignUp}
        buttonText={CONSTANTS.authText[1]}
      />
    </AuthHeader>
  );
};

export default AuthSignUp;
