import type { NextPage } from "next";
import AuthSignUp from "../../components/AuthSignUp";
import AuthTabLayout from "../../layouts/AuthTabLayout";

const SignUp: NextPage = () => {
  return (
    <AuthTabLayout tabIndex={1}>
      <AuthSignUp />
    </AuthTabLayout>
  );
};
export default SignUp;
