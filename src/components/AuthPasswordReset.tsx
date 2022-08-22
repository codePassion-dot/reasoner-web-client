import { useRouter } from "next/router";
import { FC } from "react";
import { REQUEST_TYPE } from "../constants/auth";
import { UI_BUTTON_TYPE } from "../ui/fields/auth";

import { getPasswordResetFields, getPasswordResetValidation, } from "../utils/auth";
import AuthFormGeneric from "./AuthFormGeneric";
import AuthHeader from "./AuthHeader";

const AuthPasswordReset: FC = () => {
  const validationSchemaPasswordReset = getPasswordResetValidation();
  const passwordResetFields = getPasswordResetFields();
  const router = useRouter();
  const { query } = router;
  let urlQuery = {};

  if (typeof query.token === "string") {
    urlQuery = {
      token: query.token,
    }
  }
  return (
    <AuthHeader
      title="Don't worry"
      description="We'll help you, please enter your new password below"
    >
      <AuthFormGeneric
        fields={passwordResetFields}
        validationSchema={validationSchemaPasswordReset}
        buttonText={UI_BUTTON_TYPE[3]}
        requestType={REQUEST_TYPE.PASSWORD_RESET}
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        urlQuery={urlQuery}
      />
    </AuthHeader>
  );
};

export default AuthPasswordReset;
