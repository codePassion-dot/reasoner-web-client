import AuthFormGeneric from "./AuthFormGeneric";
import AuthHeader from "./AuthHeader";
import { FC } from "react";
import { getBaseAuthValidation, getBaseFields } from "../utils/auth";
import { UI_BUTTON_TYPE } from "../ui/fields/auth";
import { REQUEST_TYPE } from "../constants/auth";
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
        buttonText={UI_BUTTON_TYPE[0]}
        requestType={REQUEST_TYPE.SIGN_IN}
        initialValues={{
          email: "",
          password: "",
        }}
      />
    </AuthHeader>
  );
};

export default AuthSignIn;
