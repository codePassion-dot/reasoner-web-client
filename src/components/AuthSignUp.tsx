import { FC } from "react";
import { REQUEST_TYPE } from "../constants/auth";
import { UI_BUTTON_TYPE } from "../ui/fields/auth";
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
        buttonText={UI_BUTTON_TYPE[1]}
        requestType={REQUEST_TYPE.SIGN_UP}
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
      />
    </AuthHeader>
  );
};

export default AuthSignUp;
