import AuthLayout from "../../layouts/AuthLayout";
import AuthSignIn from "../../components/AuthSignIn";
import type { NextPage } from "next";

const SignIn: NextPage = () => {
  return (
    <AuthLayout tabIndex={0}>
      <AuthSignIn />
    </AuthLayout>
  );
};

export default SignIn;
