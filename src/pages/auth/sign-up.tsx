import type { NextPage } from "next";
import AuthSignUp from "../../components/AuthSignUp";
import AuthLayout from "../../layouts/AuthLayout";

const SignUp: NextPage = () => {
  return (
    <AuthLayout tabIndex={1}>
      <AuthSignUp />
    </AuthLayout>
  );
};
export default SignUp;
