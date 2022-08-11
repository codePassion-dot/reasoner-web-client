import AuthFormGeneric from "./AuthFormGeneric";
import AuthHeader from "./AuthHeader";
import { FC } from "react";
import { getBaseAuthValidation, getBaseFields } from "../utils/auth";
import { CONSTANTS } from "../constants";

const AuthSignIn: FC = () => {
  const validationSchemaSignIn = getBaseAuthValidation();
  const signInFields = getBaseFields();

  return (
    <AuthHeader
      title="Welcome"
      description="Please fill your credentials to log into your profile"
    >
      <AuthFormGeneric
        fields={signInFields}
        validationSchema={validationSchemaSignIn}
        buttonText={CONSTANTS.authText[0]}
      />
    </AuthHeader>
  );
};

export default AuthSignIn;
